import { genreOptions } from "@/data/dummyGenre";

export function labelsToIds(labels: string[]): string[] {
  return labels
    .map((label) => genreOptions.find((g) => g.label === label)?.id)
    .filter((id): id is string => Boolean(id));
}

export function idsToLabels(ids: string[]): string[] {
  return ids
    .map((id) => genreOptions.find((g) => g.id === id)?.label)
    .filter((label): label is string => Boolean(label));
}