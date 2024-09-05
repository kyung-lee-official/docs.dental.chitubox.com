import { useTranslations } from "next-intl";
import Content from "./Content";
import { unstable_setRequestLocale } from "next-intl/server";
import { Locale } from "@/utils/types";

function Page(props: { params: { locale: Locale } }) {
	const { params } = props;
	const { locale } = params;
	unstable_setRequestLocale(locale);

	const t = useTranslations("pages.learning");
	return (
		<main className="dark:bg-black">
			<Content
				title={t("title")}
				searchPlaceholder={t("search-placeholder")}
			/>
		</main>
	);
}

export default Page;
