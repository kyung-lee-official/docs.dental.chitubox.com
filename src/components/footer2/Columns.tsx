import { useTranslations } from "next-intl";
import { processHref } from "@/utils/data";

import Link from "next/link";
import { ReactNode } from "react";

const A = (props: { href: string; children: ReactNode }) => {
	const { href, children } = props;
	return (
		<Link href={processHref(href)}>
			<div className="text-sm text-neutral-500 hover:text-white text-nowrap">
				{children}
			</div>
		</Link>
	);
};

const Col = (props: any) => {
	const { title, children } = props;
	return (
		<div className="flex flex-col w-fit gap-6">
			<div className="text-white font-bold">{title}</div>
			<div className="flex flex-col gap-4">{children}</div>
		</div>
	);
};

function Columns() {
	const t = useTranslations();
	const leftSection = t("footer.leftSection", { returnObjects: true });
	if (leftSection) {
		return (
			<div
				className="xl:flex xl:justify-between xl:items-start
				grid [grid-template-columns:repeat(auto-fill,minmax(180px,1fr))] gap-4
				w-full"
			>
				{software && (
					<Col title={leftSection.title}>
						{software.menuList.map((item: any, index: number) => (
							<A key={index} href={item.url}>
								{item.row}
							</A>
						))}
					</Col>
				)}
				{/* {address && (
					<div className="flex flex-col max-w-80 gap-6">
						<div className="text-white font-bold">
							{address.title}
						</div>
						<div className="flex flex-col gap-4">
							{address.row1 && (
								<div className="text-neutral-500">
									{address.row1}
								</div>
							)}
							{address.row2 && (
								<div className="text-neutral-500">
									{address.row2}
								</div>
							)}
							{address.row3 && (
								<div className="text-neutral-500">
									{address.row3}
								</div>
							)}
							{address.row4 && (
								<div className="text-neutral-500">
									{address.row4}
								</div>
							)}
							{address.phoneTitle && (
								<div className="text-neutral-500">
									{address.phoneTitle} {address.phoneNumber}
								</div>
							)}
							{address.email && (
								<div className="text-neutral-500">
									{address.email} {address.emailNumber}
								</div>
							)}
						</div>
					</div>
				)} */}
			</div>
		);
	} else {
		return null;
	}
}

export default Columns;
