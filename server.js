import app from "./app.js";
import { dbConnect } from "./db/db.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;
await dbConnect();

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
