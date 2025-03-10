"use client";

import Link from "next/link";
import { useState } from "react";
import { SubMenu } from "./SubMenu";
import { usePathname } from "next/navigation";
import categoryUrlTable from "@/preload/categoryUrlTable.json";
import { CategoryUrlMap } from "@/utils/types";

export const DocsMenu = () => {
	const pathname = usePathname();
	const category = (categoryUrlTable as CategoryUrlMap[]).find((cat) => {
		return cat.urls.some((url) => {
			return url === pathname;
		});
	});

	/* Set activeKey and openKey for Menu. */
	const [openKeys, setOpenKeys] = useState<string[]>([]);

	if (category) {
		return (
			<ul
				className="flex flex-col p-4 gap-2 
				list-none"
			>
				{category.catWithoutToc.map((item, i: number) => {
					if ("pages" in item) {
						/* Is a section */
						return (
							<SubMenu
								key={item.url}
								sectionCtx={item}
								pathname={pathname}
								openKeys={openKeys}
								setOpenKeys={setOpenKeys}
							/>
						);
					} else {
						/* Is a page */
						return (
							<Link href={item.url} key={item.url}>
								<li
									className={`${
										item.url === pathname &&
										"text-blue-500 dark:text-sky-400"
									}`}
								>
									{item.label}
								</li>
							</Link>
						);
					}
				})}
			</ul>
		);
	} else {
		return null;
	}
};
