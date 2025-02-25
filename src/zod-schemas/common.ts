export const artistTypeEnumArray = [
  "person",
  "group",
  "orchestra",
  "choir",
  "character",
  "other",
] as const;

export type ArtistTypeEnum = (typeof artistTypeEnumArray)[number];
