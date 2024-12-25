import { Button, Html, render } from "@react-email/components";

const WelcomeEmail = () => {
  return (
    <Html lang="en">
      <Button
        href="https://example.com"
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        Click me
      </Button>
    </Html>
  );
};

const getWelcomeEmailHtml = async () => await render(<WelcomeEmail />);
export { getWelcomeEmailHtml };
export default WelcomeEmail;
