import { z } from "zod";

export const formschema = z.object({
  title: z.string().min(3).max(20),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(20),
  // link: z
  //   .string()
  //   .url("Enter a valid URL")
  //   .refine(
  //     (url) => /\.(jpeg|jpg|gif|png|webp|bmp)$/i.test(url),
  //     { message: "URL must point to an image" }
  //   ),
  pitch: z.string().min(10),
});
