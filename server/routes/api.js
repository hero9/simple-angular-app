const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require('path');

const Tasks = require("../models/tasks.js");

mongoose.connect("mongodb://localhost:27017/task");
db = mongoose.connection;

const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == "object" ? err.message : err;
  res.status(501).json(response);
};

let response = {
  status: 200,
  data: [],
  message: null
};

/* =======  POST Requests ======== */

router.post("/tasks", (req, res, next) => {
  Tasks.create(
    {
			text: req.body.text,
    },
    (err, post) => {
      if (err) return next(err);
      res.json(post);
    }
  );
});


/* =======  GET Requests ======== */

router.get("/tasks", (req, res, next) => {
  Tasks.find((err, items) => {
    if (err) return next(err);
    res.json(items);
  });
});


/* =======  DELETE Requests ======== */

router.delete("/tasks/:id", (req, res) => {
  Tasks.findByIdAndRemove(req.params.id, (err, post) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: "This task successfully deleted",
      id: req.params.id
    };
    return res.status(200).send(response);
  });
});

module.exports = router;