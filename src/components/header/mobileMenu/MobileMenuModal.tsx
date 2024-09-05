import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { DocsMenu } from "./DocsMenu";
import { LanguageMenu } from "./LanguageMenu";
import { DocsSearch } from "./DocsSearch";
import { FieldTitles } from "./FieldTitles";
import { usePageContext } from "@/utils/hooks";

const MobileMenuModal = (props: {
	showMenu: boolean;
	setShowMenu: Dispatch<SetStateAction<boolean>>;
}) => {
	const { showMenu, setShowMenu } = props;
	const [headerHeight, setHeaderHeight] = useState("0px");

	useEffect(() => {
		const header = document.getElementById("header");
		if (!header) return;
		const resizeObserver = new ResizeObserver(() => {
			/* Do what you want to do when the size of the element changes */
			setHeaderHeight(`${header.clientHeight}px`);
		});
		resizeObserver.observe(header);
		return () => resizeObserver.disconnect(); /* clean up */
	}, []);

	const main = document.getElementsByTagName("main")[0];
	if (main) {
		main.style.display = showMenu ? "none" : "";
	}
	const footer = document.getElementsByTagName("footer")[0];
	if (footer) {
		footer.style.display = showMenu ? "none" : "";
	}

	const rootPortal = document.getElementById("root-portal");
	if (rootPortal) {
		return createPortal(
			<AnimatePresence>
				{showMenu && (
					<motion.div
						key={"mobile-menu"}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="absolute right-0 left-0 p-4
						text-neutral-900 dark:text-neutral-200
						bg-white dark:bg-black
						z-10"
						style={{
							top: headerHeight,
							height: `calc(100vh - ${headerHeight})`,
						}}
					>
						<div
							className="flex flex-col w-full gap-4 overflow-y-auto"
							style={{
								height: `calc(100vh - ${headerHeight} - 32px)` /* here 32px is the padding of the parent div */,
							}}
						>
							<FieldTitles />
							<div className="flex flex-col w-full gap-4">
								<DocsSearch setShowMenu={setShowMenu} />
								<DocsMenu setShowMenu={setShowMenu} />
								<LanguageMenu />
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>,
			rootPortal as Element
		);
	} else {
		return null;
	}
};

export default MobileMenuModal;
