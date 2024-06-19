let AUDIO_VOiCE;
let pokemon = [];
let allPokemon = [];
let currentPokemon;
let selectedPokemon = 40;
let start = 0;


const colors = [
	{"type": "normal", "background": "linear-gradient(to bottom, #C6C6A7, #D5D5B8, #E5E5CC, #F4F4E1, #FFFFFF)"},
	{"type": "fire", "background": "linear-gradient(to bottom, #F08030, #F59951, #FFB973, #FFD494, #FFEAB6)"},
	{"type": "water", "background": "linear-gradient(to bottom, #6890F0, #79A8F8, #8CB9FF, #9FCAFF, #B2DBFF)"},
	{"type": "electric", "background": "linear-gradient(to bottom, #F8D030, #F9E252, #FAEA75, #FBF399, #FFFFBD)"},
	{"type": "grass", "background": "linear-gradient(to bottom, #78C850, #8CD170, #A7E092, #C2F3B2, #DDFFD2)"},
	{"type": "ice", "background": "linear-gradient(to bottom, #98D8D8, #AEE1E1, #C2EAEA, #D5F3F3, #E8FFFF)"},
	{"type": "fighting", "background": "linear-gradient(to bottom, #C03028, #D5514B, #E57373, #F29196, #FFB8C0)"},
	{"type": "poison", "background": "linear-gradient(to bottom, #A040A0, #B659B6, #CC7ACC, #E18DE1, #FFB1FF)"},
	{"type": "ground", "background": "linear-gradient(to bottom, #E0C068, #E8D984, #F2ECAA, #FCEFBF, #FFFFFF)"},
	{"type": "flying", "background": "linear-gradient(to bottom, #A890F0, #B5A8F8, #C9CAFF, #E1E3FF, #FFFFFF)"},
	{"type": "psychic", "background": "linear-gradient(to bottom, #F85888, #FA6F9C, #FB8FB5, #FCAFCF, #FDCFE9)"},
	{"type": "bug", "background": "linear-gradient(to bottom, #A8B820, #BAC438, #CDDC5F, #DEE783, #FFFFA6)"},
	{"type": "rock", "background": "linear-gradient(to bottom, #B8A038, #C9BB4F, #DBD269, #ECE682, #FFFF9C)"},
	{"type": "ghost", "background": "linear-gradient(to bottom, #705898, #7A6AA2, #8C80B8, #9E96CC, #B0ADD9)"},
	{"type": "dragon", "background": "linear-gradient(to bottom, #7038F8, #7E51FF, #9473FF, #AB94FF, #C5B5FF)"},
	{"type": "dark", "background": "linear-gradient(to bottom, #705848, #7D675F, #917582, #A69E9F, #BABAB6)"},
	{"type": "steel", "background": "linear-gradient(to bottom, #B8B8D0, #C9C9DB, #DBDBE5, #ECECF0, #FFFFFF)"},
	{"type": "fairy", "background": "linear-gradient(to bottom, #EE99AC, #F0AAC3, #F3BBCD, #F5CDE6, #F8DEF1)"}
]
async function init() {
  await loadPokemon();
  loadAllPokemon();
}


async function loadPokemon() {
  for (let i = start; i < selectedPokemon; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
    let response = await fetch(url);
    let currentPokemon = await response.json();
    pokemon.push(currentPokemon);
    renderPokemonInfo(i);
  
  }
  
}

async function loadAllPokemon(){
  for (let i = 0; i < 1025; i++) {
  let url = `https://pokeapi.co/api/v2/pokemon/${i+1}`;
  let response = await fetch(url);
  let pokemonNames = await response.json();
  allPokemon.push(pokemonNames);
  }
}

async function nextPokemon() {
  start = start + 40;
  selectedPokemon = selectedPokemon + 40;
  await loadPokemon();
}

function renderPokemonInfo(i){
  document.getElementById("pokedex").innerHTML += /*html*/ `
        <div class="pokemon-mini-card" id="colors${i}" onclick="pokemonOnclick(${i})">
            <div>
            <h5>${
              pokemon[i].name.charAt(0).toUpperCase() + pokemon[i].name.slice(1)
            }</h5>
            </div>
            <div class="pokemon-mini-card-inner">
                <span>
                #${pokemon[i].id}
                <br>
                ${pokemon[i].types[0].type.name}
                </span>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                  i + 1
                }.png"></img>
            </div>
        </div>
        
    `;
  for (let j = 0; j < colors.length; j++) {
    const paint = colors[j];
    
    if (pokemon[i].types[0].type.name === paint.type) {
        document.getElementById(`colors${i}`).style.background = paint.background;
    } 
    }
}


