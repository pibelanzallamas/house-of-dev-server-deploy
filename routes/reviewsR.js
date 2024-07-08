const express = require("express");
const reviews = express.Router();
const reviewsC = require("../controllers/reviewsC");
const validateUser = require("../middleware/auth");

//crear review
reviews.post("/register", reviewsC.crearReview);

//de acuerdo a una prop
reviews.get("/:pid", reviewsC.propReview);

//de acuerdo a un user
reviews.get("/users/:uid", reviewsC.userReview);

//todas
reviews.get("/", reviewsC.allReview);

//del rewview
reviews.delete("/:id", validateUser, reviewsC.delReview);

module.exports = reviews;
