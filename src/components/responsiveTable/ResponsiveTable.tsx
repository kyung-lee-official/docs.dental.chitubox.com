const Table = (props: any) => {
	const { children } = props;
	return (
		<table
			className="w-full min-w-[700px] text-center
            [&_>_thead_>_tr_>_th]:bg-neutral-100 dark:[&_>_thead_>_tr_>_th]:bg-neutral-800
            [&_>_thead_>_tr_>_th]:p-2
            [&_>_tbody_>_tr_>_td]:p-2
            [&_>_tbody_>_tr_>_td]:text-left
            [&_>_tbody_>_tr_>_td]:border-[1px] dark:[&_>_tbody_>_tr_>_td]:border-neutral-800
            [&_>_tbody_>_tr_>_td:first-child]:border-l-[0px] [&_>_tbody_>_tr_>_td:last-child]:border-r-[0px]
			[&_>_tbody_>_tr_>_td]:border-b-[0px]
            [&_>_tbody_>_tr:last-child_>_td:first-child]:rounded-bl-md
            [&_>_tbody_>_tr:last-child_>_td:last-child]:rounded-br-md"
		>
			{children}
		</table>
	);
};

export const ResponsiveTable = ({ children }: any) => {
	return (
		<div
			className="flex w-full my-8 overflow-x-auto horizontal-scrollbar
			border-[1px] border-neutral-200 dark:border-neutral-800
			rounded-md"
		>
			<Table>{children}</Table>
		</div>
	);
};
