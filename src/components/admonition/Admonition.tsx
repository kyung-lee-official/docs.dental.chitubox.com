import React from "react";
import { Dangerous, InfoCircle, Lightbulb, Warning } from "../icons/Icons";

const Icon: React.FC<any> = ({ type }) => {
	switch (type) {
		case "note":
			return <InfoCircle size={30} />;
		case "tip":
			return <Lightbulb size={30} />;
		case "warning":
			return <Warning size={30} />;
		case "danger":
			return <Dangerous size={30} />;
		default:
			return null;
			break;
	}
};

interface Admonition {
	children: any;
	type?: "note" | "tip" | "warning" | "danger";
	title?: string;
}

const AdmonitionContainer = (props: any) => {
	const { type, children } = props;

	let dynamicClassName;

	switch (type) {
		case "note":
			dynamicClassName =
				"text-blue-900 dark:text-blue-300 bg-blue-500/30 border-blue-500";
			break;
		case "tip":
			dynamicClassName =
				"text-lime-700 dark:text-lime-300 bg-lime-500/30 border-lime-500";
			break;
		case "warning":
			dynamicClassName =
				"text-amber-700 dark:text-amber-400 bg-amber-400/30 border-amber-400";
			break;
		case "danger":
			dynamicClassName =
				"text-red-700 dark:text-red-300 bg-red-500/30 border-red-500";
			break;
		default:
			break;
	}

	return (
		<div
			className={`flex flex-col gap-4 p-4 my-4
            border-l-4 ${dynamicClassName}
            rounded-lg`}
		>
			{children}
		</div>
	);
};

export const Admonition = ({ type, title, children }: Admonition) => {
	if (!type) {
		type = "note";
		if (!title) {
			title = "NOTE";
		}
	} else {
		if (!title) {
			switch (type) {
				case "note":
					title = "NOTE";
					break;
				case "tip":
					title = "TIP";
					break;
				case "warning":
					title = "WARNING";
					break;
				case "danger":
					title = "DANGER";
					break;
				default:
					title = "";
					break;
			}
		}
	}
	title = title.toUpperCase();
	return (
		<AdmonitionContainer type={type}>
			<div
				className="flex justify-start items-center gap-3
				font-bold"
			>
				<Icon type={type} />
				{title}
			</div>
			<div>{children}</div>
		</AdmonitionContainer>
	);
};
