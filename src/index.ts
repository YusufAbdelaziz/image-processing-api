import express from "express";
import { mainRouter } from "./routes/mainRouter";

const app = express();

const port = 3000;

app.use("/api", mainRouter);
app.get("/", (_, res) => {
  res.send("You're in main route, Kindly go to api/editImage");
});

app.listen(port, () => console.log("listening on http://localhost:3000/api/editImage"));

export default app;
