import { Banner } from "./Banner";
import { Navigator } from "./Navigator";

export const Header = () => {
	return (
		<header id="header" className="sticky top-0 z-10">
			{/* <Banner /> */}
			<Navigator />
		</header>
	);
};
