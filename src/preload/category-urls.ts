import { writeFile } from "fs/promises";
import { CategoryUrlMap, DocsContext, ItemContext } from "../utils/types";
import docsContext from "./docsContext.json";

function getCatWithoutToc(category: ItemContext[]): Omit<ItemContext, "toc">[] {
	return category.map((item) => {
		if ("pages" in item) {
			/* Is a section */
			const pagesWithoutToc = item.pages.map((page) => {
				const { toc, ...rest } = page;
				return rest;
			});
			const { toc, ...rest } = item;
			return { ...rest, pages: pagesWithoutToc };
		} else {
			/* Is a page */
			const { toc, ...rest } = item;
			return rest;
		}
	});
}

function generate() {
	const categoryUrlTable: CategoryUrlMap[] = [];
	for (const locale of docsContext as DocsContext) {
		for (const field of locale.localizedFields) {
			if (field.isVersioned) {
				for (const version of field.versions) {
					const catWithoutToc = getCatWithoutToc(version.category);
					const categoryUrl: CategoryUrlMap = {
						catWithoutToc: catWithoutToc,
						urls: [],
					};
					function recurseItems(items: ItemContext[]) {
						for (const item of items) {
							if ("pages" in item) {
								/* Is a section */
								categoryUrl.urls.push(item.url);
								recurseItems(item.pages);
							} else {
								/* Is a page */
								categoryUrl.urls.push(item.url);
							}
						}
					}
					recurseItems(version.category);
					categoryUrlTable.push(categoryUrl);
				}
			} else {
				const catWithoutToc = getCatWithoutToc(
					field.versions[0].category
				);
				const categoryUrl: CategoryUrlMap = {
					catWithoutToc: catWithoutToc,
					urls: [],
				};
				function recurseItems(items: ItemContext[]) {
					for (const item of items) {
						if ("pages" in item) {
							/* Is a section */
							categoryUrl.urls.push(item.url);
							recurseItems(item.pages);
						} else {
							/* Is a page */
							categoryUrl.urls.push(item.url);
						}
					}
				}
				recurseItems(field.versions[0].category);
				categoryUrlTable.push(categoryUrl);
			}
		}
	}
	return categoryUrlTable;
}

console.time("generate");

const categoryUrls = generate();
await writeFile(
	"./categoryUrlTable.json",
	JSON.stringify(categoryUrls, null, "\t")
);

console.timeEnd("generate");
