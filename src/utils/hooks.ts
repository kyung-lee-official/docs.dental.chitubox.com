import { usePathname } from "next/navigation";
import { FlattenPage } from "./types";
import flattenContext from "@/preload/flattenContext.json";

export function usePageContext() {
	const pathname = usePathname();
	const ctx = (flattenContext as FlattenPage[]).find((ctx) => {
		return ctx.url === pathname;
	});
	if (ctx) {
		const {
			locale,
			fieldId,
			fieldName,
			isVersioned,
			type,
			homeUrl,
			versionCode,
			pageId,
			label,
			url,
			toc,
		} = ctx;
		return {
			locale,
			fieldId,
			fieldName,
			isVersioned,
			type,
			homeUrl,
			versionCode,
			pageId,
			label,
			url,
			toc,
		} as FlattenPage;
	} else {
		return null;
	}
}
