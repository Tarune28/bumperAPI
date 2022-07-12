import * as express from "express";
import { servicesVersion } from "typescript";
const router = express.Router();

router.get("/:accountId", async (req: any, res, next) => {
  const accountId = req.params.accountId;

  try {
    console.log("GET Response / Account Summary / For Id: ", accountId);
    res.send({ accountId: accountId });
  } catch (err) {
    console.log("GET Error / Account Summary / For Id: ", accountId, err);
    // TO-DO Handle errors from Trading API
    res.send({ error: "Get Account Route Error" });
  }
});

export default router;

// GET /accounts/:accountID return that particular account's information

// GET /accounts/:accountID/friends >>>>>>

// GET /feed/:accountID return that particularr account's feed

// POST /media upload file to the server
