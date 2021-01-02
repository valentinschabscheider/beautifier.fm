import React from "react";
import useStore from "../../store";
import { CSSTransition } from "react-transition-group";
import { duration as animationDuration } from "../../models/Animation";

import "./ProgressBar.scss";

interface Props {
	value: number | null;
	text?: string | null;
	css?: object;
}

const ProgressBar: React.FC<Props> = ({ value, text, css }) => {
	return (
		<div className="progress-container" {...(css && { style: css })}>
			<div
				id="progress-bar"
				className="progress-bar"
				style={{ width: `${value}%` }}
			>
				<span style={{ visibility: text === null ? "hidden" : "visible" }}>
					{text || `${value}%`}
				</span>
			</div>
		</div>
	);
};

const FetchingProgressBar: React.FC = () => {
	const progress = useStore((state) => state.progress);
	return (
		<CSSTransition
			in={progress != null && progress >= 0 && progress < 100}
			unmountOnExit
			timeout={animationDuration}
			classNames="progress-container"
		>
			<ProgressBar value={progress} />
		</CSSTransition>
	);
};

export default FetchingProgressBar;
