let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: 'Oddish',
            height: .5,
            types: ['grass', 'poison']
        },
        {
            name: 'Steelix',
            height: 9.2,
            types: ['steel', 'ground']
        },
        {
            name: 'Wailord',
            height: 14.5,
            types: ['water']
        },
        {
            name: 'Regice',
            height: 1.8,
            types: ['ice']
        }
    ]
    function add(pokemon) {
        if (typeof pokemon === 'object') {
            pokemonList.push(pokemon);
        }
    }
    function getAll() {
        return pokemonList;
    }
    function addListItem(pokemon) {
        let container = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokedex_button');
        listItem.appendChild(button);
        container.appendChild(listItem);
    }
    return {
        add,
        getAll,
        addListItem
    }

})()

pokemonRepository.add({
    name: 'Gurdurr',
    height: 1.2,
    types: ['fighting']
})

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);

})