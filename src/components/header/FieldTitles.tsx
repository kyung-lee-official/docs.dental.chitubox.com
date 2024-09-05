"use client";

import { MediaQuery } from "@/utils/types";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import { usePageContext } from "@/utils/hooks";
import docsContext from "@/preload/docsContext.json";
import { DocsContext } from "@/utils/types";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

const FieldTitles = () => {
	const locale = useLocale();
	const pathname = usePathname();
	const isLg = useMediaQuery({ query: MediaQuery.lg });
	let activeField: string;
	const pageCtx = usePageContext();
	if (pageCtx) {
		activeField = pageCtx.fieldName;
	}
	const localeCtx = (docsContext as DocsContext).find((localeCtx) => {
		return localeCtx.locale === locale;
	});
	if (!localeCtx) return null;
	const fields = localeCtx.localizedFields.map((field) => {
		return {
			fieldId: field.fieldId,
			fieldName: field.fieldName,
			homeUrl: field.homeUrl,
			url: field.homeUrl,
		};
	});

	if (isLg) {
		return (
			<div
				className="flex gap-10
				cursor-default"
			>
				{fields.map((field) => {
					return (
						<Link
							href={field.url}
							key={field.url}
							className={`text-xl ${
								pathname.startsWith(
									`/${locale}/${field.fieldId}`
								) && "text-blue-500 dark:text-sky-400"
							}
							cursor-pointer`}
						>
							{field.fieldName}
						</Link>
					);
				})}
			</div>
		);
	} else {
		return null;
	}
};

export default FieldTitles;
