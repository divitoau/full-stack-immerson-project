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
for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 10) {
        document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow, that's big!<br>`)
    } else {
        document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height})<br>`)
    }
}