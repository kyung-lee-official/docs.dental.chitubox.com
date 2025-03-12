import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const DynamicLegal = dynamic(() => import("./Legal"), {
	ssr: false,
});

function Footnote() {
	const t = useTranslations();

	return (
		<div
			className="flex justify-between flex-wrap-reverse gap-2
				text-sm"
		>
			<DynamicLegal />
			<div className="flex flex-col justify-center w-[393px] gap-2">
				<div className="text-white font-bold">
					{t("footer.payment.weAccept.title")}
				</div>
				<div className="flex gap-2">
					<img src="/en/academy/images/footer/AMEX.svg" alt="" />
					<img src="/en/academy/images/footer/Visa.svg" alt="" />
					<img src="/en/academy/images/footer/Maestro.svg" alt="" />
					<img
						src="/en/academy/images/footer/Mastercard.svg"
						alt=""
					/>
					<img src="/en/academy/images/footer/unionpay.svg" alt="" />
					<img src="/en/academy/images/footer/paypal.svg" alt="" />
				</div>
			</div>
		</div>
	);
}

export default Footnote;
