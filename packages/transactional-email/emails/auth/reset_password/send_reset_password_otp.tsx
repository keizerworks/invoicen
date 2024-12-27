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

interface SendRestPasswordOTPProps {
  validationCode?: string;
}

export const SendRestPasswordOTP = ({
  validationCode,
}: SendRestPasswordOTPProps) => (
  <Html>
    <Head />
    <Preview>Reset your password</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          {/* Logo placeholder if needed */}
        </Section>
        <Heading style={h1}>Reset your password</Heading>
        <Text style={heroText}>
          Use the confirmation code below to reset your password. Enter it in
          the password reset page to proceed.
        </Text>

        <Section style={codeBox}>
          <Text style={confirmationCodeText}>{validationCode}</Text>
        </Section>

        <Text style={text}>
          If you didn't request a password reset, you can safely ignore this
          email. Your password will remain unchanged.
        </Text>
      </Container>
    </Body>
  </Html>
);

SendRestPasswordOTP.PreviewProps = {
  validationCode: "ABC-123",
} as SendRestPasswordOTPProps;

const getSendRestPasswordOTPHtml = async (v: SendRestPasswordOTPProps) =>
  await render(<SendRestPasswordOTP {...v} />);

export { getSendRestPasswordOTPHtml };
export default SendRestPasswordOTP;

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
