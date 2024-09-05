import createMiddleware from "next-intl/middleware";
import { locales } from "./utils/types";

export default createMiddleware({
	/* A list of all locales that are supported */
	locales: locales,

	/* Used when no locale matches */
	defaultLocale: "en-US",
	localePrefix: "always",
});

export const config = {
	/* Match only internationalized pathnames */
	matcher: ["/", "/(en-US|zh-CN)/:path*"],
};
