import serverless from "serverless-http";
import { setupApp } from "../server/index";

let handler: any = null;

async function getHandler() {
  if (!handler) {
    const app = await setupApp();
    handler = serverless(app);
  }
  return handler;
}

export default async function (req: any, res: any) {
  const h = await getHandler();
  return h(req, res);
}
