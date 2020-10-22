const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const { ensureLoggedIn, ensureCorrectUser, authenticateJWT } = require("../middleware/auth");
const User = require("../models/user");

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

//  router.post('/register', async (req, res, next) => {
//      try {
//         const { username, password, first_name, last_name, phone } = req.body;
//         if (!username || !password || !first_name || !last_name || !phone ) {
//             throw new ExpressError("Please fill out all fields", 400);
//         }
//         const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
//         User.register(username, hashedPassword, first_name, last_name, phone)
//      } catch (e) {
//         if (e.code === '23505') {
//             return next(new ExpressError("Username taken. Please pick a new one", 400))
//         }
//         return next(e)
//      }
//  })


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

 module.exports = router;