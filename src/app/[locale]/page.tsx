import { Link, redirect } from "@/navigation";
import { Locale } from "@/utils/types";
import { unstable_setRequestLocale } from "next-intl/server";

function Page(props: { params: { locale: Locale } }) {
	const {
		params: { locale },
	} = props;

	unstable_setRequestLocale(locale);

	redirect("/user-manual/latest/basic-vs-dental");

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
