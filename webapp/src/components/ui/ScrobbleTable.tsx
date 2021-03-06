import React, { useEffect, useState } from "react";

import MaterialTable from "material-table";
import { Paper } from "@material-ui/core";

import { buildLink, getEasterEgg } from "../utils";

import { useScrobbleStore } from "../../stores";
import { usePersistantStore } from "../../stores";
import shallow from "zustand/shallow";
import { Scrobble } from "../lastfm";

let emptyToggle: boolean = false;
let singleToggle: boolean = false;
let symbolToggle: boolean = false;

// extend these regExes and consider using specific ones for each columm,
// as e.g. a colon makes often perfect sense in album names
let regex: RegExp = new RegExp(`[;:[\\\\/]`);

const ScrobbleTable: React.FC = () => {
	const [isLoading, storeScrobbles] = useScrobbleStore(
		(state) => [state.isFetching, state.scrobbles],
		shallow
	);

	let [scrobbles, setScrobbles] = useState<Scrobble[]>([]);
	const userName = usePersistantStore((state) => state.userName);

	useEffect(() => {
		setScrobbles(storeScrobbles);
	}, [storeScrobbles]);

	function filterEmptyAlbums(scrobblesParam: Scrobble[]) {
		let filteredScrobbles = scrobblesParam.filter(function (o) {
			return o.album === "";
		});

		if (emptyToggle) {
			setScrobbles(storeScrobbles);
			emptyToggle = false;
		} else {
			setScrobbles(filteredScrobbles);
			emptyToggle = true;
		}
	}

	function filterSingles(scrobblesParam: Scrobble[]) {
		let filteredScrobbles = scrobblesParam.filter(function (o) {
			return o.album === o.song;
		});

		if (singleToggle) {
			setScrobbles(storeScrobbles);
			singleToggle = false;
		} else {
			setScrobbles(filteredScrobbles);
			singleToggle = true;
		}
	}

	function filterSymbols(scrobblesParam: Scrobble[]) {
		let filteredScrobbles = scrobblesParam.filter(function (o) {
			return regex.test(o.artist) || regex.test(o.song) || regex.test(o.album);
		});

		if (symbolToggle) {
			setScrobbles(storeScrobbles);
			symbolToggle = false;
		} else {
			setScrobbles(filteredScrobbles);
			symbolToggle = true;
		}
	}

	return (
		<MaterialTable
			columns={[
				{
					title: "",
					field: "image",
					cellStyle: { width: "2%" },
					render: (rowData) => (
						<img
							src={rowData.image}
							onError={(img) => setFallbackImage(img)}
							alt=""
							height="34px"
						/>
					),
				},
				{
					title: "Artist",
					field: "artist",
					cellStyle: { width: "20%" },
					render: (rowData) => (
						<a
							href={buildLink(String(userName), rowData.artist)}
							target="_blank"
							rel="noreferrer"
							title={getEasterEgg(rowData.artist)}
						>
							{rowData.artist}
						</a>
					),
				},
				{
					title: "Track",
					field: "song",
					cellStyle: { width: "45%" },
					render: (rowData) => (
						<a
							href={buildLink(
								String(userName),
								rowData.artist,
								"",
								rowData.song
							)}
							target="_blank"
							rel="noreferrer"
							title={getEasterEgg(rowData.song)}
						>
							{rowData.song}
						</a>
					),
				},
				{
					title: "Album",
					field: "album",
					cellStyle: { width: "33%" },
					render: (rowData) => (
						<a
							href={buildLink(String(userName), rowData.artist, rowData.album)}
							target="_blank"
							rel="noreferrer"
							title={getEasterEgg(rowData.album)}
						>
							{rowData.album}
						</a>
					),
				},
				{
					title: "Timestamp",
					field: "timestamp",
					type: "datetime",
					render: (rowData) => rowData.date,
				},
			]}
			data={scrobbles}
			title=""
			options={{
				pageSizeOptions: [15, 30, 70],
				pageSize: 15,
				headerStyle: { minHeight: "44px", zIndex: 0 },
				searchFieldAlignment: "left",
				toolbarButtonAlignment: "left",
				padding: "dense",
				rowStyle: { minHeight: "47px !important" },
			}}
			actions={[
				{
					icon: "album",
					tooltip: "Show empty album scrobbles",
					position: "toolbar",
					iconProps: { color: emptyToggle ? "secondary" : "default" },
					onClick: () => {
						filterEmptyAlbums(storeScrobbles);
					},
				},
				{
					icon: "library_music",
					tooltip: "Show scrobbles where album name and track are the same",
					position: "toolbar",
					iconProps: { color: singleToggle ? "secondary" : "default" },
					onClick: () => {
						filterSingles(storeScrobbles);
					},
				},
				{
					icon: "emoji_symbols",
					tooltip: "Show scrobbles containing odd symbols",
					position: "toolbar",
					iconProps: { color: symbolToggle ? "secondary" : "default" },
					onClick: () => {
						filterSymbols(storeScrobbles);
					},
				},
			]}
			components={{ Container: (props) => <Paper {...props} elevation={0} /> }}
			isLoading={isLoading && storeScrobbles.length === 0}
		/>
	);
};

// #region Helper Functions

function setFallbackImage(image: any) {
	image.src = "../img/no-cover.png";
}

// #endregion

export default ScrobbleTable;
