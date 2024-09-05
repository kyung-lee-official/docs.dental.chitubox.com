"use client";

import { GoSearch } from "@/components/icons/Icons";
import { useState } from "react";

const DocsSearch = (props: {
	setSearchTerm: React.Dispatch<React.SetStateAction<string | null>>;
	placeholder: string;
}) => {
	const { setSearchTerm, placeholder } = props;
	const [isFocused, setIsFocused] = useState<boolean>(false);

	return (
		<div className="flex justify-center items-center">
			<div
				className="flex justify-center items-center w-full
				rounded-md overflow-hidden
				2xl:w-2/3"
			>
				<input
					className="flex-1 h-10 px-4
					text-neutral-500 dark:text-neutral-400
					bg-neutral-100 dark:bg-white/10 
					placeholder-black/40 dark:placeholder-white/40 outline-none"
					placeholder={isFocused ? undefined : placeholder}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<div
					className="flex justify-center items-center w-14 h-10
					text-neutral-500 dark:text-neutral-400
					bg-neutral-100 dark:bg-white/10"
				>
					<GoSearch size={20} />
				</div>
			</div>
		</div>
	);
};

export default DocsSearch;
