import Link from "next/link";
import Subtitle from "./Subtitle";

export const Card = (props: {
	href: string;
	title: string;
	description: string;
	fieldName: string;
	readMore: string;
}) => {
	const { href, title, description, fieldName, readMore } = props;

	return (
		<div
			className="flex flex-col items-start p-6 gap-4
			bg-neutral-100/70 dark:bg-neutral-800/60
			rounded-xl hover:shadow duration-200"
		>
			<div className="flex items-center gap-4">
				<div
					className="w-2 h-10
					bg-[#0C88E0]
					rounded-full"
				></div>
				<Link
					href={href}
					className="flex justify-start items-center w-full
					text-lg font-bold
					text-neutral-600 hover:text-neutral-900
					dark:text-neutral-200 dark:hover:text-neutral-50
					duration-200"
				>
					{title}
				</Link>
			</div>
			<div
				className="min-h-16
				text-sm text-neutral-400/60"
			>
				{description}
			</div>
			<Subtitle fieldName={fieldName} readMore={readMore} />
		</div>
	);
};
