import React, { createRef, CSSProperties, useEffect, useRef } from "react";

import { useWindowDimensions } from "../utils";
import * as Measures from "../../models/Measures";

import "./FullscreenContainer.scss";

interface FullscreenContainerProps {
	children: any;
	className?: string;
	style?: CSSProperties;
}

export default (({ children, className, style }) => {
	const { height } = useWindowDimensions();

	const refHtml = useRef<HTMLElement>(document.documentElement);

	useEffect(() => {
		if (height > Measures.appMinHeight)
			refHtml.current?.classList.add("scrollbar-hidden");
		else refHtml.current?.classList.remove("scrollbar-hidden");
	});

	return (
		<div
			className={`FullscreenContainer ${className}`}
			style={{ height: height, ...style }}
		>
			{children}
		</div>
	);
}) as React.FC<FullscreenContainerProps>;
