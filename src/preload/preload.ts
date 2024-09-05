import * as path from "path";
import { lstatSync } from "fs";
import { access, readdir, readFile, writeFile } from "fs/promises";
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import withToc from "@stefanprobst/rehype-extract-toc";
import {
	Field,
	FieldConfig,
	DocsContext,
	VersionedContext,
	isLocale,
	locales,
	Locale,
} from "../utils/types";
import util from "util";
import { VFile } from "@mdx-js/mdx/lib/compile";

console.time("preload");

/* Get all locale absolute paths */
const absRootPath = path.resolve("../app");
const rootItems = await readdir(absRootPath);
const absLocalePaths: string[] = [];

for (const item of rootItems) {
	const absItemPath = path.resolve(absRootPath, item);
	const absItemPathStat = lstatSync(absItemPath);
	if (locales.includes(item as Locale) && absItemPathStat.isDirectory()) {
		/* item is a locale directory */
		absLocalePaths.push(absItemPath);
	} else {
		continue;
	}
}

/* Get all versioned doc paths */
let docsContext: DocsContext = [];
for (const absLocalePath of absLocalePaths) {
	const locale = path.basename(absLocalePath);
	if (!isLocale(locale)) {
		throw new Error(`Invalid locale, locale: ${locale}`);
	}
	docsContext.push({ locale: locale, localizedFields: [] });
	let itemsInLocaleDir = await readdir(absLocalePath);
	const fieldDirs = itemsInLocaleDir.filter((item) => {
		const absItemPath = path.resolve(absLocalePath, item);
		const absPathState = lstatSync(absItemPath);
		if (absPathState.isDirectory()) {
			return true;
		} else {
			return false;
		}
	});

	/* Get ordered doc field list from /locale/config.json */
	const orderedFieldIdList: string[] = JSON.parse(
		await readFile(path.resolve(absLocalePath, "config.json"), "utf-8")
	);

	/* Find the ordered fields */
	const orderedFields: Field[] = [];
	for (const fieldId of orderedFieldIdList) {
		for (const fieldDir of fieldDirs) {
			if (fieldDir === fieldId) {
				/* push fields with Id only */
				orderedFields.push({
					fieldId: fieldId,
					fieldName: "",
					isVersioned: false,
					type: "book",
					homeUrl: "",
					versions: [],
				});
			}
		}
	}

	for (const field of orderedFields) {
		const localizedContext = getLocalizedContext(docsContext, locale);
		if (!localizedContext) {
			throw new Error(`Localized context not found, locale: ${locale}`);
		}

		localizedContext.localizedFields.push(field);
		const absFieldPath = path.resolve(absLocalePath, field.fieldId);
		const fieldStat = lstatSync(absFieldPath);
		if (fieldStat.isDirectory()) {
			const config: FieldConfig = JSON.parse(
				await readFile(
					path.resolve(absFieldPath, "config.json"),
					"utf-8"
				)
			);
			const fieldContext = getFieldContext(
				localizedContext.localizedFields,
				field.fieldId
			);
			if (!fieldContext) {
				throw new Error(
					`Field context not found, fieldId: ${field.fieldId}`
				);
			}
			fieldContext.fieldName = config.fieldName;
			let fsNodes = await readdir(absFieldPath);
			/* Check whether the field is versioned */
			if (config.isVersioned) {
				/* Is versioned */
				fieldContext.isVersioned = true;
				fieldContext.type = config.type;
				fieldContext.homeUrl = config.homeUrl;
				fieldContext.versions = config.versions;
				for (const fsNode of fsNodes) {
					if (fsNode !== "config.json") {
						/* Is a version directory */
						const absVersionPath = path.resolve(
							absFieldPath,
							fsNode
						);
						const systemPathLength = path
							.resolve("../app")
							.split(path.sep).length;
						const versionedContext = getVersionedContext(
							fieldContext.versions,
							fsNode
						);
						if (!versionedContext) {
							throw new Error(
								`Versioned context not found, versionCode: ${fsNode}`
							);
						}
						for (const item of versionedContext.category) {
							let url;
							let absMdxPath;
							if ("pages" in item) {
								/* Is a section */
								const section = item;
								url = `/${absVersionPath
									.split(path.sep)
									.slice(systemPathLength)
									.join(path.posix.sep)}/${section.pageId}`;
								section.url = url;
								absMdxPath = path.resolve(
									absVersionPath,
									section.pageId,
									"page.mdx"
								);
								const compiledMdx = await getCompiledMdx(
									absMdxPath
								);
								const mdxContext = getMdxContext(compiledMdx);
								section.toc = mdxContext.toc;
								section.metadata = mdxContext.metadata;
								for (const page of section.pages) {
									url = `/${absVersionPath
										.split(path.sep)
										.slice(systemPathLength)
										.join(path.posix.sep)}/${
										section.pageId
									}/${page.pageId}`;
									page.url = url;
									absMdxPath = path.resolve(
										absVersionPath,
										section.pageId,
										page.pageId,
										"page.mdx"
									);
									const compiledMdx = await getCompiledMdx(
										absMdxPath
									);
									const mdxContext =
										getMdxContext(compiledMdx);
									page.toc = mdxContext.toc;
									page.metadata = mdxContext.metadata;
								}
							} else {
								/* Is a page */
								const page = item;
								const url = `/${absVersionPath
									.split(path.sep)
									.slice(systemPathLength)
									.join(path.posix.sep)}/${page.pageId}`;
								page.url = url;

								absMdxPath = path.resolve(
									absVersionPath,
									page.pageId,
									"page.mdx"
								);
								const compiledMdx = await getCompiledMdx(
									absMdxPath
								);
								const mdxContext = getMdxContext(compiledMdx);
								page.toc = mdxContext.toc;
								page.metadata = mdxContext.metadata;
							}
						}
					}
				}
			} else {
				/* Not versioned */
				fieldContext.isVersioned = false;
				fieldContext.type = config.type;
				fieldContext.homeUrl = config.homeUrl;
				fieldContext.versions = config.versions;
				for (const fsNode of fsNodes) {
					if (fsNode !== "config.json") {
						/* Is a page or section directory */
						const absPageOrSecPath = path.resolve(
							absFieldPath,
							fsNode
						); /* can be abs section path or abs page path */
						const systemPathLength = path
							.resolve("../app")
							.split(path.sep).length;
						const versionedContext = fieldContext.versions[0];
						if (!versionedContext) {
							throw new Error(
								`Versioned context not found, item: ${fsNode}`
							);
						}
						for (const item of versionedContext.category) {
							let url;
							let absMdxPath;
							if ("pages" in item) {
								/* Is a section */
								const section = item;
								url = `/${absFieldPath
									.split(path.sep)
									.slice(systemPathLength)
									.join(path.posix.sep)}/${section.pageId}`;

								section.url = url;
								absMdxPath = path.resolve(
									absFieldPath,
									section.pageId,
									"page.mdx"
								);
								const compiledMdx = await getCompiledMdx(
									absMdxPath
								);
								const mdxContext = getMdxContext(compiledMdx);
								section.toc = mdxContext.toc;
								section.metadata = mdxContext.metadata;
								for (const page of section.pages) {
									url = `/${absFieldPath
										.split(path.sep)
										.slice(systemPathLength)
										.join(path.posix.sep)}/${
										section.pageId
									}/${page.pageId}`;
									page.url = url;
									absMdxPath = path.resolve(
										absFieldPath,
										section.pageId,
										page.pageId,
										"page.mdx"
									);
									const compiledMdx = await getCompiledMdx(
										absMdxPath
									);
									const mdxContext =
										getMdxContext(compiledMdx);
									page.toc = mdxContext.toc;
									page.metadata = mdxContext.metadata;
								}
							} else {
								/* Is a page */
								const page = item;
								url = `/${absFieldPath
									.split(path.sep)
									.slice(systemPathLength)
									.join(path.posix.sep)}/${page.pageId}`;
								page.url = url;
								absMdxPath = path.resolve(
									absFieldPath,
									page.pageId,
									"page.mdx"
								);
								const compiledMdx = await getCompiledMdx(
									absMdxPath
								);
								const mdxContext = getMdxContext(compiledMdx);
								page.toc = mdxContext.toc;
								page.metadata = mdxContext.metadata;
							}
						}
					}
				}
			}
		} else {
			const error = new Error(
				`Field should be a directory, path: ${path.resolve(
					absLocalePath,
					field.fieldId
				)}`
			);
			throw error;
		}
	}
}

