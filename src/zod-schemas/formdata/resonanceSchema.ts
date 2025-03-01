// /src/zod-schemas/formdata/resonanceSchema.ts
import { Frequency } from "@/constants/musicEnums";
import { z } from "zod";

export const resonanceSchema = z.object({
  favoriteArtists: z
    .array(z.string())
    .min(1, "At least one artist is required"),
  favoriteAlbums: z.array(z.string()).min(1, "At least one album is required"),
  discoverNewMusic: z.boolean(),
  frequency: z.nativeEnum(Frequency),
});
