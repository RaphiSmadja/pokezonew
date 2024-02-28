var express = require('express');
var router = express.Router();
const models = require("../models");
const Pokemon = models.Pokemons;
const Moves = models.Moves;

router.get('/', function (req, res, next) {
    console.log(req.session)
    Pokemon.findAll({
        where: {
            id_user: req.session.userid
        },
        include: [{ model: Moves, as: 'pokemons' }]
    }).then(pokemons => {
        console.log(pokemons)
        if (pokemons) {
            res.json({ msg: "OK", resultCode: 1, result: pokemons });
        } else {
            res.json({ msg: "NOK" })
        }
    }).catch(err => {
        res.json({ msg: "NOK", resultCode: 0, err: err });
    })
});

router.get('/first', function (req, res, next) {
    console.log(req.session)
    Pokemon.findOne({
        where: {
            id_user: req.session.userid
        },
        include: [{ model: Moves, as: 'pokemons' }]
    }).then(pokemon => {
        if (pokemon) {
            res.json({ msg: "OK", resultCode: 1, result: pokemon });
        } else {
            res.json({ msg: "NOK" })
        }
    }).catch(err => {
        res.json({ msg: "NOK", resultCode: 0, err: err });
    })
})

router.post('/', function (req, res, next) {
    let idPokemon = req.body.idPokemon;
    let name = req.body.name;
    let backImage = req.body.backImage;
    let frontImage = req.body.frontImage;
    let level = req.body.level;
    let attack = req.body.attack;
    let spAttack = req.body.spAttack;
    let defense = req.body.defense;
    let spDefense = req.body.spDefense;
    let speed = req.body.speed;
    let hpRemaining = req.body.hpRemaining;
    let hp = req.body.hp;
    let type = req.body.type;
    let moves = req.body.moves;
    let idUser = req.session.userid;
    Pokemon.create({
        id_pokemon: idPokemon,
        id_user: idUser,
        name: name,
        back_image: backImage,
        front_image: frontImage,
        level: level,
        attack: attack,
        special_attack: spAttack,
        defense: defense,
        special_defense: spDefense,
        speed: speed,
        hp_remaining: hpRemaining,
        hp: hp,
        type: type
    }).then((pokemon) => {
        console.log(pokemon)
        console.log(moves)
        res.status(201).json({ message: 'Pokemon Capturé !' })
    })
        .catch(error => console.log(error)
        );
})

router.post('/chooseFirst', function (req, res, next) {
    let idPokemon = req.body.pokemon.idPokemon;
    let name = req.body.pokemon.name;
    let backImage = req.body.pokemon.backImage;
    let frontImage = req.body.pokemon.frontImage;
    let level = req.body.pokemon.level;
    let attack = req.body.pokemon.attack;
    let spAttack = req.body.pokemon.spAttack;
    let defense = req.body.pokemon.defense;
    let spDefense = req.body.pokemon.spDefense;
    let speed = req.body.pokemon.speed;
    let hpRemaining = req.body.pokemon.hpRemaining;
    let hp = req.body.pokemon.hp;
    let type = req.body.pokemon.type;
    let moves = req.body.pokemon.moves;
    let idUser = req.session.userid;
    console.log(moves)
    Pokemon.create({
        id_pokemon: idPokemon,
        id_user: idUser,
        name: name,
        back_image: backImage,
        front_image: frontImage,
        level: level,
        attack: attack,
        special_attack: spAttack,
        defense: defense,
        special_defense: spDefense,
        speed: speed,
        hp_remaining: hpRemaining,
        hp: hp,
        type: type
    }).then((pokemon) => {
        console.log(moves)
        let movesPoke = []
        for (let move of moves) {
            move.id_pokemon = pokemon.id
            movesPoke.push(move);
        }
        console.log(pokemon)
        if (moves) {
            Moves.bulkCreate(movesPoke).then((move) =>
                res.redirect("/pokemon"))
                .catch(error => res.status(400).json({ error }));
        }
    }).catch(error => console.log(error));
})


module.exports = router;