import { issuer } from "@openauthjs/openauth";
import { CodeProvider } from "@openauthjs/openauth/provider/code";
import { CodeUI } from "@openauthjs/openauth/ui/code";
import { User } from "~/db/core/user";
import Email from "~/mailer";
import { handle } from "hono/aws-lambda";

import { subjects } from "./subjects";

/* INFO:
 * auth works with email or oauth
 * for now we only have email based auth
 * so by default user.verified is false
 * it means user haven't added the metadata yet
 * so restrict user to do anything unless they have added the metadata
 */
async function getUser(email: string) {
  let user = await User.findByEmail(email);
  if (!user) user = await User.create({ email });
  return user;
}

const app = issuer({
  subjects,
  // eslint-disable-next-line @typescript-eslint/require-await
  allow: async () => true,
  providers: {
    code: CodeProvider(
      CodeUI({
        sendCode: async ({ email }, code) => {
          await Email.send(
            email,
            "Confirm your email address",
            `Your login code is ${code}`,
          ).catch(console.error);
        },
      }),
    ),
  },
  success: async (ctx, value) => {
    const user = await getUser(value.claims.email);
    return ctx.subject("user", {
      id: user.id,
      email: user.email,
      name: user.name,
      verified: user.verified,
    });
  },
});

export const handler = handle(app);
