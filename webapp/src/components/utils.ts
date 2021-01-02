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
