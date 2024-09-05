import Link from "next/link";
import { Block } from "./Block";
import { Dispatch, SetStateAction } from "react";
import { FlattenPage } from "@/utils/types";

export const DocsSearchResult = (props: {
	searchResults: FlattenPage[];
	setShowMenu: Dispatch<SetStateAction<boolean>>;
}) => {
	const { searchResults, setShowMenu } = props;

	if (searchResults.length > 0) {
		return (
			<Block>
				{searchResults.map((result, i: number) => {
					const { label, url } = result;
					if (i < searchResults.length - 1) {
						return (
							<Link href={url} key={url}>
								<div
									className="flex justify-start items-center py-2"
									onClick={() => {
										setShowMenu(false);
									}}
								>
									{label}
								</div>
								<hr className="dark:border-neutral-700" />
							</Link>
						);
					} else {
						return (
							<Link
								href={url}
								key={url}
								className="flex justify-start items-center py-2"
								onClick={() => {
									setShowMenu(false);
								}}
							>
								{label}
							</Link>
						);
					}
				})}
			</Block>
		);
	} else {
		return null;
	}
};
