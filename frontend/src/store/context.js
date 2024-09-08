import { create } from "zustand";

export const useContextStore = create((set) => ({
	contentType: "movie",
	setContentType: (type) => set({ contentType: type }),
}));