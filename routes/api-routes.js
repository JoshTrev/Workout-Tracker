// var db = require("../models");

const mongojs = require("mongojs");

const databaseUrl = "workout";
const collections = ["workouts"];

const db = mongojs(databaseUrl, collections);

module.exports = function (app) {

    app.post("/api/workouts", function (req, res) {

        // console.log("/api/workouts req.body");
        // console.log(req.body);

        db.workouts.insert(req.body, (err, data) => {
            if (err)
                console.log(err);

            res.json(data);
        });
    });

    app.get("/api/workouts", (req, res) => {
        db.workouts.find({}, (error, data) => {

            // console.log(data);

            if (error) {
                res.send(error);
            } else {
                res.json(data);
            }
        });
    });

    // GET /api/workouts/range (Last 7 days: Think LIMIT(7))

    app.get("/api/workouts/range", (req, res) => {
        db.workouts.find({}).sort({ day:-1 }).limit(7, (error, data) => {

            console.log(data);

            if (error) {
                res.send(error);
            } else {
                res.json(data);
            }
        });
    });

    app.put("/api/workouts/:id", (req, res) => {
        db.workouts.update(
            {
                _id: mongojs.ObjectId(req.params.id)
            },
            {
                $set: {
                    day: new Date(),
                },
                $addToSet: {
                    exercises: req.body,
                }
            },
            (error, data) => {
                console.log("/api/workouts/:id req.body");
                // console.log(req.body);
                if (error) {
                    res.send(error);
                } else {
                    res.send(data);
                }
            }
        );
    });

};
