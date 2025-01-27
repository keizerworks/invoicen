export const email = new sst.aws.Email("invoicen-email", {
  sender: "keizerworks.com",
  dns: sst.cloudflare.dns(),
});
