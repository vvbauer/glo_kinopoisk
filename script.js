const searchForm = document.querySelector('#search-form');
const movies = document.querySelector('#movies');
const apiKey = '7b92f89a675907275bd5ba2b59d56146';

const apiSearch = (event) => {
    event.preventDefault();
    const searchText = document.querySelector('#search-text').value;
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=ru&query=${searchText}`;
    requestApi(url);
};

const requestApi = (url) => {
    const req = new XMLHttpRequest();
    req.open('GET', url);
    req.send();

    req.addEventListener('readystatechange', () => {
        if (req.readyState !== 4) return;
        if (req.status !== 200) {
            console.log('error: ' + req.status);
            return;
        };

        const resultData = JSON.parse(req.responseText);
        let inner = '';

        const arr = resultData.results;
        arr.forEach(element => {
            mName = element.name || element.title;
            inner += `<div class="col-12">${mName}</div>`;
        });
        movies.innerHTML = inner;
        console.log(resultData.results);
    });
};

searchForm.addEventListener('submit', apiSearch);