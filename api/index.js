import app from "../app.js";
import { dbConnect } from "../db/db.js";

// Connect DB once per cold start
await dbConnect();

// Export default handler for Vercel
export default app;
