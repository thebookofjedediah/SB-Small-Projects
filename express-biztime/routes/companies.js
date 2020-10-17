const db = require("../db");
const express = require("express");
const router = express.Router();
const slugify = require('slugify')

// GET a list of companies
router.get("/", async function (req, res, next) {
    const results = await db.query(
        `SELECT * FROM companies`);
    return res.json(results.rows);
  });

// GET a single company by code
router.get("/:code", async function (req, res, next) {
    try {
        let code = req.params.code;
    
        const compResult = await db.query(
            `SELECT code, name, description
            FROM companies
            WHERE code = $1`,
            [code]
        );
        const invResult = await db.query(
            `SELECT id
            FROM invoices
            WHERE comp_code = $1`,
            [code]
        );
        const associateResult = await db.query(
            `SELECT i_code
            FROM companies_industries
            WHERE comp_code = $1`,
            [code]
        )
        if (compResult.rows.length === 0) {
          throw new ExpressError(`No such company: ${code}`, 404)
        }
        const company = compResult.rows[0];
        const invoices = invResult.rows;
        const industries = associateResult.rows;
        company.invoices = invoices.map(inv => inv.id);
        company.industries = industries.map(ind => ind.i_code);
        
        return res.json({"company": company});
    }
    catch (err) {
        return next(err);
    }
});

// POST create a company
router.post("/", async function (req, res, next) {
    try {
        const { name, description } = req.body;
        let code = slugify(name).toLowerCase();
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