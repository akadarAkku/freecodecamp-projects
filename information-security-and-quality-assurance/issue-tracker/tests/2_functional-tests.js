/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require("chai-http");
var chai = require("chai");
var assert = chai.assert;
var server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function() {
  suite("POST /api/issues/{project} => object with issue data", function() {
    test("Every field filled in", function(done) {
      chai
        .request(server)
        .post("/api/issues/test")
        .send({
          issue_title: "Title",
          issue_text: "text",
          created_by: "Functional Test - Every field filled in",
          assigned_to: "Chai and Mocha",
          status_text: "In QA"
        })
        .end(function(err, res) {
          const {
            issue_title,
            issue_text,
            created_by,
            assigned_to,
            status_text,
            created_on,
            updated_on,
            open
          } = res.body;
          assert.equal(res.status, 200);
          assert.equal(issue_title, "Title");
          assert.equal(issue_text, "text");
          assert.equal(created_by, "Functional Test - Every field filled in");
          assert.equal(assigned_to, "Chai and Mocha");
          assert.equal(status_text, "In QA");
          assert.isDefined(created_on);
          assert.isDefined(updated_on);
          assert.isTrue(open);
          done();
        });
    });
    test("Required fields filled in", function(done) {
      chai
        .request(server)
        .post("/api/issues/test")
        .send({
          issue_title: "Title",
          issue_text: "text",
          created_by: "Functional Test - Every field filled in",
          assigned_to: "Chai and Mocha",
          status_text: "In QA"
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          done();
        });
    });
    test("Missing required fields", function(done) {
      // don't know how to test for all different required fields,
      // if I can't add test here
      chai
        .request(server)
        .post("/api/issues/test")
        .send({
          issue_title: "Title",
          created_by: "user1",
          assigned_to: "testing purposes",
          status_text: "In QA"
        })
        .end(function(err, res) {
          assert.equal(res.status, 400);
          assert.equal(res.body.message, "Text missing");
          done();
        });
    });
  });

  suite("PUT /api/issues/{project} => text", function() {
    test("No body", function(done) {
      chai
        .request(server)
        .put("/api/issues/test")
        .end(function(err, res) {
          assert.equal(res.status, 400);
          assert.deepEqual(res.body, {});
          assert.equal(res.text, "no updated field sent");
          done();
        });
    });
    test("One field to update", function(done) {
      chai
        .request(server)
        .put("/api/issues/test")
        .send({
          _id: "5b34b6e92b05d71cfaf37128",
          issue_title: "Updated Title"
        })
        .end(function(err, res) {
          if (err) console.log("err", err);
          assert.equal(res.status, 200);
          assert.equal(res.text, "successfully updated");

          done();
        });
    });
    test("Multiple fields to update", function(done) {
      chai
        .request(server)
        .put("/api/issues/test")
        .send({
          _id: "5b34b6e92b05d71cfaf37128",
          created_by: "Functional Test - Every field filled in",
          assigned_to: "Chai and Mocha",
          issue_title: "Updated Title"
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "successfully updated");
          done();
        });
    });
  });

  suite(
    "GET /api/issues/{project} => Array of objects with issue data",
    function() {
      test("No filter", function(done) {
        chai
          .request(server)
          .get("/api/issues/test")
          .query({})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], "issue_title");
            assert.property(res.body[0], "issue_text");
            assert.property(res.body[0], "created_on");
            assert.property(res.body[0], "updated_on");
            assert.property(res.body[0], "created_by");
            assert.property(res.body[0], "assigned_to");
            assert.property(res.body[0], "open");
            assert.property(res.body[0], "status_text");
            assert.property(res.body[0], "_id");
            done();
          });
      });
      test("One filter", function(done) {
        chai
          .request(server)
          .get("/api/issues/test?open=true")
          .query({})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], "issue_title");
            assert.property(res.body[0], "issue_text");
            assert.property(res.body[0], "created_on");
            assert.property(res.body[0], "updated_on");
            assert.property(res.body[0], "created_by");
            assert.property(res.body[0], "assigned_to");
            assert.property(res.body[0], "open");
            assert.property(res.body[0], "status_text");
            assert.property(res.body[0], "_id");
            done();
          });
      });
      test("Multiple filters (test for multiple fields you know will be in the db for a return)", function(done) {
        chai
          .request(server)
          .get("/api/issues/test?created_by=user1&assigned_to=testing purposes")
          .query({})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], "issue_title");
            assert.property(res.body[0], "issue_text");
            assert.property(res.body[0], "created_on");
            assert.property(res.body[0], "updated_on");
            assert.property(res.body[0], "created_by");
            assert.property(res.body[0], "assigned_to");
            assert.property(res.body[0], "open");
            assert.property(res.body[0], "status_text");
            assert.property(res.body[0], "_id");
            done();
          });
      });
    }
  );

  suite("DELETE /api/issues/{project} => text", function() {
    test("No _id", function(done) {
      chai
        .request(server)
        .delete("/api/issues/test")
        .end(function(err, res) {
          // if (err) console.log("Error in test:", err);
          assert.equal(res.status, 400);
          assert.equal(res.text, "_id error");
          done();
        });
    });
    test("Valid _id", function(done) {
      chai
        .request(server)
        .delete("/api/issues/test")
        .send({
          _id: "5b34b6ea2b05d71cfaf37129"
        })
        .end(function(err, res) {
          // if (err) console.log("Error in test:", err);
          assert.equal(res.status, 200);
          assert.equal(res.text, "deleted 5b34b6ea2b05d71cfaf37129");
          done();
        });
    });
  });

  suite("PUT /api/issues/{project} => update open", function() {
    test("No _id", function(done) {
      chai
        .request(server)
        .put("/api/issues/test")
        .send({ _id: "5b34b748b377191d2df25736", open: false })
        .end(function(err, res) {
          // if (err) console.log("Error in test:", err);
          console.log(res.text);
          assert.equal(res.status, 200);
          assert.equal(res.text, "_id error");
          done();
        });
    });
  });
});
