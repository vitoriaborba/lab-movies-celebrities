const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/movies", (req, res, next) =>{
    Movie.find()
    .then((allMovie) => {
        console.log(allMovie);
        res.render('movies/movies', {movies: allMovie})
    })
    .catch((err) => {
        console.log(err);
    })

})

router.get("/movies/create", (req, res) => {
    Celebrity.find()
    .then((allCeleb) => {
        res.render("movies/new-movie", {celebs: allCeleb})
    })
});

router.post("/movies/create", (req, res) => {
    const {title, genre, plot, cast} = req.body;
    Movie.create({title, genre, plot, cast})
    .then((createdMovie) => {
        console.log ('Movie Created', createdMovie.title);
        res.redirect('/movies')
    })
    .catch((err) => {
        res.render("/movies/new-movie")
    })
});
router.get('/movies/:id', (req, res, next) => {
    const {id} = req.params;
      Movie.findById(id)
      .populate('cast')
      .then((foundMovie) => {
        console.log(foundMovie)
          res.render('movies/movie-details', {movies: foundMovie});
      })
      .catch((err) => {
          next(err)
      })
  });

  router.post('/movies/:id/delete', (req, res, next) => {
    const {id} = req.params;
  
      Movie.findByIdAndRemove(id)
      .then(() => {
          res.redirect("/movies");
      })
      .catch((err) => {
          next(err)
      })
  });

  router.get('/movies/:id/edit',  (req, res, next) =>{
      Movie.findById(req.params.id)
      .populate('cast')
      .then((movieFound) =>{
          res.render("movies/edit-movie", {movies: movieFound})
      })
      
  })
  router.post('/movies/:id/edit',  (req, res, next) =>{
    const {id} = req.params;
    const {title, genre, plot, cast} = req.body;
  Movie.findByIdAndUpdate(id, {title, genre, plot, cast})
  .populate('cast')
  .then(() => {
    res.redirect("/movies");
  })
  .catch((err) => next(err))

  })
  
module.exports = router;