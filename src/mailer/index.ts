import type { Destination } from "@aws-sdk/client-sesv2";
import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";
import { Resource } from "sst/resource";

const client = new SESv2Client();

interface Props {
  destination: Destination;
  template: string;
  subject?: string;
}

export const sendMail = async (props: Props) => {
  await client.send(
    new SendEmailCommand({
      FromEmailAddress: Resource.Email.sender,
      Destination: props.destination,
      Content: {
        Simple: {
          Subject: { Data: props.subject },
          Body: { Html: { Data: props.template } },
        },
      },
    }),
  );
};
