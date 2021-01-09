import { useState, useEffect } from "react";

export const useWindowDimensions: Function = () => {
	const getWindowDimensions: Function = () => {
		const { innerWidth: width, innerHeight: height } = window;
		return {
			width,
			height,
		};
	};

	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
};

export const dateAsUnix: Function = (date: Date): number => {
	return Math.floor(date.getTime() / 1000);
};

export function buildLink(
	artist: string,
	album: string = "",
	track: string = ""
) {
	const libraryUrl: string = "https://www.last.fm/user/{0}/library/music/";

	let userName: string = String(localStorage.getItem("userName"));
	let baseUrl: string = libraryUrl.replace("{0}", userName);

	if (artist && !album && !track) {
		return baseUrl + artist;
	}

	if (artist && album && !track) {
		return baseUrl + artist + "/" + album;
	}

	if (artist && track && !album) {
		return baseUrl + artist + "/_/" + track;
	}
}
