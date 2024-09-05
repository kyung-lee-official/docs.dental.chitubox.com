"use client";

// import { getBannerInfo } from "helpers/api";
// import React, { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import isBetween from "dayjs/plugin/isBetween";
// import axios from "axios";
// import { useQuery } from "react-query";
// import { useLanguageStore } from "stores/language";
// dayjs.extend(isBetween);

// function getQualifiedActivities(activities: any[]): any {
// 	const qualifiedActivities = activities.filter((activity) => {
// 		if (activity.isShow === "false") {
// 			return false;
// 		} else {
// 			const startDate = dayjs(activity.startTime);
// 			const endDate = dayjs(activity.endTime);
// 			const now = dayjs();
// 			if (now.isBetween(startDate, endDate)) {
// 				if (activity.noticeImg !== "") {
// 					return true;
// 				} else {
// 					return false;
// 				}
// 			} else {
// 				return false;
// 			}
// 		}
// 	});
// 	return qualifiedActivities;
// }

// function blockCountdownActivities(activities: any) {
// 	return activities.filter((activity: any) => {
// 		return activity.isShowCountDown === "false";
// 	});
// }

// export const Banner: React.FC<any> = (props: any) => {
// 	const { setShowBanner } = props;
// 	const { language } = useLanguageStore();
// 	const [isImageAva, setIsImageAva] = useState(false);

// 	let bannerQuery: any;
// 	let activities;
// 	let currentActivity;

// 	bannerQuery = useQuery("bannerQuery", () => getBannerInfo("en"), {
// 		enabled: language === "en_US",
// 	});
// 	bannerQuery = useQuery("bannerQuery", () => getBannerInfo("zh-Hans"), {
// 		enabled: language === "zh_CN",
// 	});

// 	useEffect(() => {
// 		if (bannerQuery.status === "success") {
// 			if (setShowBanner) {
// 				setShowBanner(true);
// 			}
// 		} else {
// 			if (setShowBanner) {
// 				setShowBanner(false);
// 			}
// 		}
// 	}, [bannerQuery.status]);

// 	if (bannerQuery?.isLoading) {
// 		return null;
// 	}

// 	if (bannerQuery?.error) {
// 		console.error("Failed to fetch the banner image");
// 		console.error(bannerQuery.error);
// 		return null;
// 	}

// 	if (bannerQuery?.data?.dataValue) {
// 		activities = JSON.parse(bannerQuery.data.dataValue);
// 		if (activities) {
// 			const qualifiedActivities = blockCountdownActivities(
// 				getQualifiedActivities(activities)
// 			);
// 			if (qualifiedActivities.length > 0) {
// 				currentActivity = qualifiedActivities[0];
// 				axios
// 					.get(currentActivity.noticeImg)
// 					.then(() => {
// 						setIsImageAva(true);
// 					})
// 					.catch((error) => {
// 						console.error("Failed to fetch the banner image");
// 					});
// 				if (isImageAva) {
// 					return (
// 						<a href={currentActivity.noticeLink}>
// 							<div className="w-full max-h-[88px] overflow-hidden">
// 								<picture>
// 									<img
// 										className="w-full align-middle"
// 										src={currentActivity.noticeImg}
// 										alt="banner"
// 									/>
// 								</picture>
// 							</div>
// 						</a>
// 					);
// 				} else {
// 					return null;
// 				}
// 			} else {
// 				return null;
// 			}
// 		}
// 	}
// 	return null;
// };

import { useEffect, useState } from "react";

export const Banner = () => {
	const [bannerHeight, setBannerHeight] = useState(64);

	useEffect(() => {
		setBannerHeight(Math.random() * 200);
	}, []);

	return (
		<div
			className="top-0 bg-red-400"
			style={{ height: `${bannerHeight}px` }}
		>
			Banner
		</div>
	);
};
