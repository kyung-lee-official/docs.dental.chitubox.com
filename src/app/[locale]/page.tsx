import { Link, redirect } from "@/navigation";
import { Locale } from "@/utils/types";
import { setRequestLocale } from "next-intl/server";

async function Page(props: { params: Promise<{ locale: Locale }> }) {
	const { params } = props;
	const { locale } = await params;
	setRequestLocale(locale);
	redirect("/tutorials");

	// return (
	// 	<main
	// 		className="flex flex-col items-center justify-center w-full min-w-0 min-h-svh py-4
	// 		px-4 lg:px-16
	// 		mx-auto
	// 		text-neutral-900 dark:text-neutral-200
	// 		dark:bg-black"
	// 	>
	// 		<div className="flex justify-center w-full">
	// 			<Link href="/user-manual/latest/introduction">Manual</Link>
	// 			<Link href="/learning">Learning</Link>
	// 		</div>
	// 	</main>
	// );
}

export default Page;
