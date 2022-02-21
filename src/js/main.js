const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
const searchInput = document.getElementById('search');
const searchForm = document.querySelector('.search-form');
const suggestions = document.querySelector('.suggestions');


if (window.fetch){
    //exécuter ma requête fetch ici
    fetch(endpoint)
        .then(response => {
            if(response.status === 200){
                response.json().then(responseJSON => {
                        cities.push(...responseJSON); //on pourrait écrire cities = responseJSON mais le tableau sera un peu différent
                    }
                );
            } else{
                console.error(`Oups ${response.status}`);
            }
        }).catch(error=> {
        console.error(`Aie ${error}`);
    })
} else {
    //faire quelque chose avec XMLHttpRequest
}

function numberWithSpace(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function findMatches(wordToMatch){
     return cities.filter(place =>{
        const regex = new RegExp(wordToMatch,'gi');
        return place.city.match(regex) || place.state.match(regex);
    }); //permet de filtrer et de retourner une copie de se tableau selon les filtres
}

function displayMatches(wordToMatch){
    suggestions.innertHTML = findMatches(wordToMatch).map(item => {
        const regex = new RegExp (wordToMatch, 'gi');
        return ` <li>
        <span class="name">${item.city.replace(regex, `<span class="hl">${wordToMatch}</span>`)}, ${item.state.replace(regex, `<span class="hl">${wordToMatch}</span>`)}</span>
        <span class="population">${numberWithSpace(item.population)}</span></li>`;
    }).join('');
}

searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
});

searchInput.addEventListener('keyup', (e)=>{
    displayMatches(e.currentTarget.value);
});

