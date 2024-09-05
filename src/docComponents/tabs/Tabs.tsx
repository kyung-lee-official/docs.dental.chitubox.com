"use client";

import { useState } from "react";

const Label = (props: any) => {
	const { isActive, onClick, children } = props;

	return (
		<div
			className={`flex 
            ${isActive && "text-blue-500 dark:text-sky-400"}
            cursor-pointer`}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

const Labels = (props: any) => {
	const { items, activeKey, setActiveKey } = props;

	return (
		<div className="flex gap-10 text-xl">
			{items.map((item: any, i: number) => {
				return (
					<Label
						key={i}
						isActive={item.key === activeKey}
						onClick={() => {
							setActiveKey(item.key);
						}}
					>
						{item.label}
					</Label>
				);
			})}
		</div>
	);
};

export const Tabs = (props: any) => {
	const { defaultActiveKey, items, onChange } = props;
	const [activeKey, setActiveKey] = useState<"windows" | "macos" | "ubuntu">(
		defaultActiveKey
	);

	return (
		<div>
			<Labels
				items={items}
				activeKey={activeKey}
				setActiveKey={setActiveKey}
			/>
			{items.map((item: any, i: number) => {
				if (item.key == activeKey) {
					return <div key={item.key}>{item.children}</div>;
				}
			})}
		</div>
	);
};
