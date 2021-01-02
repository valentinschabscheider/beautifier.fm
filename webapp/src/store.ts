import create from "zustand";

import { Scrobble } from "./components/lastfm";

type State = {
	progress: number | null;
	isFetching: boolean;
	startedFetching: () => void;
	finishededFetching: () => void;
	setProgress: (progress: number) => void;
	scrobbles: Array<Scrobble>;
	addScrobbles: (scrobbles: Array<Scrobble>) => void;
	deleteScrobbles: (/*fromDate, toDate*/) => void;
};

const useStore = create<State>((set) => ({
	progress: null,
	isFetching: false,
	startedFetching: () => set({ isFetching: true, progress: 0 }),
	finishededFetching: () => set({ isFetching: false, progress: 100 }),
	setProgress: (progress) => set({ progress }),
	scrobbles: [],
	addScrobbles: (scrobbles) =>
		set((state) => ({ scrobbles: [...state.scrobbles, ...scrobbles] })),
	deleteScrobbles: (/*fromDate, toDate*/) => set({ scrobbles: [] }),
}));

export default useStore;
