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
      console.log("REQUEST GET");
      console.log(req.query);
      var project = req.params.project;
      let filter = {};

      for (let property in req.query) {
        if (req.query[property] === "true") {
          filter[property] = true;
        } else if (req.query[property] === "false") {
          filter[property] = false;
        } else {
          filter[property] = req.query[property];
        }
      }
      collection.find(filter).toArray((err, documents) => {
        if (err) return res.status(500).send({ err });
        return res.status(200).send(documents);
      });
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
      console.log("PUT REQUEST OCCURED");
      var project = req.params.project;
      let counter = 0;
      let update = {};

      for (let property in req.body) {
        counter += 1;
        if (property === "_id") {
        } else if (req.body[property] === "true") {
          update[property] = true;
        } else if (req.body[property] === "false") {
          update[property] = false;
        } else {
          update[property] = req.body[property];
        }
      }
      if (counter === 0) return res.status(400).send("no updated field sent");
      if (req.body._id === undefined)
        return res.status(400).send("missing _id");

      console.log("update", update);
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
      console.log("REQUEST DELETE");
      var project = req.params.project;
      if (req.body._id === undefined) {
        return res.status(400).send("_id error");
      }

      collection.deleteOne({ _id: ObjectId(req.body._id) }, (err, result) => {
        if (err) return res.status(500).send({ err });
        if (result.n === 0) {
          return res.status(400).send(`could not delete ${req.body._id}`);
        }
        return res.status(200).send(`deleted ${req.body._id}`);
      });
    });
};
