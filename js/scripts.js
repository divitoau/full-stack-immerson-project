let pokemonRepository = (function () {
    let pokemonList = [];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (typeof pokemon === 'object') {
            pokemonList.push(pokemon);
        }
    }
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }
    function capitalizeName(name) {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }
    function addListItem(pokemon) {
        let container = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        listItem.classList.add('list-group-item');
        button.innerText = capitalizeName(pokemon.name);
        button.classList.add('btn');
        button.setAttribute('data-target', '#exampleModalCenter');
        button.setAttribute('data-toggle', 'modal')
        button.setAttribute('name', 'button')
        listItem.appendChild(button);
        container.appendChild(listItem);
        button.addEventListener('click', function () {
            showModal(pokemon)
        });
    }
    function getAll() {
        return pokemonList;
    }
    function showModal(item) {
        loadDetails(item).then(function () {
            let modalBody = $('.modal-body');
            let modalTitle = $('.modal-title');
            modalTitle.empty();
            modalBody.empty();
            let nameElement = $('<h1>' + capitalizeName(item.name) + '</h1>');
            let imageElement = $('<img class="modal-image" style="width:50%">');
            imageElement.attr('src', item.imageUrl);
            let heightElement = $('<p> Height: ' + item.height + '</p>');
 //           let typesElement = $('<p> Types:' + item.types[0] + '</p>');
            modalTitle.append(nameElement);
            modalBody.append(imageElement);
            modalBody.append(heightElement);
 //           modalBody.append(typesElement);
            console.log(typesElement)
        });
    }
    return {
        getAll,
        loadList,
        addListItem,
        loadDetails,
    };

})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    })
})