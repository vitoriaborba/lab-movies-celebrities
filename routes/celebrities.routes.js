const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities", (req, res, next) =>{
    Celebrity.find()
    .then((allCeleb) => {
        console.log(allCeleb);
        res.render('celebrities/celebrities', {celeb: allCeleb})
    })
    .catch((err) => {
        console.log(err);
    })

})

router.get("/celebrities/create", (req, res) => {
    res.render("celebrities/new-celebrity")
});

router.post("/celebrities/create", (req, res) => {
    const {name, occupation, catchPhrase} = req.body;

    Celebrity.create({name, occupation, catchPhrase})
    .then((createdCeleb) => {
        console.log ('Celeb Created', createdCeleb.name);
        res.redirect('/celebrities')
    })
    .catch((err) => {
        res.render("/celebrities/new-celebrity")
    })
});



module.exports = router;