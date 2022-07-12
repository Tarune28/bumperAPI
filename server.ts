import express from "express";
import cors from "cors";
import * as bodyparser from "body-parser";

import accounts from "./accounts";
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3001"],
  })
);
//express middleware configuration
app.use(
  bodyparser.json({
    limit: "10mb",
  })
);

app.use("/accounts", accounts);

app.listen(process.env.PORT || 3000, () => {
  console.log("app has started on port 3000 or", process.env.PORT);
});
