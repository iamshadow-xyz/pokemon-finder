const pokemonContainer = document.getElementById('pokemonContainer');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('search');

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim().toLowerCase();
  if (query) {
    fetchPokemon(query);
  }
});

async function fetchPokemon(query) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (!response.ok) {
      pokemonContainer.innerHTML = `<p>Pokémon not found. Please try another name or ID.</p>`;
      return;
    }

    const data = await response.json();
    displayPokemon(data);
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
  }
}

function displayPokemon(pokemon) {
  pokemonContainer.innerHTML = `
        <div class="pokemon-card">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
            <h3>${capitalizeFirstLetter(pokemon.name)}</h3>
            <p>ID - ${pokemon.id}</p>
            <p>Type - ${pokemon.types
              .map((type) => type.type.name)
              .join(', ')}</p>
        </div>
    `;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
