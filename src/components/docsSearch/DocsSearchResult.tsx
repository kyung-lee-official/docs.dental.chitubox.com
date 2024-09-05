import { FlattenPage, MediaQuery } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";

const DocsSearchResult = (props: { searchResults: FlattenPage[] }) => {
	const { searchResults } = props;
	const router = useRouter();
	const isLg = useMediaQuery({ query: MediaQuery.lg });

	if (isLg) {
		if (searchResults.length > 0) {
			return (
				<div
					className="flex flex-col gap-2 w-64 py-3
					bg-white dark:bg-black
					border-[1px] border-neutral-200 dark:border-neutral-800
					rounded-md cursor-default"
				>
					{searchResults.map((result, i: number) => {
						const { label, url } = result;
						return (
							<div
								className="flex justify-start items-center px-6
                                hover:text-sky-400
                                cursor-pointer"
								key={url}
								onMouseDown={() => {
									router.push(url);
								}}
							>
								{label}
							</div>
						);
					})}
				</div>
			);
		} else {
			return null;
		}
	} else {
		return null;
	}
};

export default DocsSearchResult;
