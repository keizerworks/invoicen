import { postgres } from "./storage";

export const drzzleStudio = new sst.x.DevCommand("drizzle-studio", {
  link: [postgres],
  dev: {
    command: "npx drizzle-kit studio",
  },
});
