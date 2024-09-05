import Link from "next/link";
import { useEffect, useState } from "react";
import { SubMenuToggle } from "../../icons/Icons";
import { SectionContextWithoutToc } from "@/utils/types";
import _ from "lodash";

export const SubMenu = (props: {
	sectionCtx: SectionContextWithoutToc;
	pathname: string;
	openKeys: string[];
	setOpenKeys: React.Dispatch<React.SetStateAction<string[]>>;
	setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const { sectionCtx, pathname, openKeys, setOpenKeys, setShowMenu } = props;

	const [hasActiveKey, setHasActiveKey] = useState(
		sectionCtx.url === pathname ||
			sectionCtx.pages.some((subItem: any) => {
				return subItem.url === pathname;
			})
	);

	useEffect(() => {
		setHasActiveKey(
			sectionCtx.url === pathname ||
				sectionCtx.pages.some((subItem: any) => {
					return subItem.url === pathname;
				})
		);

		if (
			sectionCtx.url === pathname ||
			sectionCtx.pages.some((subItem: any) => {
				return subItem.url === pathname;
			})
		) {
			setOpenKeys(_.uniq([...openKeys, sectionCtx.url]));
		}
	}, [pathname]);

	return (
		<div>
			<Link
				href={sectionCtx.url}
				className={`flex justify-between items-center py-2
				${hasActiveKey && "text-blue-500 dark:text-sky-400"}
				cursor-pointer`}
				onClick={() => {
					if (pathname === sectionCtx.url) {
						setOpenKeys((prev) => {
							if (prev.includes(sectionCtx.url)) {
								return prev.filter(
									(key) => key !== sectionCtx.url
								);
							} else {
								return [...prev, sectionCtx.url];
							}
						});
					}
				}}
			>
				<div>{sectionCtx.label}</div>
				<div
					className={`flex justify-center items-center
					${openKeys.includes(sectionCtx.url) && `transform rotate-90`}
					duration-150`}
				>
					<SubMenuToggle size={24} />
				</div>
			</Link>
			{openKeys.includes(sectionCtx.url) && (
				<ul
					className="flex flex-col list-none
					border-t-[1px] border-solid border-neutral-200 dark:border-neutral-700"
				>
					{sectionCtx.pages.map((subItem: any, i: number) => {
						return (
							<Link
								href={subItem.url}
								key={subItem.url}
								onClick={() => {
									setShowMenu(false);
								}}
							>
								<li
									className={`pl-3 py-2
									${subItem.url === pathname && "text-blue-500 dark:text-sky-400"}`}
								>
									{subItem.label}
								</li>
								{i < sectionCtx.pages.length - 1 && (
									<hr className="ml-3 dark:border-neutral-700" />
								)}
							</Link>
						);
					})}
				</ul>
			)}
		</div>
	);
};
