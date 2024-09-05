"use client";

import { useEffect, useState } from "react";
import { ResetIcon } from "../../icons/Icons";
import { uniq } from "@/utils/data";

const Tag = (props: {
	children: any;
	selectedTags: string[];
	setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
	clearFilterTrigger: boolean;
}) => {
	const { children, selectedTags, setSelectedTags, clearFilterTrigger } =
		props;
	const [isSelected, setIsSelected] = useState<boolean>(false);

	useEffect(() => {
		if (isSelected) {
			setSelectedTags(uniq([...selectedTags, children]));
		} else {
			setSelectedTags(selectedTags.filter((tag) => tag !== children));
		}
	}, [isSelected]);

	useEffect(() => {
		setIsSelected(false);
	}, [clearFilterTrigger]);

	return (
		<button
			className={`flex px-2 py-1
			${isSelected ? "text-blue-50" : "text-gray-300/80 hover:text-gray-300"}
			${
				isSelected
					? "bg-[#0C88E0] hover:bg-[#0079D1]"
					: "bg-gray-200/20 hover:bg-gray-200/40"
			}
			rounded select-none duration-100`}
			onClick={() => {
				setIsSelected(!isSelected);
			}}
		>
			{children}
		</button>
	);
};

const TagFilter = (props: {
	availableTags: string[];
	selectedTags: string[];
	setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
	const { availableTags, selectedTags, setSelectedTags } = props;

	const [clearFilterTrigger, setClearFilterTrigger] =
		useState<boolean>(false);

	return (
		<div className="flex justify-center items-center flex-wrap gap-6">
			{availableTags.map((tag, i) => {
				return (
					<Tag
						key={i}
						selectedTags={selectedTags}
						setSelectedTags={setSelectedTags}
						clearFilterTrigger={clearFilterTrigger}
					>
						{tag}
					</Tag>
				);
			})}
			<button
				className={`flex justify-center items-center px-2 py-1 h-8
				font-semibold
				text-gray-300/80 hover:text-gray-200
				bg-gray-200/30 hover:bg-[#0C88E0]
				rounded select-none duration-100`}
				onClick={() => {
					setClearFilterTrigger(!clearFilterTrigger);
					setSelectedTags([]);
				}}
			>
				<ResetIcon size={20} />
			</button>
		</div>
	);
};

export default TagFilter;
