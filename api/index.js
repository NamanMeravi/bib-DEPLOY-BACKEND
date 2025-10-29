import app from "../app.js";
import { dbConnect } from "../db/db.js";
import serverless from "serverless-http";

// ✅ Connect to MongoDB on cold start
await dbConnect();

// ✅ Export Express app wrapped for Vercel
export const handler = serverless(app);
export default app;
