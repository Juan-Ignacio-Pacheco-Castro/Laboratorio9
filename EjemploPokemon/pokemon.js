const BASE_URL = 'https://pokeapi.co/api/v2/';
const IMG_TAG = 'img';
const POKEMON_NAME_INPUT = 'name-input';
const POKEMON_IMG_PLACE = 'pokemon-img';
const POKEMON_ABILITIES_PLACE = 'pokemon-abilities';
const POKEMON_NAME_PLACE = 'pokemon-name';
const CARD = 'card';

async function getPokemonByName(name){
    const pokemonURL = `${BASE_URL}pokemon/${name}`;
    let pokemonData = null;

    try{
        const response = await fetch(pokemonURL);
        pokemonData = await response.json();
        showPokemonImg(pokemonData);
        showPokemonInfo(pokemonData);
    } catch (error) {
        console.log(`Algo ha fallado: ${error.message}`);
    }
}

function showPokemonImg(pokemonData){
    const { sprites } = pokemonData;
    const imgLink = sprites.front_default;
    const img = document.createElement(IMG_TAG);
    img.src = imgLink;
    const imgPlace = document.getElementById(POKEMON_IMG_PLACE);
    clear(imgPlace);
    imgPlace.appendChild(img);
}

function showPokemonInfo(pokemonData){
    const { abilities, name, types } = pokemonData;
    let tempPokemonName = `<a id="pokeName">${name}<a/>`;
    tempPokemonName = tempPokemonName.toLocaleUpperCase();
    let pokemonName = tempPokemonName + "<br /><br />";
    const pokemonNamePlace = document.getElementById(POKEMON_NAME_PLACE);
    pokemonNamePlace.innerHTML = pokemonName;

    let pokemonAbilities = "<br/>";
    for(let index in abilities){
        let tempPokemonAbilities = `${abilities[index].ability.name}`;
        tempPokemonAbilities = tempPokemonAbilities.toLocaleUpperCase();
        pokemonAbilities += tempPokemonAbilities + "<br/><br/>";
    }
    const pokemonAbilitiesPlace = document.getElementById(POKEMON_ABILITIES_PLACE);
    pokemonAbilitiesPlace.innerHTML = pokemonAbilities;

    const pokemonCard = document.getElementById(CARD);
    let style = "display: block;";

    let specificType = `${types[0].type.name}`;
    switch(specificType){
        case "grass":
            style += "background-color: #78c850;";
        break;
        case "poison":
            style += "background-color: #a040a0;";
        break;
        case "bug":
            style += "background-color: #a8b820;";
        break;
        case "normal":
            style += "background-color: gray;";
        break;
        case "fire":
            style += "background-color: #f08030;";
        break;
        case "water":
            style += "background-color: #6890f0;";
        break;
        case "electric":
            style += "background-color: #f8d030;";
        break;
        case "fighting":
            style += "background-color: #c03028;";
        break;
        case "psychic":
            style += "background-color: #f85888;";
        break;
        case "normal":
            style += "background-color: #a8a878;";
        break;
        case "dark":
            style += "background-color: #705848;";
        break;
        case "steel":
            style += "background-color: #b8b8d0;";
        break;
        case "dragon":
            style += "background-color: #9268f8;";
        break;
        case "fairy":
            style += "background-color: #ee99ac;";
        break;
    }

    pokemonCard.style = style;
}

const clear = section => section.innerHTML='';

function findPokemon(){
    let pokemonName = document.getElementById("name-input").value;
    pokemonName = pokemonName.toLowerCase();
    if (pokemonName != ""){
        getPokemonByName(pokemonName);
    }
}