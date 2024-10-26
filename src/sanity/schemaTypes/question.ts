import { z } from "zod";

export const questionRequestSchema = z.object({
  question: z.string()
});

export const questionReponseSchema = z.object({
  answer: z.string()
});