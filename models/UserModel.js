let mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, minlength: 4 },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (value) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value),
            message: "Invalid Email Address",
        },
    },
    address: {
        street: { type: String, required: true },
        suite: { type: String, required: true },
        city: {
            type: String,
            required: true,
            validate: {
                validator: (value) => /^[a-zA-z\s]+$/.test(value),
                message: "Invalid City Name",
            },
        },
        zipcode: {
            type: String,
            required: true,
            validate: {
                validator: (value) => /^\d{5}[-]\d{4}$/.test(value),
                message: "Invalid ZipCode",
            },
        },
        geo: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
        },
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: (value) => /^\d[-]\d{3}[-]\d{3}[-]\d{4}$/.test(value),
            message: "Invalid Phone number",
        },
    },
    website: {
        type: String,
        required: true,
        validate: {
            validator: (value) => /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?$/.test(value),
            message: "Invalid Website",
        },
    },
    company: {
        name: { type: String, required: true },
        catchPhrase: { type: String, required: true },
        bs: { type: String, required: true },
    },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
