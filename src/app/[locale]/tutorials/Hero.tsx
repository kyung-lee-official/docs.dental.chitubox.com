import { MediaQuery } from "@/utils/types";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
	const isLg = useMediaQuery({ query: MediaQuery.lg });

	return isLg ? (
		<img
			src="/images/pages/en-US/tutorials/hero.jpg"
			alt=""
			className="rounded-lg"
		/>
	) : (
		<img
			src="/images/pages/en-US/tutorials/hero-v.jpg"
			alt=""
			className="rounded-lg"
		/>
	);
};

export default Hero;
