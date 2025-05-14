"use client";

import { Link } from "@/navigation";
import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { Form } from "./Form";

const DynamicHero = dynamic(() => import("./DynamicHero"), {
	ssr: false,
});

const DocNavItem = (props: { children: ReactNode }) => {
	const { children } = props;
	return (
		<Link
			href={""}
			className="flex items-center p-2.5 gap-2.5
			text-2xl
			bg-[#DADDE3] hover:bg-[#E5E7EB]
			rounded"
		>
			<div
				className="w-1 h-6
				bg-[#2B7FFF] rounded-full"
			></div>
			{children}
		</Link>
	);
};

export const Content = () => {
	return (
		<div className="w-full">
			<DynamicHero />
			<div
				className="flex justify-center p-20
				bg-[#F1F5F9]"
			>
				<div className="flex min-w-0 max-w-[1240px] gap-8">
					<div className="flex-none w-[324px] space-y-9">
						<div
							className="w-full p-10 space-y-8
							bg-white
							rounded-[16px]"
						>
							<h2 className="text-2xl font-bold">
								Document Guides
							</h2>
							<div className="flex flex-col gap-4">
								<DocNavItem>Tutorials</DocNavItem>
								<DocNavItem>User Manual</DocNavItem>
							</div>
						</div>
						<div
							className="w-full p-12 space-y-8
							bg-white
							rounded-[16px]"
						>
							<div className="space-y-4">
								<h2 className="text-2xl font-bold">
									Community Groups
								</h2>
								<div className="flex flex-col gap-2.5">
									<Link href={""}>Facebook</Link>
									<Link href={""}>Discord</Link>
								</div>
							</div>
							<div className="space-y-4">
								<h2 className="text-2xl font-bold">
									Support Email
								</h2>
								<div
									className="flex flex-col gap-2.5
									text-blue-500"
								>
									<Link
										href={
											"mailto://support@dental.chitubox.com"
										}
									>
										support@dental.chitubox.com
									</Link>
								</div>
							</div>
						</div>
					</div>
					<Form />
				</div>
			</div>
		</div>
	);
};
