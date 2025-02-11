export const domain =
  {
    production: "v2.invoicen.keizerworks.com",
    dev: "dev.v2.invoicen.keizerworks.com",
    sandbox: "sandbox.v2.invoicen.keizerworks.com",
  }[$app.stage] || $app.stage + ".dev.v2.invoicen.keizerworks.com";
