const db = require("../db");
const express = require("express");
const router = express.Router();

// GET a list of invoices
router.get("/", async function (req, res, next) {
    const results = await db.query(
        `SELECT id, comp_code FROM invoices`);
    return res.json(results.rows);
});

// GET a single company by id
router.get("/:id", async function (req, res, next) {
    try {
        const { id } = req.params
        const result = await db.query(
            `SELECT * FROM invoices WHERE id = $1`, [id]
        );
        return res.json(result.rows[0]);
    }
    catch (err) {
        return next(err);
    }
});

// POST create an invoice
router.post("/", async function (req, res, next) {
    try {
        const { comp_code, amt } = req.body;
        const result = await db.query(
            `INSERT INTO invoices (comp_code, amt) 
             VALUES ($1, $2)
             RETURNING id, comp_code, amt, paid, add_date, paid_date`,
            [comp_code, amt]
        );
        return res.status(201).json(result.rows[0]);
    }
    catch (err) {
        return next(err);
    }
});

// EDIT an existing invoice
router.patch("/:id", async function (req, res, next) {
    try {
        let {amt, paid} = req.body;
        let id = req.params.id;
        let paidDate = null;
        const currResult = await db.query(
                 `SELECT paid
                 FROM invoices
                 WHERE id = $1`,
                 [id]);
        if (currResult.rows.length === 0) {
            throw new ExpressError(`No such invoice: ${id}`, 404);
        }
    
        const currPaidDate = currResult.rows[0].paid_date;
    
        if (!currPaidDate && paid) {
            paidDate = new Date();
        } else if (!paid) {
            paidDate = null
        } else {
            paidDate = currPaidDate;
        }   
    
        const result = await db.query(
              `UPDATE invoices
               SET amt=$1, paid=$2, paid_date=$3
               WHERE id=$4
               RETURNING id, comp_code, amt, paid, add_date, paid_date`,
            [amt, paid, paidDate, id]);
    
        return res.json({"invoice": result.rows[0]});
    }
    catch (err) {
        return next(err);
    }
});

// DELETE invoice 
router.delete("/:id", async function (req, res, next) {
    try {
        const result = await db.query(
            "DELETE FROM invoices WHERE id = $1",
            [req.params.id]
        );
        return res.json({message: "Deleted"});
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;