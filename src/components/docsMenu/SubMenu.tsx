import Link from "next/link";
import { useEffect, useState } from "react";
import { SubMenuToggle } from "../icons/Icons";
import _ from "lodash";
import { AnimatePresence, motion } from "framer-motion";
import { SectionContextWithoutToc } from "@/utils/types";

export const SubMenu = (props: {
	sectionCtx: SectionContextWithoutToc;
	pathname: string;
	openKeys: string[];
	setOpenKeys: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
	const { sectionCtx, pathname, openKeys, setOpenKeys } = props;

	const [hasActiveKey, setHasActiveKey] = useState(
		sectionCtx.url === pathname ||
			sectionCtx.pages.some((page) => {
				return page.url === pathname;
			})
	);

	useEffect(() => {
		setHasActiveKey(
			sectionCtx.url === pathname ||
				sectionCtx.pages.some((page) => {
					return page.url === pathname;
				})
		);

		if (
			sectionCtx.url === pathname ||
			sectionCtx.pages.some((page: any) => {
				return page.url === pathname;
			})
		) {
			setOpenKeys(_.uniq([...openKeys, sectionCtx.url]));
		}
	}, [pathname]);

	return (
		<div>
			<Link
				href={sectionCtx.url}
				className={`flex justify-between items-center
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
					duration-100`}
				>
					<SubMenuToggle size={24} />
				</div>
			</Link>
			<AnimatePresence>
				{openKeys.includes(sectionCtx.url) && (
					<motion.div
						initial={{ opacity: 0, y: -10, scaleY: 0.8 }}
						animate={{
							opacity: 1,
							y: 0,
							scaleY: 1,
							transition: { duration: 0.05 },
						}}
						exit={{
							opacity: 0,
							y: -10,
							scaleY: 0.8,
							transition: { duration: 0.05 },
						}}
						className="flex flex-col gap-2 list-none py-2 origin-top"
					>
						{sectionCtx.pages.map((page, i: number) => {
							if (page.url === pathname) {
								return (
									<Link href={page.url} key={page.url}>
										<div className="pl-6 text-blue-500 dark:text-sky-400">
											{page.label}
										</div>
									</Link>
								);
							} else {
								return (
									<Link href={page.url} key={page.url}>
										<div className="pl-6">{page.label}</div>
									</Link>
								);
							}
						})}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
