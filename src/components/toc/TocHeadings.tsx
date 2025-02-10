import { getFlattenToc } from "@/utils/data";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import _ from "lodash";
import { usePageContext } from "@/utils/hooks";

const TocHeading = (props: any) => {
	const { isActive, depth, children } = props;
	return (
		<div
			className={`my-4 ${depth === 3 && "ml-6"}
            ${isActive && "text-blue-500 dark:text-sky-400"}`}
		>
			{children}
		</div>
	);
};

function Content(props: { toc: any; headerHeight: any }) {
	const { toc, headerHeight } = props;

	const [activeTocItem, setActiveTocItem] = useState("");
	const h2H3Toc = useMemo(() => {
		const flattenToc = getFlattenToc(toc);
		if (flattenToc) {
			return flattenToc.filter((heading: any) => {
				return heading.depth === 2 || heading.depth === 3;
			});
		}
	}, [toc]);
	const h2H3TocIds = useMemo(() => {
		if (h2H3Toc) {
			return h2H3Toc.map((heading: any) => heading.id);
		}
	}, [h2H3Toc]);

	const options = useMemo<{
		root: HTMLDivElement | null;
		rootMargin: string;
		threshold: number[];
	}>(() => {
		return {
			root: null,
			rootMargin: "0px",
			threshold: [0.5],
		};
	}, []);

	const [visibleHeadings, setVisibleHeadings] = useState<string[]>([]);
	useEffect(() => {
		if (h2H3TocIds) {
			/* If there is only one visible entry, this is our "active" heading */
			if (visibleHeadings.length === 1) {
				setActiveTocItem(visibleHeadings[0]);
			} else if (visibleHeadings.length > 1) {
				/**
				 * If there are more than one visible entries,
				 * choose the one that is closest to the top of the viewport
				 * */
				const sortedVisibleHeadings = visibleHeadings.sort(
					(a: any, b: any) => {
						return h2H3TocIds.indexOf(a) - h2H3TocIds.indexOf(b);
					}
				);
				setActiveTocItem(sortedVisibleHeadings[0]);
			} else {
			}
		}
	}, [visibleHeadings]);

	const callback = useCallback(
		(entries: any, observer: any) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					setVisibleHeadings((prev) =>
						_.uniq([...prev, entry.target.id])
					);
				} else {
					setVisibleHeadings((prev) =>
						prev.filter((id) => id !== entry.target.id)
					);
				}
			}
		},
		[h2H3Toc]
	);

	const observerRef = useRef<IntersectionObserver>(undefined);
	useEffect(() => {
		observerRef.current = new IntersectionObserver(callback, options);
		return () => observerRef.current?.disconnect();
	}, []);

	useEffect(() => {
		let h2h3Elements: any;
		if (h2H3Toc && observerRef.current) {
			h2h3Elements = h2H3Toc.map((heading: any) => {
				return document.querySelector(`[id="${heading.id}"]`);
			});
			for (const element of h2h3Elements) {
				observerRef.current.observe(element);
			}
		}
	}, [h2H3Toc, observerRef]);

	const t = useTranslations();

	return (
		<div className="flex flex-col gap-4">
			{h2H3Toc && (
				<div
					className="flex justify-center items-center max-w-max h-8 px-8 mx-auto
                    text-sm
					border-[1px] border-neutral-200 dark:border-neutral-800
                    rounded-full select-none"
				>
					{t("docContent.onThisPage")}
				</div>
			)}
			<div
				className="overflow-y-auto scrollbar"
				style={{
					height: `calc(100vh - ${headerHeight} - 16px - 32px - 16px)`,
				}}
			>
				{h2H3Toc &&
					h2H3Toc.map((heading: any) => {
						return (
							<a href={`#${heading.id}`} key={heading.id}>
								<TocHeading
									isActive={activeTocItem === heading.id}
									depth={heading.depth}
								>
									{heading.value}
								</TocHeading>
							</a>
						);
					})}
			</div>
		</div>
	);
}

export const TocHeadings = (props: any) => {
	const { headerHeight } = props;
	const pageCtx = usePageContext();
	if (!pageCtx) return null;
	const { toc } = pageCtx;
	return <Content toc={toc} headerHeight={headerHeight} />;
};
