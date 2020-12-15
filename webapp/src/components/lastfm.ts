import LastFMTyped from "lastfm-typed";
import { getRecentTracks } from "lastfm-typed/dist/interfaces/userInterface";

export interface Scrobble {
  song: string;
  album: string;
  artist: string;
  url: string;
}

const fetchScrobbles = async (
  userName: string,
  setProgress: Function,
  setScrobbles: Function
) => {
  const API_KEY = "eba566857b4d6eb3a90d8a8da372c2dc";

  const lastfm = new LastFMTyped(API_KEY, undefined, "beautifier.fm");
  const LIMIT = 1000;

  let totalPages: number = 0;
  const allScrobbles: Array<Scrobble> = [];
  const unfetchedPages: Array<number> = [1];

  console.log("userName");
  console.log(userName);

  setProgress(0);

  const handleProgress = (page: number) => {
    unfetchedPages.splice(unfetchedPages.indexOf(page), 1);
    if (totalPages)
      setProgress(((totalPages - unfetchedPages.length) / totalPages) * 100);
  };

  const fetchPage = (page: number): Promise<getRecentTracks> => {
    return new Promise(async (resolve, reject) => {
      let response: getRecentTracks;
      try {
        try {
          response = await lastfm.user.getRecentTracks(userName, {
            limit: LIMIT,
            page: page,
          });

          handleProgress(page);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      } catch (e) {
        console.log(e.response);
        reject(e.response.error);
      }
    });
  };

  await fetchPage(1).then((result) => {
    let { "@attr": attr, track: tracks } = result;
    allScrobbles.push(
      ...tracks.map((t) => {
        return {
          song: t.name,
          album: t.album.name,
          artist: t.artist.name,
          url: t.url,
        };
      })
    );
    totalPages = Number(attr.totalPages);
    console.log(totalPages);
    unfetchedPages.push(...Array.from({ length: totalPages }, (v, k) => k + 2));

    handleProgress(1);

    Promise.allSettled(unfetchedPages.map((i) => fetchPage(i))).then(
      (values) => {
        //all
        console.log(unfetchedPages);
        //console.log(values);

        console.log(
          values
            .filter((v) => v.status === "fulfilled")
            .map((r: any) => r.value.track)
            .flat()
        );

        allScrobbles.push(
          ...values
            .filter((v) => v.status === "fulfilled")
            .map((r: any) => {
              return {
                song: r.value.track.name,
                album:
                  r.value.track.album !== undefined
                    ? r.value.track.album.name
                    : "wtf",
                artist:
                  r.value.track.artist !== undefined
                    ? r.value.track.artist.name
                    : "is this",
                url: r.value.track.url,
              };
            })
            .flat()
        );

        setScrobbles(allScrobbles);
        setProgress(100);
        // allScrobbles.push(
        //   ...[].concat(...values.map((response) => response.track))
        // );
        // console.log("allScrobbles");
        // console.log(allScrobbles);
      }
    );
  });
};

export default fetchScrobbles;
