import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

const NotFound = () => {
	const t = useTranslations();

	return (
		<main
			className="flex flex-col items-center justify-center w-full min-w-0 min-h-svh py-4 gap-4
			px-4 lg:px-16
			mx-auto
			text-neutral-900 dark:text-neutral-200
			dark:bg-black"
		>
			<div className="flex items-center">
				<div
					className="px-4 py-2 mr-4
					text-2xl
					border-r-[1px] border-neutral-500 dark:border-neutral-200"
				>
					404
				</div>
				<div>{t("error.pageNotFound")}</div>
			</div>
			<Link
				href={"/"}
				className="p-2
				border-[1px] border-neutral-900 dark:border-neutral-200
				rounded-lg"
			>
				{t("error.backHome")}
			</Link>
		</main>
	);
};

export default NotFound;
