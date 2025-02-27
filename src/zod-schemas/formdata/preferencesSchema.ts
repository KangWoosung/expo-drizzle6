// /src/zod-schemas/formdata/preferencesSchema.ts
import { z } from "zod";
import {
  Genre,
  PreferredDevice,
  MoodBasedChoices,
  Frequency,
  Instruments,
  SkillLevel,
} from "@/constants/musicEnums";

export const preferencesSchema = z.object({
  genre: z.array(z.nativeEnum(Genre)).min(1, "Select at least one genre"),
  preferredDevice: z.enum(
    Object.values(PreferredDevice) as [string, ...string[]]
  ),
  moodBasedChoices: z
    .array(z.nativeEnum(MoodBasedChoices))
    .min(1, "Select at least one mood"),
  frequency: z.nativeEnum(Frequency),
  instruments: z.array(z.nativeEnum(Instruments)).optional(),
  skillLevel: z.nativeEnum(SkillLevel).optional(),
});
