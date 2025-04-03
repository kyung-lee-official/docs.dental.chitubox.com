import { forwardRef } from "react";

interface DynamicImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	/* Add any custom props here if needed */
}

const DynamicImage = forwardRef<HTMLImageElement, DynamicImageProps>(
	(props, ref) => {
		return <img ref={ref} {...props} />;
	}
);

export default DynamicImage;
