const axios = require('axios');
const {
    Pokemon,
    Type
} = require('../db')


// Get Pokemon from Data base 

const getPokemonsDB = async () => {
    try{
        const results = await Pokemon.findAll ({
            include:{
                model: Type,
                attributes: ['name'],
                through:{
                    attributes: [],
                }
            }
        })
       // console.log(results)
        return results;
    }catch (err){
        console.log(err);
    }
} 

const pokemonData = (data) => {
    return {
        name: data.name,
        id: data.id,
        hp : data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        height: data.height,
        weight : data.weight,
        image : data.sprites.other['official-artwork'],
        types: data.types.map( el=>{
                return {
                    name:  el.type.name
                }
            })
    }
}

//Get pokemons from API

const getPokemonsApi = async () => {
    try{
        const {data} = await axios.get ("https://pokeapi.co/api/v2/pokemon?limit=40")
        const resultsApi = data.results.map( (el) => axios.get (el.url))
        const results = await Promise.all(resultsApi)

        const apiInfo= results.map( (el) => pokemonData(el.data) )
        
        return apiInfo;
        
    }catch (err){
        console.log(err);
    }
}


// Put togueter the BD pokemosns and the Api pokemons
const getAllPokemon = async () => {
    try { 
        const apiInfo = await getPokemonsApi();
        const dbInfo = await getPokemonsDB();
        const infoTotal = dbInfo.concat(apiInfo);
       // console.log(infoTotal);
        return infoTotal;
    }catch (err) {
        console.log(err);
    }
}


const getPokemons = async (req, res) => {
    const { name } = req.query

    try{
        if(name){
            const dbPokemonsAll = await getPokemonsDB();
            const dbPokemons = dbPokemonsAll.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))

            let apiPokemons ; 
            try{
                const {data} = await axios.get (`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
                apiPokemons =  pokemonData(data);

            } catch (err) {
                console.log(err);
            }  
        
            const totalPokemon = apiPokemons? dbPokemons.concat(apiPokemons) : dbPokemons;
           
            if(totalPokemon.length){
                return res.status(200).send(totalPokemon)
            }else {
                return res.status(400).send('Pokemon not found');
            }
        }else {
            const pokemonsTotal = await getAllPokemon();
            return res.send (pokemonsTotal);
        }
    }catch (err){
        console.log(err);
    }
}

const getPokemonById = async (req, res) => {
    const { id } = req.params;
    try{
        if(id){
            if (/^[0-9]+$/.test(id)) {
                try {
                    const {data} = await axios.get (`https://pokeapi.co/api/v2/pokemon/${id}`);
                    const apiPokemons =  pokemonData(data);

                    return apiPokemons ? res.status(200).send (apiPokemons) : res.status(400).send('Pokemon not found');
                }catch (err){
                    console.log (err)
                }
            } else {
                const pokemonDb = await Pokemon.findByPk (id, {
                    include:{
                        model: Type,
                        attributes: ['name'],
                        through:{
                            attributes: [],
                        }
                    }
                })
                return pokemonDb ? res.status(200).send (pokemonDb) : res.status(400).send('Pokemon not found');
            }
        }
    }catch (err){
        console.log(err);
    }
}

const pokemonPost = async(req, res) => {
    //funcion para crear un pokemon
    const { name, hp, attack, defense, speed, height, weight, image, types } = req.body;

    try {
        const pokemonCreated = await Pokemon.create({
            name, 
            hp, 
            attack, 
            defense, 
            speed,
            height, 
            weight, 
            image 
        });
        const typeDb= await Type.findAll({ 
            where : { name: types},
        });
        await pokemonCreated.addType(typeDb);
        return res.send('Pokemon created successfully');
    }catch (err) {
       res.status(400).send("Error en data")
    }

}

module.exports = {
    getPokemons,
    getPokemonById,
    pokemonPost
};