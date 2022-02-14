let express = require("express");
let app = express();
let UserModel = require("./models/UserModel");
let mongoose = require("mongoose");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mongoose
mongoose.Promise = global.Promise;
mongoose
    .connect("", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
    })
    .then(() => {
        console.log("Successfully connected to the database mongoDB Atlas Server");
    })
    .catch((err) => {
        console.log("Could not connect to the database. Exiting now...", err);
        process.exit();
    });

// Endpoint
app.get("/users", async (req, res) => {
    try {
        let users = await UserModel.find({});
        return res.status(201).send(users);
    } catch (err) {
        return res.status(500).send(err);
    }
});

app.post("/users", async (req, res) => {
    if (!req.body) {
        return res.status(500).send("All Fields required");
    }

    let user = new UserModel(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        return res.status(500).send(err);
    }
});

app.listen(3000, () => {
    console.log("Server running at PORT 3000");
});
