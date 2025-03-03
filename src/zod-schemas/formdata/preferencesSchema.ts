// /src/zod-schemas/formdata/preferencesSchema.ts
import { z } from "zod";
import {
  Genre,
  PreferredDevice,
  MoodBasedChoices,
} from "@/constants/musicEnums";

// export type Genre = Record<string, boolean>;

export const preferencesSchema = z.object({
  genre: z.array(z.nativeEnum(Genre)).min(1, "Select at least one genre"),
  preferredDevice: z
    .array(z.nativeEnum(PreferredDevice))
    .min(1, "Select at least one device"),
  // moodBasedChoices: z
  //   .array(z.nativeEnum(MoodBasedChoices))
  //   .min(1, "Select at least one mood"),
});
