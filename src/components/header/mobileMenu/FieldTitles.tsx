import { useState } from "react";
import { usePageContext } from "@/utils/hooks";
import { useLocale } from "next-intl";
import docsContext from "@/preload/docsContext.json";
import { DocsContext } from "@/utils/types";
import { Block } from "./Block";
import Link from "next/link";
import { ChevronRightIcon, DocsIcon } from "@/components/icons/Icons";
import { usePathname } from "next/navigation";

export const FieldTitles = () => {
	const locale = useLocale();
	const pathname = usePathname();
	const [showMenu, setShowMenu] = useState<boolean>(false);
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

	return (
		<Block>
			<button
				className="flex justify-between items-center py-2 gap-4"
				onClick={() => {
					setShowMenu(!showMenu);
				}}
			>
				<div className="flex items-center gap-2">
					<DocsIcon size={24} /> Docs
				</div>
				<div
					className={
						showMenu ? "rotate-90 duration-200" : "duration-200"
					}
				>
					<ChevronRightIcon size={24} />
				</div>
			</button>
			{showMenu && (
				<div
					className="flex flex-col pl-3
					border-t-[1px] border-solid border-neutral-200 dark:border-neutral-700"
				>
					{fields.map((field, i: number) => {
						return (
							<div key={field.url} className="flex flex-col">
								<Link
									href={field.url}
									className={`py-2 ${
										pathname.startsWith(
											`/${locale}/${field.fieldId}`
										) && "text-blue-500 dark:text-sky-400"
									}`}
								>
									{field.fieldName}
								</Link>
								{i !== fields.length - 1 && (
									<hr className="dark:border-neutral-700" />
								)}
							</div>
						);
					})}
				</div>
			)}
		</Block>
	);
};
