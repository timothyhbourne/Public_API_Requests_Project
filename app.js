//Fetch API Function consolidation
function fetchData(url) {
    return fetch(url)
            .then(checkStatus)
            .then(res => res.json())
            .catch(error => console.log('Looks like there was a problem', error));
}

//Function to check response status of API
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

//Function for fetching API & running all the functions
fetchData('https://randomuser.me/api/?results=12&nat=us')
    .then(data => {
        const users = data.results
        createGallery(users)
        createSearch()
        searchFunctionality()
        cardsHandler(users)
        modalMarkup()
        browseModal(users)
    });

//Global Variables
const galleryContainer = document.querySelector('#gallery');  
const modalDiv = document.createElement('div');
const body = document.querySelector('body');

//Function to show the initialized gallery of employees
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
        galleryContainer.insertAdjacentHTML('beforeend', galleryHTML);
    })
}

//Function to append search-bar into HTML body
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

//Function to add functionality to the searchbar
function searchFunctionality() {
    const input = document.querySelector('#search-input');
    const names = document.querySelectorAll('#name');

    names.forEach(name => {
        const cardDiv = name.parentElement.parentElement;
        const cards = document.querySelectorAll('.card')

        input.addEventListener('keyup', (e) => {
            let inputValue = e.target.value.toLowerCase();
            
            if (name.textContent.toLowerCase().includes(inputValue)) {
                cardDiv.style.display = '';
            } else {
                cardDiv.style.display = 'none';
            }
        })
    })
}

//Function to handle the click on the cards
function cardsHandler(data) {
    const cards = document.querySelectorAll('.card');

    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', (e) => {
            document.querySelector('.modal-container').style.display = 'block';
            updateModal(data[i]);
        })
    }
}

//Function for modal markup + modal closes if user clicks outside of modal
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
    
    const modalContainer = document.querySelector('.modal-container');
    const modalCloseBtn = document.querySelector('#modal-close-btn');
    
    modalContainer.style.display = 'none';
    
    modalCloseBtn.addEventListener('click', () => {
        modalContainer.style.display = 'none';
        document.querySelector('.modal-info-container').remove();
    });

    document.addEventListener('click', (e) => { 
        if (e.target.className === 'modal-container') {
        modalContainer.style.display = 'none';
        document.querySelector('.modal-info-container').remove();
        }
    })
}

//Function to browse through the modal using the Next & Prev button
function browseModal(data, index) {
    const modalNext = document.querySelector('#modal-next');
    const modalPrev = document.querySelector('#modal-prev');
    const cards = document.querySelectorAll('.card')
    const modal = document.querySelector('.modal');
    
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', () => {
            index = data.indexOf(data[i]);
        })
    }

    modalNext.addEventListener('click', () => {
        index++;
        if (index >= data.length) {
            index = -1;
        } else if (index <= data.length) {
            console.log(index);
            modal.firstElementChild.remove();
            updateModal(data[index]);
        }
    })

    modalPrev.addEventListener('click', () => {
        index--;
        if (index <= -1) {
            index = -1;
        } else if (index <= data.length) {
            console.log(index);
            modal.firstElementChild.remove();
            updateModal(data[index]);
        }
    })
}

//Function to update modal data
function updateModal(data) {
    const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
    const dob = `${data.dob.date.substring(0,10)}`;
    
    const addData = `
            <div class="modal-info-container">
                <img class="modal-img" src="${data.picture.large}" alt="${data.name.first} ${data.name.last}">
                <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
                <p class="modal-text">${data.email}</p>
                <p class="modal-text cap">${data.location.city}</p>
                <hr>
                <p class="modal-text">${data.cell}</p>
                <p class="modal-text">${data.location.state}, ${data.location.city}, ${data.location.country} ${data.location.postcode}</p>
                <p class="modal-text">Birthday: ${dob.replace(regex, `$3-$2-$1`)}</p>
            </div>
        `    
    const modalContainer = document.querySelector('.modal');
    modalContainer.insertAdjacentHTML('afterbegin', addData);
}