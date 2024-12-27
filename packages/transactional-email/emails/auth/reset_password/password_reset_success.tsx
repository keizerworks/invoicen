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

export const PasswordResetSuccessEmail = () => (
  <Html>
    <Head />
    <Preview>Password Reset Successful</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          {/* Logo placeholder if needed */}
        </Section>
        <Heading style={h1}>Your password has been reset</Heading>
        <Text style={text}>
          We wanted to let you know that your password was successfully reset.
          If you did not initiate this change, please contact our support team
          immediately.
        </Text>

        <Text style={text}>
          You can now use your new password to log in to your account.
        </Text>

        <Text style={text}>Thank you,</Text>
        <Text style={text}>The Team</Text>
      </Container>
    </Body>
  </Html>
);

const getPasswordResetSuccessHtml = async () =>
  await render(<PasswordResetSuccessEmail />);

export { getPasswordResetSuccessHtml };
export default PasswordResetSuccessEmail;

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

const text = {
  color: "#000",
  fontSize: "14px",
  lineHeight: "24px",
};