async function pokemonOnclick(i) {
  document.getElementById("nextPokemon").style.display = "none";
  document.getElementById("footer").style.display = "none";
  await playSound(i);
  await openImage(i);
}

function openImage(i) {
  document.getElementById("pokedex").style.display = "none";
  document.getElementById("initArea").innerHTML = /*html*/ `
      <div id="pokemon-container-center" class="card " style="width: 30rem">
        <div class="info-card-img">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
            i + 1
          }.png" class="card-img-top" alt="..." />
          </div>
          <div class="card-body-name">
              <br>
              <h1 class="card-text-name">${
                pokemon[i].name.charAt(0).toUpperCase() +
                pokemon[i].name.slice(1)
              }</h1>
              <p class="card-text-type ">
              #${pokemon[i].id} ${pokemon[i].types[0].type.name}
              </p>
          </div>
          <div class="card-body-chart">
              <canvas id="myChart"></canvas>
          </div>
          <div class="card-body-footer">
              <a href="javascript:nachLinks(${i})" class="card-link"><</a>
              <a href="javascript:nachRechts(${i})" class="card-link">></a>
          </div>
      </div>`;
  chart(i);
}

function closeImg() {
  document.getElementById("initArea").innerHTML = ``;
  document.getElementById("pokedex").style.display = "inline";
}

function nachLinks(i) {
  if (i === 0) {
    i = selectedPokemon;
  }
  openImage(i - 1);
}

function nachRechts(i) {
  console.log(i)
  console.log(selectedPokemon)
  if (i === selectedPokemon - 1) {
    i = -1;
  }
  openImage(i + 1);
}

function chart(i) {
  if (!pokemon[i]) {
    console.error("Pokémon-Daten sind noch nicht vollständig geladen.");
    return;
  }

  const ctx = document.getElementById("myChart");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        pokemon[i].stats[0].stat.name,
        pokemon[i].stats[1].stat.name,
        pokemon[i].stats[2].stat.name,
        pokemon[i].stats[3].stat.name,
        pokemon[i].stats[4].stat.name,
        pokemon[i].stats[5].stat.name,
      ],
      datasets: [
        {
          label: "Pokemon Stats",
          data: [
            pokemon[i].stats[0].base_stat,
            pokemon[i].stats[1].base_stat,
            pokemon[i].stats[2].base_stat,
            pokemon[i].stats[3].base_stat,
            pokemon[i].stats[4].base_stat,
            pokemon[i].stats[5].base_stat,
          ],
          fill: false,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 13,
        },
      ],
    },
    options: {
      indexAxis: "x", // corrected
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}


function playSound(i) {
  let AUDIO_VOICE = new Audio(
    `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${
      i + 1
    }.ogg`
  );
  AUDIO_VOICE.play();
}


function searchPokemon() {
  const inputPokemon = document.getElementById('search').value.toLowerCase();
  const searchResults = [];
  console.log(searchResults)

  if (inputPokemon.length >= 3) {
    for (let i = 0; i < allPokemon.length; i++) {
      const pokemonName = allPokemon[i].name.toLowerCase();
      console.log(pokemonName)
      
      if (pokemonName.includes(inputPokemon)) {
        searchResults.push(allPokemon[i]);
        console.log(searchResults)
      }
    }
  } else {
    searchResults.push(...pokemon);
  }
  
  displaySearchResults(searchResults);
}

function displaySearchResults(results) {
  const pokedexContainer = document.getElementById("pokedex");
  pokedexContainer.innerHTML = ""; // Clear previous search results
  
  for (let i = 0; i < results.length; i++) {
    const pokemonData = results[i];
    const pokemonID = allPokemon.findIndex(pokemon => pokemon.id === pokemonData.id);
    const pokemonName = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
    const pokemonNumber = pokemonData.id;
    const pokemonType = pokemonData.types[0].type.name;
    const pokemonImageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonNumber}.png`;
    
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-mini-card");
    pokemonCard.innerHTML = `
      <div id="colors${i}" onclick="pokemonOnclick(${pokemonID})">
        <div>
          <h5>${pokemonName}</h5>
        </div>
        <div class="pokemon-mini-card-inner">
          <span>
            #${pokemonNumber}<br>
            ${pokemonType}
          </span>
          <img src="${pokemonImageURL}" alt="${pokemonName}" />
        </div>
      </div>`;
    
    for (let j = 0; j < colors.length; j++) {
      const paint = colors[j];
      if (pokemonType === paint.type) {
        pokemonCard.style.background = paint.background;
        break;
      }
    }
    
    pokedexContainer.appendChild(pokemonCard);
  }
}



