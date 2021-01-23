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
	userName: string,
	artist: string,
	album: string = "",
	track: string = ""
) {
	let url: string = `https://www.last.fm/user/${userName}/library/music/`;

	artist = replaceUrlSpecialChars(artist);
	album = replaceUrlSpecialChars(album);
	track = replaceUrlSpecialChars(track);

	if (artist && !album && !track) {
		return url + artist;
	}

	if (artist && album && !track) {
		return url + artist + "/" + album;
	}

	if (artist && track && !album) {
		return url + artist + "/_/" + track;
	}
}

function replaceUrlSpecialChars(url: string) {
	url = url.replaceAll("/", "%2F");
	url = url.replaceAll(" ", "+");
	return url;
}

// first rudimentary version
// consider creating a big dictionary/key-value object to retrieve
// values from based on the input
export function getEasterEgg(input: string) {
	switch (input.toLowerCase()) {
		case "weezer":
			return "OO WEE OO";
		case "oasis":
			return "so anyway, here's Wonderwall...";
		case "eminem":
			return "will the real slim shady please stand up?";
		case "rasputin":
			return "RA RA RASPUTIN";
	}
}
