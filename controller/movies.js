const moviesMOdel = require("../models/movies");
const _ = require("lodash")

class Movies {
    constructor() {

    }

    async getAll(req, res) {
        try {
            let movies = await moviesMOdel.findAll({ where: { username: req.user.username } });
            let myMovies = []
            for (let i = 0; i < movies.length; i++) {
                myMovies.push(_.cloneDeep(movies[i]));
                myMovies[i].sno = i + 1;
                console.log(new Date(parseInt(myMovies[i].releaseDate)))
                myMovies[i].releaseDate = (new Date(parseInt(myMovies[i].releaseDate))).toLocaleDateString('en-US');
            }
            return res.render("dashboard.ejs", { movies: myMovies });
        } catch (err) {
            console.log(err)
        }
    }

    async add(req, res) {
        try {
            await moviesMOdel.create({ username: req.user.username, movieName: req.body.movieName, rating: req.body.rating, cast: req.body.cast.split(","), genre: req.body.genre, releaseDate: Date.parse(req.body.releaseDate) });
            return res.redirect("/dashboard");
        } catch (err) {
            console.log(err)
        }
    }

    async edit(req, res) {
        try {
            let movie = await moviesMOdel.findOne({where: {username: req.user.username, id: req.query.id}});
            movie.dataValues.cast = movie.dataValues.cast.join(", ");
            return res.render("editMovie.ejs", { movie: movie});
        } catch (err) {
            console.log(err)
        }
    }


    async editApi(req, res) {
        try {
            await moviesMOdel.update({ movieName: req.body.movieName, rating: req.body.rating, cast: req.body.cast.split(","), genre: req.body.genre, releaseDate: Date.parse(req.body.releaseDate) }, { where: { username: req.user.username, id: req.body.id } });
            return res.redirect("/dashboard");
        } catch (err) {
            console.log(err)
        }
    }


    async delete(req, res) {
        try {
            await moviesMOdel.destroy({ where: { username: req.user.username, id: req.body.id } });
            return res.redirect("/dashboard");
        } catch (err) {
            console.log(err)
        }
    }

}


module.exports = new Movies();