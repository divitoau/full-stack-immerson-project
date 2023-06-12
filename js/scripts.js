let pokemonRepository = (function () {
    let pokemonList = [];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (typeof pokemon === 'object') {
            pokemonList.push(pokemon);
        }
    }
    function getAll() {
        return pokemonList;
    }
    function capitalizeName(name) {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }

    function addListItem(pokemon) {
        let container = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = capitalizeName (pokemon.name);
        button.classList.add('pokedex_button');
        button.addEventListener('click', function () {
            showDetails(pokemon)
        });
        listItem.appendChild(button);
        container.appendChild(listItem);
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

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            modalDisplayProcedure.showModal(capitalizeName(pokemon.name), pokemon.height, pokemon.imageUrl);
        });
    }

    return {
        add,
        getAll,
        loadList,
        addListItem,
        showDetails,
        loadDetails
    };

})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    })
})

let modalDisplayProcedure = (function () {
    let modalContainer = document.querySelector('#modal-container');
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';

    function showModal(name, height, imageUrl) {
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');
        let nameElement = document.createElement('h1');
        nameElement.innerText = name;
        let heightElement = document.createElement('p');
        heightElement.innerText = 'Height: ' + height;
        let imageElement = document.createElement('img');
        imageElement.src = imageUrl;

        modal.appendChild(closeButtonElement);
        modal.appendChild(nameElement);
        modal.appendChild(heightElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    closeButtonElement.addEventListener('click', hideModal);
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    })
    return {
        showModal,
        hideModal
    }
}())