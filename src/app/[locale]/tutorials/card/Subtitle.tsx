"use client";

import { useLocale } from "next-intl";
import docsContext from "@/preload/docsContext.json";
import { DocsContext, ItemContext, VersionedContext } from "@/utils/types";
import Link from "next/link";

const Subtitle = (props: { fieldName: string; readMore: string }) => {
	const { fieldName, readMore } = props;
	const locale = useLocale();
	const localeCtx = (docsContext as DocsContext).find((localeCtx) => {
		return localeCtx.locale === locale;
	});
	if (!localeCtx) {
		return null;
	}
	const field = localeCtx.localizedFields.find(
		(field) => field.fieldName === fieldName
	);
	if (!field) {
		return null;
	}
	let versionCtx: VersionedContext | undefined;
	if (field.isVersioned) {
		/* Versioned */
		versionCtx = field.versions.find((version) => {
			return version.isLatest;
		});
	} else {
		/* Not versioned */
		versionCtx = field.versions[0];
	}
	if (!versionCtx) {
		return null;
	}

	const { category } = versionCtx;
	const maxItems = 5;
	let trimmedCategory: ItemContext[] = [];
	const isTrimmed = category.length > maxItems;
	if (category.length > maxItems) {
		trimmedCategory = category.slice(0, maxItems);
	} else {
		trimmedCategory = category;
	}

	return (
		<div
			className="flex flex-col w-full
			min-h-fit
			gap-6
			text-sm
			text-neutral-500
			dark:text-neutral-400"
		>
			{trimmedCategory.map((item) => {
				return (
					<Link
						key={item.url}
						href={item.url}
						className="hover:text-neutral-800
						dark:hover:text-neutral-300 underline
						duration-200"
					>
						{item.label}
					</Link>
				);
			})}
			{isTrimmed && (
				<Link
					href={field.homeUrl}
					className="flex justify-end
					hover:text-neutral-800
					dark:hover:text-neutral-300
					duration-200"
				>
					{readMore}
				</Link>
			)}
		</div>
	);
};

export default Subtitle;
