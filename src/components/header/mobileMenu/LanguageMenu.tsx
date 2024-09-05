import { useState } from "react";
import { ChevronRightIcon, LanguageIcon } from "@/components/icons/Icons";
import { Link, usePathname } from "@/navigation";
import { Block } from "./Block";

export const LanguageMenu = () => {
	const pathname = usePathname();
	const [showSubmenu, setShowSubmenu] = useState<boolean>(false);

	return (
		<Block>
			<button
				className="flex justify-between items-center py-2 gap-4"
				onClick={() => {
					setShowSubmenu(!showSubmenu);
				}}
			>
				<LanguageIcon size={24} />
				<div
					className={
						showSubmenu ? "rotate-90 duration-200" : "duration-200"
					}
				>
					<ChevronRightIcon size={24} />
				</div>
			</button>
			{showSubmenu && (
				<div
					className="flex flex-col pl-3
					border-t-[1px] border-solid border-neutral-200 dark:border-neutral-700"
				>
					<Link href={pathname} locale="en-US" className="py-2">
						English
					</Link>
					<hr className="dark:border-neutral-700" />
					<Link href={pathname} locale="zh-CN" className="py-2">
						简体中文
					</Link>
				</div>
			)}
		</Block>
	);
};
