import { writable } from "svelte/store";

export const annotationResults = writable([]);
export const isProcessing = writable(false);
