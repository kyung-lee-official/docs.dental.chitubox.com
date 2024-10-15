export const BlogImageContainer = (props: any) => {
	const { src, alt, figcaption, style } = props;
	return (
		<div
			className={`flex flex-col items-center w-full my-4 gap-2
            drop-shadow`}
		>
			<img
				src={src}
				alt={alt ?? ""}
				style={style}
				className="rounded-md overflow-hidden"
			/>
			{figcaption && (
				<figcaption className="text-center text-sm text-gray-500">
					{figcaption}
				</figcaption>
			)}
		</div>
	);
};
