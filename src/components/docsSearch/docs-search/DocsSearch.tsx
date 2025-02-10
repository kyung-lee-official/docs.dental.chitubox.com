"use client";

import { useEffect, useRef, useState } from "react";
import { GoSearch } from "../../icons/Icons";
import { FlattenPage, MediaQuery } from "@/utils/types";
import { getFlattenToc } from "@/utils/data";
import { useMediaQuery } from "react-responsive";
import dynamic from "next/dynamic";
import { usePageContext } from "@/utils/hooks";
import docsContext from "@/preload/docsContext.json";
import { DocsContext } from "@/utils/types";
import flattenContext from "@/preload/flattenContext.json";

const DynamicDocsSearchResult = dynamic(
	() => import("@/components/docsSearch/DocsSearchResult"),
	{
		ssr: false,
	}
);

const DocsSearch = () => {
	const searchIconRef = useRef<any>(null);
	const [showInput, setShowInput] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [searchResults, setSearchResults] = useState<FlattenPage[]>([]);

	function onSearchTermChange(event: any) {
		setSearchTerm(event.target.value.toLowerCase());
	}

	useEffect(() => {
		function handleClickOutside(event: any) {
			if (
				searchIconRef.current &&
				!searchIconRef.current.contains(event.target) &&
				!event.target.classList.contains("search-input")
			) {
				setShowInput(false);
			}
		}
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [searchIconRef]);

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

	const isLg = useMediaQuery({ query: MediaQuery.lg });

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

	if (isLg && field) {
		return (
			<div className="relative flex justify-center items-center">
				<div
					ref={searchIconRef}
					className="cursor-pointer"
					onClick={() => {
						setShowInput(true);
					}}
				>
					<GoSearch size={32} />
				</div>
				<div
					className="absolute top-0 right-10
					flex flex-col justify-start items-end gap-6"
				>
					<form
						onSubmit={(e) => {
							/* Prevent form submissions when enter is pressed inside input */
							e.preventDefault();
						}}
					>
						<input
							className={`search-input
							${showInput ? "w-64" : "w-0"} h-8 ${showInput && "px-6"}
							text-neutral-600 dark:text-neutral-300
							bg-neutral-200 dark:bg-neutral-800
							rounded-full ${showInput ? "opacity-100" : "opacity-0"} outline-none
							transition-all duration-300`}
							type="search"
							name="search"
							id="search"
							value={searchTerm}
							placeholder={"Search"}
							onChange={onSearchTermChange}
							autoComplete="off"
							onBlur={() => {
								setSearchTerm("");
							}}
						/>
					</form>
					<DynamicDocsSearchResult searchResults={searchResults} />
				</div>
			</div>
		);
	} else {
		return null;
	}
};

export default DocsSearch;
