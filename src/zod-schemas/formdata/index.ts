// /src/zod-schemas/formdata/index.ts
import { z } from "zod";
import { userInfoSchema } from "./userInfoSchema";
import { preferencesSchema } from "./preferencesSchema";
import { resonanceSchema } from "./resonanceSchema";

export const fullFormSchema = z.object({
  userInfo: userInfoSchema,
  preferences: preferencesSchema,
  resonance: resonanceSchema,
});

export type FullFormSchemaType = {
  userInfo: UserInfoSchemaType;
  preferences?: Partial<PreferencesSchemaType>;
  resonance?: Partial<ResonanceSchemaType>;
};

export type UserInfoSchemaType = z.infer<typeof userInfoSchema>;
export type PreferencesSchemaType = z.infer<typeof preferencesSchema>;
export type ResonanceSchemaType = z.infer<typeof resonanceSchema>;
