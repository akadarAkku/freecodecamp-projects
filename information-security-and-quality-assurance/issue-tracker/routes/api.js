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
    })

    .delete(function(req, res) {
      var project = req.params.project;
    });
};
