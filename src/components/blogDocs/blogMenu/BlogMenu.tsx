import docsContext from "@/preload/docsContext.json";
import { DocsContext } from "@/utils/types";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

export const BlogMenu = () => {
	const locale = useLocale();
	const [headerHeight, setHeaderHeight] = useState("0px");
	const t = useTranslations();
	const localeCtx = (docsContext as DocsContext).find((localeCtx) => {
		return localeCtx.locale === locale;
	});

	if (!localeCtx) return null;
	const localizedFields = localeCtx.localizedFields;

	useEffect(() => {
		const header = document.getElementById("header");
		if (!header) return;
		const resizeObserver = new ResizeObserver(() => {
			/* Do what you want to do when the size of the element changes */
			setHeaderHeight(`${header.clientHeight}px`);
		});
		resizeObserver.observe(header);
		return () => resizeObserver.disconnect(); /* clean up */
	}, []);

	return (
		<div
			className="sticky
            flex flex-col h-fit p-10 mx-auto gap-10
            text-xl
            bg-black/5
            rounded-xl"
			style={{
				top: `calc(70px + ${headerHeight})`,
			}}
		>
			<Link href={`/${locale}/tutorials`} className="underline">
				{t("pages.tutorials.title")}
			</Link>
			{localizedFields.map((field, i) => {
				if (field.fieldName === "User Manual") return null;
				return (
					<div key={i} className="flex items-center gap-3">
						<div
							className="w-1 h-8
                            bg-sky-600
                            rounded-full"
						></div>
						<Link href={field.homeUrl} className="text-sm">{field.fieldName}</Link>
					</div>
				);
			})}
			{localizedFields.map((field, i) => {
				if (field.fieldName === "User Manual") {
					return (
						<Link
							key={i}
							href={field.homeUrl}
							className="underline"
						>
							{field.fieldName}
						</Link>
					);
				}
			})}
		</div>
	);
};
