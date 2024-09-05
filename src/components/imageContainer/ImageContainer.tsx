export const ImageContainer = (props: any) => {
	const { src, alt, style } = props;
	return (
		<div
			className={`flex items-center w-fit my-4
            drop-shadow rounded-md overflow-hidden`}
		>
			<img src={src} alt={alt ?? ""} style={style} />
		</div>
	);
};
