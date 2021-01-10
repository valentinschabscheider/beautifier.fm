import React from "react";

import MaterialTable from "material-table";
import { Paper } from "@material-ui/core";

import { buildLink } from "../utils";

import { useScrobbleStore } from "../../stores";
import { usePersistantStore } from "../../stores";
import shallow from "zustand/shallow";

const ScrobbleTable: React.FC = () => {
	const [isLoading, scrobbles] = useScrobbleStore(
		(state) => [state.isFetching, state.scrobbles],
		shallow
	);

	const userName = usePersistantStore((state) => state.userName);

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
						<a href={buildLink(String(userName), rowData.artist)}>
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
						>
							{rowData.album}
						</a>
					),
				},
				{
					title: "Timestamp",
					field: "timestamp",
					type: "datetime",
					render: (rowData) => "01.01.2000",
				},
			]}
			data={scrobbles}
			title=""
			options={{
				pageSizeOptions: [15, 30, 70],
				pageSize: 15,
				headerStyle: { minHeight: "44px", zIndex: 0 },
				searchFieldAlignment: "left",
				padding: "dense",
				rowStyle: { minHeight: "47px !important" },
			}}
			components={{ Container: (props) => <Paper {...props} elevation={0} /> }}
			isLoading={isLoading && scrobbles.length === 0}
		/>
	);
};

// setFallbackImage(this)
function setFallbackImage(image: any) {
	image.src = "../img/no-cover.png";
}

export default ScrobbleTable;
