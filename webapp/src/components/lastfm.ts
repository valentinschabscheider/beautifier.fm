import LastFMTyped from "lastfm-typed";
import { getRecentTracks } from "lastfm-typed/dist/interfaces/userInterface";
import { DateRange } from "./ui/Controls";
import { dateAsUnix } from "./utils";

type RecentTrack = getRecentTracks["track"][0];

export interface Scrobble {
	song: string;
	album: string | undefined;
	artist: string;
	url: string;
	image: string | undefined;
}
interface ProcessedResponse {
	attr: getRecentTracks["@attr"];
	scrobbles: Array<Scrobble>;
}

const fetchScrobbles = async (
	userName: string,
	dateRange: DateRange,
	setProgress: Function,
	addScrobbles: Function,
	deleteScrobbles: Function,
	finishededFetching: Function
) => {
	const lastfm = new LastFMTyped(
		String(process.env.REACT_APP_LASTFM_API_KEY),
		undefined,
		"beautifier.fm",
		true
	);

	let totalPages: number = 0;
	const unfetchedPages: Array<number> = [1];

	const handleProgress = (page: number) => {
		unfetchedPages.splice(unfetchedPages.indexOf(page), 1);
		if (totalPages)
			setProgress(
				Math.round(((totalPages - unfetchedPages.length) / totalPages) * 100)
			);
	};

	const mapResponseToScrobbles = (
		tracks: Array<RecentTrack>
	): Array<Scrobble> => {
		return tracks.map((t) => {
			return {
				song: t.name,
				album: t.album !== undefined ? t.album.name : undefined,
				artist: t.artist !== undefined ? t.artist.name : "wtf is this",
				url: t.url,
				image: t.image !== undefined ? t.image[0]["#text"] : undefined,
			};
		});
	};

	const fetchPage = (page: number): Promise<ProcessedResponse> => {
		return new Promise(async (resolve, reject) => {
			try {
				let response: getRecentTracks = await lastfm.user.getRecentTracks(
					userName,
					{
						limit: Number(process.env.REACT_APP_LASTFM_API_PAGE_SIZE),
						page: page,
						from: dateAsUnix(dateRange.from),
						to: dateAsUnix(dateRange.to),
					}
				);

				resolve({
					attr: response["@attr"],
					scrobbles: mapResponseToScrobbles(response.track),
				});

				handleProgress(page);
			} catch (error) {
				reject(error);
			}
		});
	};

	fetchPage(1).then((result) => {
		let { attr, scrobbles } = result;
		deleteScrobbles();
		addScrobbles(scrobbles);
		totalPages = Number(attr.totalPages);
		unfetchedPages.push(...Array.from({ length: totalPages }, (v, k) => k + 2));

		handleProgress(1);

		//loop over unfetchedPages with max
		Promise.allSettled(unfetchedPages.map((i) => fetchPage(i))).then(
			(results) => {
				results.forEach((result) => {
					if (result.status === "rejected") {
						console.log(result);
					}
					if (result.status === "fulfilled" && result.value) {
						addScrobbles(result.value.scrobbles);
					}
				});
				finishededFetching();
			}
		);
	});
};

export default fetchScrobbles;
