// /src/zod-schemas/formdata/userInfoSchema.ts
import { z } from "zod";

export const userInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  age: z.number().int().min(13, "Must be at least 13 years old"),
  location: z.string().optional(),
});
