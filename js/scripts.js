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
            pokemonList.push(pokemon);
        }
        function getAll() {
            return pokemonList;
        }
    return {
        add,
        getAll
    }

})()

pokemonRepository.getAll().forEach(function (pokemon) {
    if (pokemon.height > 10) {
        document.write(`${pokemon.name} (height: ${pokemon.height}) - Wow, that's big!<br>`)
    } else {
        document.write(`${pokemon.name} (height: ${pokemon.height})<br>`)
    }
})