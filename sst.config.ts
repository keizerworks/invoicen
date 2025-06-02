/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "invoicen",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    new sst.aws.Nextjs("invoicen", {
      warm: 1,
      domain: {
        name: "invoicen.keizerworks.com",
        dns: sst.cloudflare.dns({ proxy: true }),
      },
    });
  },
});
