import { setupApp } from "../server/index";

let appPromise: Promise<any> | null = null;

export default async function handler(req: any, res: any) {
  // Initialize app once and reuse across requests
  if (!appPromise) {
    appPromise = setupApp();
  }

  const app = await appPromise;
  return app(req, res);
}
