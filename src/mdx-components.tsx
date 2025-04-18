import type { MDXComponents } from "mdx/types";
import "./app/globals.css";
import Link from "next/link";
import { LinkIcon } from "./components/icons/Icons";
import { ResponsiveTable } from "./components/responsiveTable/ResponsiveTable";
import { ImageContainer } from "./components/imageContainer/ImageContainer";
import { Admonition } from "./components/admonition/Admonition";
import { BlogImageContainer } from "./components/imageContainer/BlogImageContainer";
import { ImageComparison } from "./components/imageComparison/ImageComparison";

const HeadingAnchor = (props: any) => {
	const { ...rest } = props;
	return (
		<Link
			{...rest}
			className="flex justify-center items-center no-underline opacity-20 hover:opacity-60 duration-200"
		>
			<LinkIcon size={20} />
		</Link>
	);
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
	const h1 = (props: any) => (
		<h1
			{...props}
			className="mb-14 mt-25
			text-[56px] font-bold text-gray-950 dark:text-[#E2E8F0]"
		/>
	);

	const h2 = (props: any) => {
		const { id, children } = props;
		return (
			<h2
				id={id}
				className={`flex justify-start items-center gap-4 mt-16 mb-8
						text-[28px] font-bold
						text-gray-950 dark:text-[#E2E8F0]
						scroll-mt-20`}
			>
				<Link href={`#${id}`}>{children[1]}</Link>
			</h2>
		);
	};

	const h3 = (props: any) => {
		const { id, children } = props;
		return (
			<h3
				id={id}
				className={`flex justify-start items-center gap-4 my-6
                text-[22px] dark:text-[#E2E8F0] font-bold
				scroll-mt-20`}
			>
				<Link href={`#${id}`}>{children[1]}</Link>
			</h3>
		);
	};

	const h4 = ({ children }: any) => {
		return (
			<h4
				id={children[0].props.href.slice(1)}
				className={`flex justify-start items-center gap-4 my-6
                font-bold text-[18px] dark:text-[#E2E8F0]
				scroll-mt-20`}
			>
				{children[1]}
				<HeadingAnchor href={children[0].props.href}>#</HeadingAnchor>
			</h4>
		);
	};

	const h5 = ({ children }: any) => {
		return (
			<h5
				id={children[0].props.href.slice(1)}
				className={`flex justify-start items-center gap-4 my-6
                font-bold text-[16px] dark:text-[#E2E8F0]
				scroll-mt-20`}
			>
				{children[1]}
				<HeadingAnchor href={children[0].props.href}>#</HeadingAnchor>
			</h5>
		);
	};

	const h6 = ({ children }: any) => {
		return (
			<h6
				id={children[0].props.href.slice(1)}
				className={`flex justify-start items-center gap-4 my-4
                font-bold text-[14px] dark:text-[#E2E8F0]
				scroll-mt-20`}
			>
				{children[1]}
				<HeadingAnchor href={children[0].props.href}>#</HeadingAnchor>
			</h6>
		);
	};

	const p = (props: any) => (
		<p
			{...props}
			className="mb-4
					text-[16px] leading-6 text-[#4B5563] dark:text-[#94A3B8] "
		/>
	);

	const a = (props: any) => (
		<a
			{...props}
			className="my-4 underline 
			text-[14px]
			text-sky-500
			"
		/>
	);

	const ul = ({ children }: any) => {
		return (
			<ul
				className="list-outside list-disc my-3 pl-4
                [&_>_li_>_ul]:list-outside
                [&_>_li_>_ul]:pl-4 [&_>_li_>_ul]:my-2
                [&_>_li_>_ul]:list-[circle]"
			>
				{children}
			</ul>
		);
	};

	const ol = ({ children }: any) => {
		return (
			<ol
				className="list-outside list-decimal my-3 pl-4
                [&_>_li]:my-2"
			>
				{children}
			</ol>
		);
	};

	const pre = (props: any) => {
		const { children } = props;
		return (
			<pre
				className="relative p-4 my-2
				text-gray-100
				bg-gray-900 rounded-lg overflow-x-auto"
				{...props}
			>
				{children}
			</pre>
		);
	};

	const code = ({ children, className, ...props }: any) => {
		const isInline = !className?.includes("language-");
		if (isInline) {
			return (
				<code
					className="px-1.5 py-0.5 my-1
					text-gray-200 text-sm
					bg-gray-800
					rounded-md"
					{...props}
				>
					{children}
				</code>
			);
		}
		return (
			<code className={className} {...props}>
				{children}
			</code>
		);
	};

	return {
		h1: h1,
		h2: h2,
		h3: h3,
		h4: h4,
		h5: h5,
		h6: h6,
		p: p,
		a: a,
		ul: ul,
		ol: ol,
		table: ResponsiveTable,
		pre: pre,
		code: code,

		Link: (props) => {
			const { href, children } = props;
			return (
				<Link href={href} className="text-sky-500 underline">
					{children}
				</Link>
			);
		},

		Admonition: Admonition,
		ImageContainer: ImageContainer,
		ImageComparison: ImageComparison,
		BlogImageContainer: BlogImageContainer,

		...components,
	};
}
