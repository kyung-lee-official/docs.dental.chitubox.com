import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getFlattenToc } from "@/utils/data";
import { DocsSearchResult } from "./DocsSearchResult";
import { usePageContext } from "@/utils/hooks";
import docsContext from "@/preload/docsContext.json";
import { DocsContext, FlattenPage } from "@/utils/types";
import flattenContext from "@/preload/flattenContext.json";

export const DocsSearch = (props: {
	setShowMenu: Dispatch<SetStateAction<boolean>>;
}) => {
	const { setShowMenu } = props;

	const [searchTerm, setSearchTerm] = useState<string>("");
	const [searchResults, setSearchResults] = useState<any>([]);

	function onSearchTermChange(event: any) {
		setSearchTerm(event.target.value.toLowerCase());
	}

	useEffect(() => {
		if (searchTerm !== "" && flattenPages) {
			const searchResults = flattenPages.filter((flattenPage) => {
				if (
					flattenPage.label.toLowerCase().indexOf(searchTerm) !== -1
				) {
					return true;
				} else if (flattenPage.toc) {
					/* TOC is not empty */
					const flattenToc = getFlattenToc(flattenPage.toc);
					if (flattenToc) {
						return flattenToc.some((heading: any) => {
							return (
								heading.value
									.toLowerCase()
									.indexOf(searchTerm) !== -1
							);
						});
					} else {
						return false;
					}
				} else {
					/* TOC is empty */
					return false;
				}
			});
			setSearchResults(searchResults);
		} else {
			setSearchResults([]);
		}
	}, [searchTerm, setSearchResults]);

	const pageCtx = usePageContext();
	if (!pageCtx) return null;
	const { locale, fieldId, isVersioned, versionCode } = pageCtx;

	const localeCtx = (docsContext as DocsContext).find((localeCtx) => {
		return localeCtx.locale === locale;
	});
	if (!localeCtx) return null;
	const field = localeCtx.localizedFields.find((field) => {
		return field.fieldId === fieldId;
	});
	if (!field) return null;
	const version = field.versions.find((version) => {
		return version.versionCode === versionCode;
	});
	if (!version) return null;

	const flattenPagesOfThisField = (flattenContext as FlattenPage[]).filter(
		(flattenPage) => {
			return (
				flattenPage.locale === locale && flattenPage.fieldId === fieldId
			);
		}
	);

	let flattenPages: FlattenPage[] = [];
	if (isVersioned) {
		flattenPages = flattenPagesOfThisField.filter((flattenPage) => {
			return flattenPage.versionCode === versionCode;
		});
	} else {
		flattenPages = flattenPagesOfThisField;
	}

	if (field && field.type === "book") {
		return (
			<div className="flex flex-col gap-4">
				<form
					onSubmit={(e) => {
						/* Prevent form submissions when enter is pressed inside input */
						e.preventDefault();
					}}
				>
					<input
						className={`w-full h-8 px-3
						text-neutral-600 dark:text-neutral-300
						bg-neutral-100 dark:bg-neutral-800
						rounded-md outline-none
						transition-all`}
						type="search"
						name="search"
						id="search"
						value={searchTerm}
						placeholder={"Search"}
						onChange={onSearchTermChange}
						autoComplete="off"
					/>
				</form>
				<DocsSearchResult
					searchResults={searchResults}
					setShowMenu={setShowMenu}
				/>
			</div>
		);
	} else {
		return null;
	}
};
