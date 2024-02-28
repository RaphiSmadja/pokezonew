var express = require('express');
var router = express.Router();
const models = require("../models");
const Pokemon = models.Pokemons;
const Moves = models.Moves;

router.get('/:pokemonId', function (req, res, next) {
    console.log(req.params)
    Moves.findAll({
        where: {
            id_pokemon: req.params.pokemonId
        }
    },{ include: [{model: Pokemon, as: 'pokemons'}] }).then(moves => {
        if (moves) {
            res.json({ msg: "OK", resultCode: 1, result: moves });
        } else {
            res.json({ msg: "NOK" })
        }
    }).catch(err => {
        res.json({ msg: "NOK", resultCode: 0, err: err });
    })
});

module.exports = router;