import { createSubjects } from "@openauthjs/openauth/subject";
import { boolean, nullable, object, string } from "valibot";

export const subjects = createSubjects({
  user: object({
    id: string(),
    name: nullable(string()),
    email: string(),
    verified: boolean(),
  }),
});