await writeFile("./docsContext.json", JSON.stringify(docsContext, null, "\t"));

console.timeEnd("preload");

/**
 * Returns localized context
 * @param docsContext full docsContext that contains multiple locales
 * @param targetUrlLocale target url locale, ex. "en-US"
 * @returns localized context
 */
function getLocalizedContext(
	docsContext: DocsContext,
	targetUrlLocale: string
) {
	return docsContext.find((context) => {
		return context.locale === targetUrlLocale;
	});
}

/**
 * Returns a field context
 * @param localizedFieldContexts localized context that contains multiple fields
 * @param fieldId target field id, ex. "chitubox-basic"
 * @returns field context
 */
function getFieldContext(localizedFieldContexts: Field[], fieldId: string) {
	return localizedFieldContexts.find((field: Field) => {
		return field.fieldId === fieldId;
	});
}

/**
 * Returns a versioned doc context
 * @param fieldContext field that contains multiple versions
 * @param fsNode fsNode named by version code, ex. "latest", "v1.3.0"
 * @returns versioned doc context
 */
function getVersionedContext(fieldContext: VersionedContext[], fsNode: string) {
	const versionCode = fsNode[0] === "v" ? fsNode.slice(1) : fsNode;
	if (fsNode === "latest") {
		const versionCtx = fieldContext.find(
			(versionContext: VersionedContext) => {
				return versionContext.isLatest;
			}
		);
		return versionCtx;
	} else {
		const versionCtx = fieldContext.find(
			(versionContext: VersionedContext) => {
				return versionContext.versionCode === versionCode;
			}
		);
		return versionCtx;
	}
}

async function getCompiledMdx(absMdxPath: string) {
	const content = await readFile(absMdxPath, "utf-8");
	const compiled = await compile(content, {
		remarkPlugins: [remarkGfm, remarkMath],
		rehypePlugins: [rehypeKatex, rehypeSlug, withToc],
		providerImportSource: "@mdx-js/react",
	});
	return compiled;
}

function getMdxContext(compiledMdx: VFile) {
	const { data, value } = compiledMdx;
	const startingIndex = (value as string).indexOf("const metadata = {");
	const endingIndex = (value as string).indexOf("};", startingIndex);
	const metaString = (value as string)
		.slice(startingIndex + 17, endingIndex + 1)
		.replaceAll("\n", "");
	const metadata = eval(`const metadata = ${metaString};metadata;`);
	const { toc } = data;
	return { metadata, toc } as any;
}
