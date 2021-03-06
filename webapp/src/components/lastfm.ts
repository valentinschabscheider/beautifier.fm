import LastFMTyped from "lastfm-typed";
import { getRecentTracks } from "lastfm-typed/dist/interfaces/userInterface";
import { DateRange } from "./ui/Controls";
import { dateAsUnix } from "./utils";

type RecentTrack = getRecentTracks["tracks"][0];

export interface Scrobble {
	song: string;
	album: string;
	artist: string;
	url: string;
	image: string | undefined;
	date: string | undefined;
}
interface ProcessedResponse {
	attr: getRecentTracks;
}

const fetchScrobbles = async (
	userName: string,
	dateRange: DateRange,
	setProgress: Function,
	addScrobbles: Function,
	deleteScrobbles: Function
) => {
	const INITIAL_PROGRESS = 5;

	setProgress(0);
	deleteScrobbles();

	const lastfm = new LastFMTyped(
		String(process.env.REACT_APP_LASTFM_API_KEY),
		undefined
	);

	let totalPages: number = 0;
	const unfetchedPages: Array<number> = [1];

	const handleProgress = (page: number) => {
		unfetchedPages.splice(unfetchedPages.indexOf(page), 1);
		if (totalPages)
			//calculate progress with minimum INITIAL_PROGRESS
			setProgress(
				Math.round(
					(1 - INITIAL_PROGRESS / 100) *
						(((totalPages - unfetchedPages.length) / totalPages) * 100) +
						INITIAL_PROGRESS
				)
			);
	};

	const mapResponseToScrobbles = (
		tracks: Array<RecentTrack>
	): Array<Scrobble> => {
		return tracks.map((t) => {
			return {
				song: t.name,
				album: t.album.name,
				artist: t.artist.name,
				url: t.url,
				image: t.image[0].url,
				date: t.date?.imf,
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
						from:
							dateRange.from !== undefined
								? dateAsUnix(dateRange.from)
								: undefined,
						to:
							dateRange.to !== undefined ? dateAsUnix(dateRange.to) : undefined,
					}
				);

				addScrobbles(mapResponseToScrobbles(response.tracks));

				resolve({
					attr: response,
				});

				handleProgress(page);
			} catch (error) {
				reject(error);
			}
		});
	};

	setTimeout(function () {
		//start with INITIAL_PROGRESS progress
		setProgress(INITIAL_PROGRESS);
	}, 500);

	fetchPage(1).then((result) => {
		let { attr } = result;
		totalPages = Number(attr.meta.totalPages);
		unfetchedPages.push(...Array.from({ length: totalPages }, (v, k) => k + 2));

		handleProgress(1);

		//loop over unfetchedPages with max
		Promise.allSettled(unfetchedPages.map((i) => fetchPage(i))).then(
			(results) => {
				results.forEach((result) => {
					if (result.status === "rejected") {
						console.log(result);
					}
					// if (result.status === "fulfilled" && result.value) {
					// 	addScrobbles(result.value.scrobbles);
					// }
				});
				setProgress(100);
			}
		);
	});
};

export default fetchScrobbles;
