import * as path from "path";
import { lstatSync } from "fs";
import { readdir, readFile, writeFile } from "fs/promises";
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
	LocaleConfig,
} from "../utils/types";
import util from "util";
import { VFile } from "vfile";

console.time("preload");

const absRootPath = path.resolve("../app");

let docsContext: DocsContext = [];
for (const locale of locales) {
	/* get locale absolute paths */
	const absLocalePath = path.resolve(absRootPath, locale);
	const absLocalePathStat = lstatSync(absLocalePath);
	if (absLocalePathStat.isDirectory()) {
		/* read locale config.json */
		const localeConfig: LocaleConfig = JSON.parse(
			await readFile(path.resolve(absLocalePath, "config.json"), "utf-8")
		);
		const localizedFields: Field[] = [];
		for (const field of localeConfig.fields) {
			const absFieldPath = path.resolve(
				absLocalePath,
				field.relativeConfigPath
			);
			try {
				const fieldConfig: FieldConfig = JSON.parse(
					await readFile(
						path.resolve(absFieldPath, "config.json"),
						"utf-8"
					)
				);
				let fsNodes = await readdir(absFieldPath);
				if (fieldConfig.isVersioned) {
					for (const fsNode of fsNodes) {
						if (fsNode !== "config.json") {
							/* is a version directory */
							const absVersionPath = path.resolve(
								absFieldPath,
								fsNode
							);
							const systemPathLength = path
								.resolve("../app")
								.split(path.sep).length;
							const versionedContext = getVersionedContext(
								fieldConfig.versions,
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
									/* is a section */
									const section = item;
									url = `/${absVersionPath
										.split(path.sep)
										.slice(systemPathLength)
										.join(path.posix.sep)}/${
										section.pageId
									}`;
									section.url = url;
									absMdxPath = path.resolve(
										absVersionPath,
										section.pageId,
										"page.mdx"
									);
									const compiledMdx = await getCompiledMdx(
										absMdxPath
									);
									const mdxContext =
										getMdxContext(compiledMdx);
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
										const compiledMdx =
											await getCompiledMdx(absMdxPath);
										const mdxContext =
											getMdxContext(compiledMdx);
										page.toc = mdxContext.toc;
										page.metadata = mdxContext.metadata;
									}
								} else {
									/* is a page */
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
									const mdxContext =
										getMdxContext(compiledMdx);
									page.toc = mdxContext.toc;
									page.metadata = mdxContext.metadata;
								}
							}
						}
					}
				} else {
					/* not versioned */
					for (const fsNode of fsNodes) {
						if (fsNode !== "config.json") {
							/* is a page or section directory */
							const absPageOrSecPath = path.resolve(
								absFieldPath,
								fsNode
							); /* can be abs section path or abs page path */
							const systemPathLength = path
								.resolve("../app")
								.split(path.sep).length;
							const versionedContext = fieldConfig.versions[0];
							if (!versionedContext) {
								throw new Error(
									`Versioned context not found, item: ${fsNode}`
								);
							}
							for (const item of versionedContext.category) {
								let url;
								let absMdxPath;
								if ("pages" in item) {
									/* is a section */
									const section = item;
									url = `/${absFieldPath
										.split(path.sep)
										.slice(systemPathLength)
										.join(path.posix.sep)}/${
										section.pageId
									}`;

									section.url = url;
									absMdxPath = path.resolve(
										absFieldPath,
										section.pageId,
										"page.mdx"
									);
									const compiledMdx = await getCompiledMdx(
										absMdxPath
									);
									const mdxContext =
										getMdxContext(compiledMdx);
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
										const compiledMdx =
											await getCompiledMdx(absMdxPath);
										const mdxContext =
											getMdxContext(compiledMdx);
										page.toc = mdxContext.toc;
										page.metadata = mdxContext.metadata;
									}
								} else {
									/* is a page */
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
									const mdxContext =
										getMdxContext(compiledMdx);
									page.toc = mdxContext.toc;
									page.metadata = mdxContext.metadata;
								}
							}
						}
					}
				}
				localizedFields.push({
					fieldId: field.fieldId,
					fieldName: fieldConfig.fieldName,
					homeUrl: fieldConfig.homeUrl,
					isVersioned: fieldConfig.isVersioned,
					type: fieldConfig.type,
					versions: fieldConfig.versions,
				});
			} catch (error) {
				throw new Error(
					`An error occurred while reading field config, path: ${absFieldPath}`
				);
			}
		}
		docsContext.push({ locale: locale, localizedFields: localizedFields });
	} else {
		throw new Error(`Locale should be a directory, locale: ${locale}`);
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
