"use client";

import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { usePathname } from "next/navigation";
import { SubMenu } from "./SubMenu";
import { Block } from "./Block";
import categoryUrlTable from "@/preload/categoryUrlTable.json";
import { CategoryUrlMap } from "@/utils/types";
import { usePageContext } from "@/utils/hooks";

export const DocsMenu = (props: {
	setShowMenu: Dispatch<SetStateAction<boolean>>;
}) => {
	const pathname = usePathname();
	const category = (categoryUrlTable as CategoryUrlMap[]).find((cat) => {
		return cat.urls.some((url) => {
			return url === pathname;
		});
	});
	const pageCtx = usePageContext();

	const { setShowMenu } = props;

	/* Set activeKey and openKey for Menu. */
	const [openKeys, setOpenKeys] = useState<string[]>([]);

	if (category && pageCtx?.type === "book") {
		return (
			<Block>
				{category.catWithoutToc.map((item, i: number) => {
					if (i < category.catWithoutToc.length - 1) {
						if ("pages" in item) {
							/* Is a section */
							return (
								<div key={item.url}>
									<SubMenu
										sectionCtx={item}
										pathname={pathname}
										openKeys={openKeys}
										setOpenKeys={setOpenKeys}
										setShowMenu={setShowMenu}
									/>
									<hr className="dark:border-neutral-700" />
								</div>
							);
						} else {
							/* Is a page */
							return (
								<Link
									href={item.url}
									key={item.url}
									onClick={() => {
										setShowMenu(false);
									}}
								>
									<div
										className={`py-2 ${
											item.url === pathname &&
											"text-blue-500 dark:text-sky-400"
										}`}
									>
										{item.label}
									</div>
									<hr className="dark:border-neutral-700" />
								</Link>
							);
						}
					} else {
						/* last one */
						if ("pages" in item) {
							/* Is a section */
							return (
								<SubMenu
									key={item.url}
									sectionCtx={item}
									pathname={pathname}
									openKeys={openKeys}
									setOpenKeys={setOpenKeys}
									setShowMenu={setShowMenu}
								/>
							);
						} else {
							/* Is a page */
							return (
								<Link
									href={item.url}
									key={item.url}
									onClick={() => {
										setShowMenu(false);
									}}
								>
									<div
										className={`py-2 ${
											item.url === pathname &&
											"text-blue-500 dark:text-sky-400"
										}`}
									>
										{item.label}
									</div>
								</Link>
							);
						}
					}
				})}
			</Block>
		);
	} else {
		return null;
	}
};
