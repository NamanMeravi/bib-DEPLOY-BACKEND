import { dbConnect } from "../db/db.js";
import { cronJobForAutoDeletionFromRecycleBinParmanently } from "../models/fileFolder.model.js";

await dbConnect();
await cronJobForAutoDeletionFromRecycleBinParmanently();

export default function handler(req, res) {
  res.status(200).send("🗑️ Recycle bin cleanup executed successfully");
}
