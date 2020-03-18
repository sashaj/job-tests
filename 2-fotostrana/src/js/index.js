import 'unfetch/polyfill'

document.addEventListener("DOMContentLoaded", function (event) {
    const itemsWrapper = document.querySelector('.items__wrapper');
    const tos = document.getElementById('tos');
    const pixabayApiKey = '14156044-2b68e3bb0af34132fe2da85b8';
    const showMore = document.querySelector('.show-more');
    const swapiUrl = 'https://swapi.co/api/films';
    const input = document.querySelector(".search__input");
    const modal = document.querySelector('.modal__loader');

    function sendFetchRequest() {
        fetch(swapiUrl)
            .then(response => response.json())
            .then(data => {
                //for printing 9 items
                if (data.results.length === 7) {
                    data.results.push(data.results[0], data.results[1]);
                }
                imageRequest(data);
            }).catch((error) => {
                itemsWrapper.innerHTML = "Ничего не найдено, попробуйте перезагрузить страницу";
                modal.classList.add('display-none');
                showMore.classList.add('display-none');
                throw new Error(error);
            });
    }
    sendFetchRequest();

    function imageRequest(data) {
        for (let i = 0; i < data.results.length; i++) {
            const pixabayUrl = `https://pixabay.com/api/?key=${pixabayApiKey}&q=${data.results[i].title}&image_type=all`;
            fetch(pixabayUrl)
                .then(response => response.json())
                .then(json => {
                    printTemplate(data, json, i);
                })
                .catch(error => {
                    throw new Error(error);
                });
        }
    }

    function printTemplate(data, img, i) {
        const itemTemplate =
            `<div href="#" class="item__wrapper">
                    <div class="item__img" > <img src="${img.hits[0] ? img.hits[0].webformatURL : 'http://placehold.it/260x85?text=Placeholder'}"></div>
                    <div class="item__desc">
                        <a class="item__name" href="#">${data.results[i].title}</a>
                        <p class="item__director">${data.results[i].director}</p>
                    </div>
                </div>`
        itemsWrapper.insertAdjacentHTML('beforeend', itemTemplate);
        modal.classList.add('display-none');
    }

    function search() {
        const filter = input.value.toUpperCase();
        const items = document.querySelectorAll('.item__wrapper');
        const itemTitle = document.querySelectorAll('.item__name');
        for (let i = 0; i < items.length; i++) {
            let txtValue = itemTitle[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                items[i].style.display = "";
            } else {
                items[i].style.display = "none";
            }
        }
    }

    showMore.addEventListener('click', () => {
        sendFetchRequest();
        modal.classList.remove('display-none')
    });

    input.addEventListener('keyup', () => {
        search();
        if (input.value == "") {
            showMore.classList.remove('display-none');
            console.log(input.value);
        } else {
            showMore.classList.add('display-none');
        }
    });

    //webp polyfill
    const webpMachine = new webpHero.WebpMachine()
    webpMachine.polyfillDocument()
});