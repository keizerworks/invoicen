import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";
import { Resource } from "sst/resource";

namespace Email {
  export const Client = new SESv2Client({});

  export async function send(to: string, subject: string, body: string) {
    await Client.send(
      new SendEmailCommand({
        Destination: {
          ToAddresses: [to],
        },
        Content: {
          Simple: {
            Body: {
              Text: {
                Data: body,
              },
            },
            Subject: {
              Data: subject,
            },
          },
        },
        FromEmailAddress: `Invoicen <${Resource["invoicen-email"].sender}>`,
      }),
    );
  }
}

export default Email;
