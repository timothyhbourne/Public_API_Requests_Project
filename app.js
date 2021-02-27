function fetchData(url) {
    return fetch(url)
            .then(checkStatus)
            .then(res => res.json())
            .catch(error => console.log('Looks like there was a problem', error));
}

fetchData('https://randomuser.me/api/?results=1&nat=us')
    .then(data => {
        const users = data.results
        createGallery(users)
        createSearch()
        cardsHandler(users)
        modalMarkup()
        searchFunctionality()
    });

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

//Global Variables
const galleryContainer = document.querySelector('#gallery');  
const modalDiv = document.createElement('div')
const body = document.querySelector('body');

function modalMarkup() {
    const markup =  `
    <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            </div>

            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
    </div>`
    galleryContainer.insertAdjacentHTML('afterend', markup);
    const modalContainer = document.querySelector('.modal-container')
    const modalCloseBtn = document.querySelector('#modal-close-btn')
    modalContainer.style.display = 'none'
    modalCloseBtn.addEventListener('click', () => {
        modalContainer.style.display = 'none';
        document.querySelector('.modal-info-container').remove();
    } );
}

function updateModal(data) {
    const addData = `
            <div class="modal-info-container">
                <img class="modal-img" src="${data.picture.large}" alt="${data.name.first} ${data.name.last}">
                <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
                <p class="modal-text">${data.email}</p>
                <p class="modal-text cap">${data.location.city}</p>
                <hr>
                <p class="modal-text">${data.cell}</p>
                <p class="modal-text">${data.location.state}, ${data.location.city}, ${data.location.country} ${data.location.postcode}</p>
                <p class="modal-text">Birthday: ${data.dob.date}</p>
            </div>
        `    
    const modalContainer = document.querySelector('.modal')
    modalContainer.insertAdjacentHTML('afterbegin', addData)
}

function cardsHandler(data) {
    const cards = document.querySelectorAll('.card')

    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', () => {
            document.querySelector('.modal-container').style.display = 'block'
            updateModal(data[i])
            
        })
    }
}

// Search Container
function createSearch() {
    const searchContainer = document.querySelector('.search-container');
    const searchHTML = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
    `;
    searchContainer.insertAdjacentHTML("beforeend", searchHTML);
}

// Gallery Function
function createGallery(data) {
    data.forEach(user => { 
        const galleryHTML = `
        <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${user.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
            <p class="card-text">${user.email}</p>
            <p class="card-text cap">${user.location.city}</p>
        </div>
        </div>
        `
        galleryContainer.insertAdjacentHTML('beforeend', galleryHTML)
    })
}

// function searchFunctionality(data) {
//     const searchInput = document.querySelector('#search-input');
//     const cards = document.querySelectorAll('.card')

//     // searchInput.addEventListener('keyup', (e) => {
//     //     for (let i = 0; i < cards.length; i++) {
//     //         if (cards[i].children[1].children[0].innerHTML.includes(e.key)) {
//     //             console.log('there is a match');
//     //         } else {
//     //             console.log('there is no match');
//     //         }
//     //     }
//     // })
// }
const searchInput = document.querySelector('#search-input');

function searchedEmployee(data) {
    const searchMatch = [];

    for (let i = 0; i < data.length; i++) {
        let fullName = `${user[i].name.first.toLowerCase()} ${user[i].name.first.toLowerCase()}`

        if (fullName.includes(searchInput.value.toLowerCase())) {
            searchMatch.push(data[i])
        }
    }
    return searchMatch;
    
}

