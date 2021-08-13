const { Router } = require('express');
//const axios = require('axios');

// const router = require('express').Router();
const router = Router();
const {getPokemons, getPokemonById, pokemonPost} = require('../controlers/pokemon')

router.get ('/' , getPokemons)

router.get ('/:id', getPokemonById )

// async (req, res) => {
//     const {id} = req.params;
//     const response= await axios.get ('https://pokeapi.co/api/v2/pokemon/'+id)
// })

router.post ('/' ,pokemonPost)

module.exports = router ;