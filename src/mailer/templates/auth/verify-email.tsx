import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  render,
  Section,
  Text,
} from "@react-email/components";

interface VerifyOtpEmailProps {
  validationCode?: string;
}

export const VerifyEmail = ({ validationCode }: VerifyOtpEmailProps) => (
  <Html>
    <Head />
    <Preview>Confirm your email address</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          {/* <Img */}
          {/*   src={`${baseUrl}/static/slack-logo.png`} */}
          {/*   width="120" */}
          {/*   height="36" */}
          {/*   alt="Slack" */}
          {/* /> */}
        </Section>
        <Heading style={h1}>Confirm your email address</Heading>
        <Text style={heroText}>
          Your confirmation code is below - enter it in your open browser window
          and we&apos;ll help you get signed in.
        </Text>

        <Section style={codeBox}>
          <Text style={confirmationCodeText}>{validationCode}</Text>
        </Section>

        <Text style={text}>
          If you didn&apos;t request this email, there&apos;s nothing to worry
          about, you can safely ignore it.
        </Text>
      </Container>
    </Body>
  </Html>
);

VerifyEmail.PreviewProps = {
  validationCode: "DJZ-TLX",
} as VerifyOtpEmailProps;

const getVerifyHtml = async (v: VerifyOtpEmailProps) =>
  await render(<VerifyEmail {...v} />);

export { getVerifyHtml };
export default VerifyEmail;

const main = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "0px 20px",
};

const logoContainer = {
  marginTop: "32px",
};

const h1 = {
  color: "#1d1c1d",
  fontSize: "36px",
  fontWeight: "700",
  margin: "30px 0",
  padding: "0",
  lineHeight: "42px",
};

const heroText = {
  fontSize: "20px",
  lineHeight: "28px",
  marginBottom: "30px",
};

const codeBox = {
  background: "rgb(245, 244, 245)",
  borderRadius: "4px",
  marginBottom: "30px",
  padding: "40px 10px",
};

const confirmationCodeText = {
  fontSize: "30px",
  textAlign: "center" as const,
  verticalAlign: "middle",
};

const text = {
  color: "#000",
  fontSize: "14px",
  lineHeight: "24px",
};
