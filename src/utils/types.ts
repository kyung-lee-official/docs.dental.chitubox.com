export const locales = ["en-US", "zh-CN"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(locale: string): locale is Locale {
	return locale === "en-US" || locale === "zh-CN";
}

/**
 * book allows versioning and shows sidebar,
 * blog does not allow versioning and does not show sidebar
 */
export type FieldType = "book" | "blog";

export type SectionContext = {
	pageId: string;
	label: string;
	url: string;
	toc: any[];
	metadata: any;
	pages: PageContext[];
};
export type SectionContextWithoutToc = Omit<SectionContext, "toc">;

export type PageContext = {
	pageId: string;
	label: string;
	url: string;
	toc: any[];
	metadata: any;
};
export type PageContextWithoutToc = Omit<PageContext, "toc">;

export type ItemContext = SectionContext | PageContext;
export type ItemWithoutToc = SectionContextWithoutToc | PageContextWithoutToc;

export type CategoryUrlMap = {
	catWithoutToc: ItemWithoutToc[];
	urls: string[];
};

export type VersionedContext = {
	versionCode: string | null;
	isLatest: boolean;
	category: ItemContext[];
};

export type Field = {
	fieldId: string;
	fieldName: string;
	homeUrl: string;
	isVersioned: boolean;
	type: FieldType;
	versions: VersionedContext[];
};

export type LocaleContext = {
	locale: Locale;
	localizedFields: Field[];
};

export type DocsContext = LocaleContext[];

type VersionedFlattenPage = {
	locale: Locale;
	fieldId: string;
	fieldName: string;
	homeUrl: string;
	isVersioned: true;
	type: FieldType;
	versionCode: string | null;
};

type NonVersionedFlattenPage = {
	locale: Locale;
	fieldId: string;
	fieldName: string;
	homeUrl: string;
	isVersioned: false;
	type: FieldType;
	versionCode: null;
};

export type FlattenPage = (VersionedFlattenPage | NonVersionedFlattenPage) &
	PageContext;

export type FieldConfig = {
	fieldName: string;
	homeUrl: string;
	isVersioned: boolean;
	type: FieldType;
	versions: VersionedContext[];
};

export const enum MediaQuery {
	sm = "(min-width: 640px)",
	md = "(min-width: 768px)",
	lg = "(min-width: 1024px)",
	xl = "(min-width: 1280px)",
	"2xl" = "(min-width: 1536px)",
}
