import docsContext from "@/preload/docsContext.json";
import { DocsContext } from "@/utils/types";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const BlogMenu = () => {
	const locale = useLocale();
	const [headerHeight, setHeaderHeight] = useState("0px");
	const t = useTranslations();

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

	const localeCtx = (docsContext as DocsContext).find((localeCtx) => {
		return localeCtx.locale === locale;
	});
	if (!localeCtx) return null;
	const localizedFields = localeCtx.localizedFields;
	console.log("localizedFields: ", localizedFields);
	
	return (
		<div
			className="sticky
            flex flex-col w-80 h-fit mx-auto gap-12 pt-12 pb-12 pl-10 pr-10 
            bg-[#E5E7EB] dark:bg-[#0F172A]
            rounded-[16px]"
			style={{
				top: `calc(100px + ${headerHeight})`,
			}}
		>
			<div className="flex flex-col gap-8">
				<div className="w-60 h-[33px]">
					<Link
						href={`/${locale}/tutorials`}
						className="text-[28px] font-bold text-[#030712] dark:text-[#E2E8F0]"
					>
						{t("pages.tutorials.title")}
					</Link>
				</div>
				<div className="flex flex-col gap-6">
					{localizedFields.map((field, i) => {
						const pathName = usePathname();
						const isActive = pathName.includes(
							field.fieldId.toLowerCase().replace(/\s+/g, "-")
						);
						if (field.fieldId === "user-manual") {
							return null;
						}
						return (
							<div
								key={i}
								className={`flex items-center gap-6 p-2.5 h-13 w-60 rounded-sm
						 ${isActive ? "bg-[#D1D5DB] dark:bg-[#1e293b]" : "hover:bg-[#DADDE3] dark:hover:bg-[#161f33]"}`}
							>
								<div
									className="w-1 h-8
                            bg-sky-600
                            rounded-sm"
								></div>
								<Link href={field.homeUrl} className="text-2xl text-[#030712] dark:text-[#E2E8F0]">
									{field.fieldName}
								</Link>
							</div>
						);
					})}
				</div>
			</div>
			{localizedFields.map((field, i) => {
				if (field.fieldId === "user-manual") {
					return (
						<div className="" key={i}>
							<Link
								href={field.homeUrl}
								className="text-[28px] font-bold text-[#030712] dark:text-[#E2E8F0]"
							>
								{field.fieldName}
							</Link>
						</div>
					);
				}
			})}
		</div>
	);
};
