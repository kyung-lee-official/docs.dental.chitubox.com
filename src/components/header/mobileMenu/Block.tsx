export const Block = (props: any) => {
	const { children } = props;
	return (
		<div
			className="flex flex-col px-3
			bg-neutral-100 dark:bg-neutral-800
			rounded-md"
		>
			{children}
		</div>
	);
};
