/*
*
*
*       Complete the API routing below
*
*
*/

"use strict";

class Project {
  constructor(
    issue_title,
    issue_text,
    created_by,
    assigned_to = "",
    status_text = ""
  ) {
    this.issue_title = issue_title;
    this.issue_text = issue_text;
    this.created_by = created_by;
    this.assigned_to = assigned_to;
    this.status_text = status_text;
    this.created_on = new Date();
    this.updated_on = new Date();
    this.open = true;
  }
}

var expect = require("chai").expect;
var ObjectId = require("mongodb").ObjectID;

module.exports = function(app, collection) {
  app
    .route("/api/issues/:project")

    .get(function(req, res) {
      var project = req.params.project;
    })

    .post(function(req, res) {
      var project = req.params.project;
      const {
        issue_title,
        issue_text,
        created_by,
        assigned_to = "",
        status_text = ""
      } = req.body;
      const proj = new Project(
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text
      );
      if (issue_title === undefined)
        return res.status(400).send({ message: "Title missing" });
      if (issue_text === undefined)
        return res.status(400).send({ message: "Text missing" });
      if (created_by === undefined)
        return res.status(400).send({ message: "Created by missing" });

      collection.insert(proj, (err, issue) => {
        if (err) return res.status(500).send({ err });
        return res.status(200).send(issue.ops[0]);
      });
    })

    .put(function(req, res) {
      var project = req.params.project;
      let counter = 0;
      let update = {};

      for (let property in req.body) {
        counter += 1;
        if (property !== "_id") update[property] = req.body[property];
      }
      if (counter === 0) return res.status(400).send("no updated field sent");
      if (req.body._id === undefined)
        return res.status(400).send("missing _id");
      collection.findOneAndUpdate(
        { _id: ObjectId(req.body._id) },
        { $set: { ...update, updated_on: new Date() } },
        { returnOriginal: false },
        (err, document) => {
          if (err) {
            return res.status(500).send({ err });
          }

          if (document.value === null) {
            return res.status(400).send(`could not update ${req.body._id}`);
          }

          return res.status(200).send("successfully updated");
        }
      );
    })

    .delete(function(req, res) {
      var project = req.params.project;
    });
};
