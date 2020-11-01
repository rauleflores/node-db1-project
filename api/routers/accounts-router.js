const express = require("express");
const db = require("../../data/dbConfig");

const router = express.Router();

router.post("/accounts", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget,
    };
    if (!payload.name || !payload.budget) {
      return res.json({
        errorMessage: "Please provide a name and/or budget for the account.",
      });
    }
    const [id] = await db.insert(payload).into("accounts");
    res.json(await getAccountById(id));
  } catch (err) {
    next(err);
  }
});

router.get("/accounts", async (req, res, next) => {
  try {
    const accounts = await db("accounts");
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get("/accounts/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const account = await db("accounts").where("id", id).first();
    res.json(account);
  } catch (err) {
    next(err);
  }
});

router.put("/accounts/:id", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget,
    };
    if (!payload.name || !payload.budget) {
      return res.json({
        errorMessage: "Please provide a name and/or budget for the account.",
      });
    }
    const { id } = req.params;
    await db("accounts").where("id", id).update(payload);
    res.json(await getAccountById(id));
  } catch (err) {
    next(err);
  }
});

router.delete("/accounts/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const thisMany = await db("accounts").where("id", id).del();
    res.json({
      message: `${thisMany} file(s) removed.`,
    });
  } catch (err) {
    next(err);
  }
});

function getAccountById(id) {
  return db.first("*").from("accounts").where("id", id);
}

module.exports = router;
