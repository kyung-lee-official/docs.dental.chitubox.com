"use client";

import { useEffect, useMemo, useState } from "react";
import TagFilter from "@/components/blogDocs/tagFilter/TagFilter";
import _ from "lodash";
import Pagination from "@/components/blogDocs/pagination/Pagination";
import DocsCard from "@/components/blogDocs/docsCard/DocsCard";
import flattenContext from "@/preload/flattenContext.json";
import { FlattenPage } from "@/utils/types";
import { useLocale, useTranslations } from "next-intl";
import DocsSearch from "@/components/blogDocs/docsSearch/DocsSearch";

const Content = () => {
	const t = useTranslations("pages.tutorials");

	const locale = useLocale();

	const pages = (flattenContext as FlattenPage[]).filter(
		(page) => page.fieldId === "title" && page.locale === locale
	);

	const availableTags = useMemo(() => {
		const allTags = pages
			.map((page) => {
				return page.metadata.keywords;
			})
			.flat();
		return _.uniq(allTags).sort();
	}, []);

	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [filteredPages, setFilteredPages] = useState(pages);
	const [searchTerm, setSearchTerm] = useState<string | null>(null);
	const [searchResult, setSearchResult] = useState<FlattenPage[]>(pages);
	const [pagedSearchResult, setPagedSearchResult] = useState<FlattenPage[][]>(
		_.chunk(searchResult, 9)
	);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [currentPageContent, setCurrentPageContent] = useState<FlattenPage[]>(
		pagedSearchResult[currentPage - 1]
	);

	useEffect(() => {
		if (selectedTags.length === 0) {
			setFilteredPages(pages);
		} else {
			/* Filter out docs that don't contain any of selected tags */
			const filteredResult = pages.filter((mdxFile) => {
				const { metadata } = mdxFile;
				const { keywords } = metadata;

				return selectedTags.some((selectedTag: string) =>
					keywords.includes(selectedTag)
				);
			});
			setFilteredPages(filteredResult);
		}
	}, [selectedTags]);

	useEffect(() => {
		if (searchTerm === null || searchTerm === "") {
			setSearchResult(filteredPages);
		} else {
			const searched = filteredPages?.filter((mdxFile) => {
				const { metadata } = mdxFile;
				const { title, description } = metadata;
				return (
					title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					description.toLowerCase().includes(searchTerm.toLowerCase())
				);
			});
			setSearchResult(searched);
		}
	}, [filteredPages, searchTerm]);

	useEffect(() => {
		const pagedSearchResult = _.chunk(searchResult, 9);
		setPagedSearchResult(pagedSearchResult);
		if (pagedSearchResult.length > 0) {
			setCurrentPageContent(pagedSearchResult[0]);
		} else {
			setCurrentPageContent([]);
		}
		setCurrentPage(1);
	}, [searchResult]);

	useEffect(() => {
		setCurrentPageContent(pagedSearchResult[currentPage - 1]);
	}, [currentPage]);

	return (
		<div className="flex flex-col max-w-[1200px] min-h-screen p-10 mx-auto gap-16">
			<div
				className="flex justify-center items-center h-28
				text-6xl font-bold text-neutral-600 dark:text-neutral-300"
			>
				{t("title")}
			</div>
			{/* <DocsSearch
				setSearchTerm={setSearchTerm}
				placeholder={t("search-placeholder")}
			/> */}
			{/* <TagFilter
				availableTags={availableTags}
				selectedTags={selectedTags}
				setSelectedTags={setSelectedTags}
			/> */}
			<div
				className="grid justify-items-stretch gap-8 mx-auto
				grid-cols-1 max-w-[340px]
				md:grid-cols-2 md:max-w-[712px]
				xl:grid-cols-3 xl:min-w-full"
			>
				{/* {currentPageContent.map((mdxFile) => {
					const { url, metadata, toc } = mdxFile;
					const { title, description, openGraph } = metadata;
					return (
						<div
							className="flex justify-center items-center"
							key={url}
						>
							<DocsCard
								url={url}
								title={title}
								description={description}
								ogImage={openGraph.images[0]}
							/>
						</div>
					);
				})} */}
			</div>
			<Pagination
				pagedSearchResult={pagedSearchResult}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	);
};

export default Content;
