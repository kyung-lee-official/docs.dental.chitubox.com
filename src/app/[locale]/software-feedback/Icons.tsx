export function XCircle({ size }: { size: number }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 15 15"
			fill="none"
		>
			<g
				className="stroke-red-500"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				clipPath="url(#a)"
			>
				<path d="M7.5 13.945a6.444 6.444 0 1 0 0-12.89 6.444 6.444 0 0 0 0 12.89M5.056 5.056l4.888 4.889M9.944 5.056 5.056 9.945"></path>
			</g>
			<defs>
				<clipPath id="a">
					<path fill="#fff" d="M0 0h15v15H0z"></path>
				</clipPath>
			</defs>
		</svg>
	);
}

export function XCircleSolid({ size }: { size: number }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			fill="none"
		>
			<g clipPath="url(#a)">
				<path
					fill="currentColor"
					d="M7.5.389C3.58.389.389 3.579.389 7.5s3.19 7.111 7.111 7.111 7.111-3.19 7.111-7.111S11.421.389 7.5.389m2.916 9.084a.667.667 0 0 1-.943.943L7.5 8.443l-1.973 1.973a.665.665 0 0 1-.943 0 .667.667 0 0 1 0-.943L6.558 7.5 4.584 5.527a.667.667 0 1 1 .944-.943L7.5 6.557l1.973-1.973a.667.667 0 0 1 .943.943L8.444 7.5l1.973 1.973z"
				></path>
			</g>
			<defs>
				<clipPath id="a">
					<path fill="#fff" d="M0 0h15v15H0z"></path>
				</clipPath>
			</defs>
		</svg>
	);
}

export const LoadingSpinner = ({ size, fill }: any) => {
	return (
		<svg
			className="animate-spin"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
		>
			<circle
				className="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="4"
			></circle>
			<path
				className="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			></path>
		</svg>
	);
};

export function CheckCircle({ size }: { size: number }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 15 15"
			fill="none"
		>
			<path
				className="stroke-green-500"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="M7.5 13.945a6.444 6.444 0 1 0 0-12.89 6.444 6.444 0 0 0 0 12.89"
			></path>
			<path
				className="stroke-green-500"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="m4.611 7.722 2 2.223 3.778-4.89"
			></path>
		</svg>
	);
}
