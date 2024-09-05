import { writeFile } from "fs/promises";
import { DocsContext, FlattenPage, ItemContext } from "../utils/types";
import docsContext from "./docsContext.json";

function flatten(): FlattenPage[] {
	const flattenCtx: FlattenPage[] = [];
	for (const localeCtx of docsContext as DocsContext) {
		for (const field of localeCtx.localizedFields) {
			if (field.isVersioned) {
				/* Is versioned */
				for (const version of field.versions) {
					const flattenPages: FlattenPage[] = [];
					function recurseItems(items: ItemContext[]) {
						for (const item of items) {
							if ("pages" in item) {
								/* Is a section */
								const { pages, ...rest } = item;
								flattenPages.push({
									locale: localeCtx.locale,
									fieldId: field.fieldId,
									fieldName: field.fieldName,
									homeUrl: field.homeUrl,
									isVersioned: true,
									type: field.type,
									versionCode: version.versionCode,
									...rest,
								});
								recurseItems(item.pages);
							} else {
								/* Is a page */
								flattenPages.push({
									locale: localeCtx.locale,
									fieldId: field.fieldId,
									fieldName: field.fieldName,
									homeUrl: field.homeUrl,
									isVersioned: true,
									type: field.type,
									versionCode: version.versionCode,
									...item,
								});
							}
						}
					}
					recurseItems(version.category);
					flattenCtx.push(...flattenPages);
				}
			} else {
				/* Not versioned */
				const version = field.versions[0];
				const flattenPages: FlattenPage[] = [];
				function recurseItems(items: ItemContext[]) {
					for (const item of items) {
						if ("pages" in item) {
							/* Is a section */
							const { pages, ...rest } = item;
							flattenPages.push({
								locale: localeCtx.locale,
								fieldId: field.fieldId,
								fieldName: field.fieldName,
								homeUrl: field.homeUrl,
								isVersioned: false,
								type: field.type,
								versionCode: null,
								...rest,
							});
							recurseItems(item.pages);
						} else {
							/* Is a page */
							flattenPages.push({
								locale: localeCtx.locale,
								fieldId: field.fieldId,
								fieldName: field.fieldName,
								homeUrl: field.homeUrl,
								isVersioned: false,
								type: field.type,
								versionCode: null,
								...item,
							});
						}
					}
				}
				recurseItems(version.category);
				flattenCtx.push(...flattenPages);
			}
		}
	}
	return flattenCtx;
}

console.time("flatten");

const flattenCtx = flatten();
/* page based flatten context */
await writeFile(
	"./flattenContext.json",
	JSON.stringify(flattenCtx, null, "\t")
);

console.timeEnd("flatten");
