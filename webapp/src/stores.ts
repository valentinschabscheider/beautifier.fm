import { addWeeks } from "date-fns";
import create from "zustand";
import { persist } from "zustand/middleware";

import { Scrobble } from "./components/lastfm";
import { DateRange } from "./components/ui/Controls";

// function reviver(key: string, value: any) {
// 	if (typeof value === "string" && Date.parse(value)) {
// 		return new Date(value);
// 	}

// 	return value;
// }

type PersistantStoreState = {
	userName: string;
	setUserName: (userName: string) => void;
};

export const usePersistantStore = create<PersistantStoreState>(
	persist(
		(set) => ({
			userName: "",
			setUserName: (userName) => set({ userName }),
		}),
		{
			name: "persistant-storage", // unique name
			// deserialize: (string) => {
			// 	return JSON.parse(string, reviver);
			// },
		}
	)
);

type RuntimeStoreState = {
	selectedDateRange: DateRange;
	setSelectedDateRange: (dateRange: DateRange) => void;
	initialized: boolean;
	initialize: () => void;
};

export const useRuntimeStore = create<RuntimeStoreState>((set, get) => ({
	selectedDateRange: new DateRange(addWeeks(new Date(), -1), new Date()),
	setSelectedDateRange: (selectedDateRange) => set({ selectedDateRange }),
	initialized: false,
	initialize: () => set({ initialized: true }),
}));

export type ScrobbleStoreState = {
	isFetching: boolean;
	progress: number | null;
	setProgress: (progress: number) => void;
	scrobbles: Array<Scrobble>;
	addScrobbles: (scrobbles: Array<Scrobble>) => void;
	deleteScrobbles: (range?: DateRange) => void;
	fetchedDateRanges: Array<DateRange>;
	addFetchedDateRange: (dateRange: DateRange) => void;
	reset: () => void;
};

export const useScrobbleStore = create<ScrobbleStoreState>((set, get) => ({
	isFetching: false,
	progress: null,
	setProgress: (progress) =>
		set({ progress, isFetching: progress >= 0 && progress < 100 }),
	scrobbles: [],
	addScrobbles: (scrobbles) =>
		set(() => ({ scrobbles: [...get().scrobbles, ...scrobbles] })),
	deleteScrobbles: (range?) => set({ scrobbles: [] }),
	fetchedDateRanges: [],
	addFetchedDateRange: (dateRange) => set({ fetchedDateRanges: [dateRange] }),
	reset: () =>
		set({
			scrobbles: [],
			progress: null,
			isFetching: false,
			fetchedDateRanges: [],
		}),
}));

const initialScrobbleStoreState = useScrobbleStore.getState();

export const resetScrobbleStore = () => {
	useScrobbleStore.setState(initialScrobbleStoreState, true);
};
