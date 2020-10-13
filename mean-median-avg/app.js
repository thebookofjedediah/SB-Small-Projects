const express = require('express');
const BigError = require('./bigError');
const { convertAndValidateNumsArray, findMode, findMean, findMedian } = require('./helpers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Get the Mean
app.get("/mean", (req, res, next) => {
    if (!req.query.nums) {
        throw new BigError("must include nums in query, ex: '?nums=1,2,3'", 400)
    }
    let numsAsStrings = req.query.nums.split(',');
    // check if anything bad was put in
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
      throw new BigError(nums.message);
    }
    let result = {
        operation: "mean",
        result: findMean(nums)
      }
    
      return res.send(result);
})

// Get the Median
app.get("/median", (req, res) => {
    if (!req.query.nums) {
        throw new BigError("must include nums in query, ex: '?nums=1,2,3'", 400)
    }
    let numsAsStrings = req.query.nums.split(',');
    // check if anything bad was put in
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
      throw new ExpressError(nums.message);
    }
  
    let result = {
      operation: "median",
      result: findMedian(nums)
    }
  
    return res.send(result);
})


// Get the Mode
app.get("/mode", (req, res) => {
    if (!req.query.nums) {
        throw new BigError("must include nums in query, ex: '?nums=1,2,3'", 400)
    }
    let numsAsStrings = req.query.nums.split(',');
    // check if anything bad was put in
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }

    let result = {
        operation: "mode",
        result: findMode(nums)
    }

    return res.send(result);
})

// Standard Error Handler
app.use(function (req, res, next) {
    const err = new BigError("Not Found",404);
    return next(err);
  });
  
// Custom Error Handler
app.use((error, req, res, next) => {
    let status = error.status || 500;
    let msg = error.msg;
    return res.status(error.status).json({
        error: {msg, status}
    })
})


app.listen(3000, () => {
    console.log("APP LISTENING ON PORT 3000")
})