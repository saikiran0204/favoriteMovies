// const user = require("../models/user")
const _ = require("lodash")
const authentication = require("../authentication");

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Login {
    constructor() {
    }

    async login(req, res) {
        try {
            if (!(_.isEmpty(req.body.username) || _.isEmpty(req.body.password))) {
                let myUser = await user.findOne({where: {username: req.body.username, password: req.body.password,}});
                if (!_.isEmpty(myUser)) {

                    res.cookie("authorization", authentication.create(myUser.dataValues));
                    return res.redirect("/dashboard");
                }

                return res.render("login", { message: "Username or password does not match" });
            }
            return res.render("login", { message: "Username or password is empty" });
        } catch (err) {
            console.log(err)
        }
    }

    async register(req, res) {
        try {
        if (!(_.isEmpty(req.body.username) || _.isEmpty(req.body.password))) {
            let myUser = await user.findOne({where: {username: req.body.username}});
                if (!_.isEmpty(myUser)) {
                    return res.render("register", { message: "Username already present" });
                }
                await user.create({username: req.body.username, password: req.body.password});
                return res.redirect("/dashboard");
            }
            return res.render("login", { message: "Username or password is empty" });
        } catch (err) {
            console.log(err)
        }
    }
}


module.exports = new Login();