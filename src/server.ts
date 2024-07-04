import { app } from "./app";
import mongoose from "mongoose";
const port = 3000;

const url =
  "mongodb+srv://thournhourn:aS93nmdJEZo8g05M@learnwith-api.d8ozm8e.mongodb.net/";
async function Run() {
  try {
    await mongoose.connect(url);
    console.log("Successfully connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err: unknown) {
    console.log("Initial MongoDB connection error", { err });
  }
}

Run();
