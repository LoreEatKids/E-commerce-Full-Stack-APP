import { ZodType, z } from "zod";
import { userTypeLogin, userTypeRegister } from "../types/userTypes";

export const userSchemaRegister: ZodType<userTypeRegister> = z
  .object({
    email: z.string().email(),
    password: z.string().min(5),
    confirmPassword: z.string().min(5),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const userSchemaLogin: ZodType<userTypeLogin> = z
  .object({
    email: z.string().email(),
    password: z.string(),
});
