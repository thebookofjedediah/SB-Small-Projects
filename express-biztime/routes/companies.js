const db = require("../db");
const express = require("express");
const router = express.Router();

// GET a list of companies
router.get("/", async function (req, res, next) {
    const results = await db.query(
        `SELECT * FROM companies`);
    return res.json(results.rows);
  });

// GET a single companie by code
router.get("/:code", async function (req, res, next) {
    try {
        const { code } = req.params
        const result = await db.query(
            `SELECT * FROM companies WHERE code = $1`, [code]
        );
        return res.json(result.rows[0]);
    }
    catch (err) {
        return next(err);
    }
});

// POST create a company
router.post("/", async function (req, res, next) {
    try {
        const { code, name, description } = req.body;
        const result = await db.query(
            `INSERT INTO companies (code, name, description) 
             VALUES ($1, $2, $3)
             RETURNING code, name, description`,
            [code, name, description]
        );
        return res.status(201).json(result.rows[0]);
    }
    catch (err) {
        return next(err);
    }
});

// EDIT an existing company
router.patch("/:code", async function (req, res, next) {
    try {
        const { name, description } = req.body;
        const result = await db.query(
            `UPDATE companies SET name=$1, description=$2
             WHERE code = $3
             RETURNING code, name, description`,
             [name, description, req.params.code]
        );
        return res.json(result.rows[0]);
    }
    catch (err) {
        return next(err);
    }
});

// DELETE company 
router.delete("/:code", async function (req, res, next) {
    try {
        const result = await db.query(
            "DELETE FROM companies WHERE code = $1",
            [req.params.code]
        );
        return res.json({message: "Deleted"});
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;