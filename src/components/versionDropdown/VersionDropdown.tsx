"use client";

import { useState } from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { TbVersions } from "../icons/Icons";
import { MediaQuery } from "@/utils/types";
import { usePageContext } from "@/utils/hooks";
import docsContext from "@/preload/docsContext.json";
import { DocsContext } from "@/utils/types";

const VersionDropdown = () => {
	const [showVersionMenu, setShowVersionMenu] = useState<boolean>(false);

	const isLg = useMediaQuery({ query: MediaQuery.lg });

	const pageCtx = usePageContext();
	if (!pageCtx) return null;
	const { locale, fieldId, isVersioned } = pageCtx;
	const localeCtx = (docsContext as DocsContext).find((localeCtx) => {
		return localeCtx.locale === locale;
	});
	if (!localeCtx) return null;
	const field = localeCtx.localizedFields.find((field) => {
		return field.fieldId === fieldId;
	});
	if (!field) return null;

	if (isLg && isVersioned) {
		return (
			<div className="relative w-8 h-8">
				<div
					className="absolute right-0
					flex flex-col justify-start items-end gap-6
					whitespace-nowrap"
					onMouseLeave={() => {
						setShowVersionMenu(false);
					}}
				>
					<button
						onMouseEnter={() => {
							setShowVersionMenu(true);
						}}
					>
						<TbVersions size={32} />
					</button>
					{showVersionMenu && (
						<ul
							className="flex flex-col items-center p-2 gap-1
							bg-white dark:bg-black
							border-[1px] border-neutral-200 dark:border-neutral-800
							rounded-md"
						>
							{field.versions.map((version, i: any) => {
								return (
									<Link
										href={version.category[0].url}
										key={i}
										className="w-full px-2 py-1
										hover:bg-neutral-100 dark:hover:bg-neutral-800
										rounded"
									>
										{version.isLatest
											? "latest"
											: version.versionCode}
									</Link>
								);
							})}
						</ul>
					)}
				</div>
			</div>
		);
	} else {
		return null;
	}
};

export default VersionDropdown;
