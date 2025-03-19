import { DocsContext, ItemContext, PageContext } from "./types";

export function getDocContexts(
	docsContext: DocsContext,
	locale: string,
	fieldId: string,
	versionCode: string,
	pathname: string
) {
	/* Get the localized context, which contains the context of all fields for the designated language. */
	const localizedContext = docsContext.find((localeDoc) => {
		return localeDoc.locale === locale;
	});

	/* Get the field context, which contains all version contexts of the designated field. */
	const field = localizedContext!.localizedFields.find((field) => {
		return field.fieldId === fieldId;
	});

	if (field!.isVersioned) {
		/* Get the versioned context, which contains all page contexts of the designated field and version. */
		const version = field?.versions.find((version) => {
			return version.versionCode === versionCode;
		});
		if (!!version) {
			if (!!version.versionCode) {
				const matchReg = /^v\d+\.\d+\.\d+$|latest/y;
				if (version.versionCode.match(matchReg) === null) {
					/* No matched version */
					throw Error("No matched version pattern");
				}
			} else {
				throw Error("No version code found");
			}
		} else {
			throw Error("No version found");
		}

		/* Get the page context, which contains all TOC contexts of the designated page. */
		const flattenItems = getFlattenItems(version.category);
		const page = flattenItems.find((page) => {
			return page.url === pathname;
		});
		return {
			localizedContext,
			field,
			version,
			flattenItems,
			page,
		};
	} else {
		/* Not versioned */
		const version = field?.versions[0];
		if (!!version) {
			const flattenItems = getFlattenItems(version.category);
			const page = flattenItems.find((page) => {
				return page.url === pathname;
			});
			return {
				localizedContext,
				field,
				version,
				flattenItems,
				page,
			};
		} else {
			throw Error("No version found");
		}
	}
}

/**
 * Return flatten items
 * @param items items of a specific version
 * @returns flatten page contexts
 */
export function getFlattenItems(items: ItemContext[]) {
	const pageStack: PageContext[] = [];
	function recurseItems(items: ItemContext[]) {
		for (const item of items) {
			if ("pages" in item) {
				/* Is a section */
				recurseItems(item.pages);
			} else {
				/* Is a page */
				pageStack.push(item);
			}
		}
	}
	recurseItems(items);
	return pageStack;
}

/**
 * Return a flatten TOC
 * @param toc toc generated by rehype plugin @stefanprobst/rehype-extract-toc
 * @returns flatten TOC
 */
export function getFlattenToc(toc: any) {
	function recurseToc(toc: any) {
		for (const item of toc) {
			if (item.children) {
				/* Has subitems */
				tocStack.push({
					value: item.value,
					depth: item.depth,
					id: item.id,
				});
				recurseToc(item.children);
			} else {
				/* Has no subitems */
				tocStack.push({
					value: item.value,
					depth: item.depth,
					id: item.id,
				});
			}
		}
	}

	if (!toc) {
		return null;
	}
	const tocStack: any[] = [];
	recurseToc(toc);
	return tocStack;
}

/**
 * Removes duplicates from an array
 * @param array the array to remove duplicates from
 * @returns the array without duplicates
 */
export function uniq(array: any[]) {
	return array.filter((value, index, self) => self.indexOf(value) === index);
}


export function processHref(href: string) {
	const baseUrl = "https://www.chitubox.com";
	const locales = ["en", "zh-Hans", "zh-Hant"];
	if (!href) {
		return "/";
	}
	if (href.startsWith("http")) {
		return href;
	} else {
		const splitedHref = href.split("/");
		if (locales.includes(splitedHref[1])) {
			return `${baseUrl}${splitedHref.join("/")}`;
		} else {
			return `${baseUrl}/en${splitedHref.join("/")}`;
		}
	}
}
