import Content from "./Content";
import { setRequestLocale } from "next-intl/server";
import { Locale } from "@/utils/types";

async function Page(props: { params: Promise<{ locale: Locale }> }) {
	const { params } = props;
	const { locale } = await params;
	setRequestLocale(locale);

	return (
		<main className="dark:bg-black">
			<Content />
		</main>
	);
}

export default Page;
