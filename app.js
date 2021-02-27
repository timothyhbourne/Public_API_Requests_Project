function fetchData(url) {
    return fetch(url)
            .then(checkStatus)
            .then(res => res.json())
            .catch(error => console.log('Looks like there was a problem', error));
}

fetchData('https://randomuser.me/api/?results=7')
    .then(data => {
        const users = data.results
        createGallery(users)
        modalMarkup()
        createSearch()
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
const modalContainer = document.querySelector('.modal-container')
const modalCloseBtn = document.querySelector('#modal-close-btn')    
console.log(modalContainer);
const cards = document.querySelectorAll('.card')
const modalDiv = document.createElement('div')
const body = document.querySelector('body');

// Create a function that uses example markup to create a template literal for all the parts of the modal that never change, which is everything except what's inside the "modal-info-container" div
  // Use insertAdjacentHTML method with 'aftereend' option to append modal constants to the gallery
  // Target the modal container and hide it with the style.dsiplay property
  // Target the modal close btn and give it a click handler that also hides the modal container
function modalMarkup() {

    const markup =  `
    <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">

                </div>
            </div>

            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>`
    galleryContainer.insertAdjacentHTML('afterend', markup);
    // modalContainer.style.display = 'none';
    modalCloseBtn.addEventListener('click', () => modalContainer.style.display = 'none')
}


// Create update modal function that accepts one parameter, which will be an employee object
  // Target the "modal-info-container" div and set its inner HTML to an empty string, ''
  // Use example markup and interpolated template literals with the info in the parameter to add the unique parts of the modal
  // Target the "modal-info-container" div and use insertAdjacentHTML method with 'afterbegin' option to append unique modal info

  // function updateModal(data) {
//     const modalInfoContainer = document.querySelector('.modal-info-container');
//     modalInfoContainer.innerHTML = ''
//     const addData = `
//             <div class="modal-info-container">
//                 <img class="modal-img" src="${data.picture.large}" alt="${data.name.first} ${data.name.last}">
//                 <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
//                 <p class="modal-text">${data.email}</p>
//                 <p class="modal-text cap">${data.location.city}</p>
//                 <hr>
//                 <p class="modal-text">${data.cell}</p>
//                 <p class="modal-text">${data.location.state}, ${data.location.city}, ${data.location.country} ${data.location.postcode}</p>
//                 <p class="modal-text">Birthday: ${data.dob.date}</p>
//             </div>
//     `
//     modalInfoContainer.insertAdjacentHTML('afterbegin', addData)
// }

// Create function to add click handler to cards, which accepts one parameter, which will be array of results
  // Target all the cards and loop over them
    // Add click handler to each card
      // Target and display the modal container
      // Call the update modal function, passing in the object at the loop's current iteration

// function cardsHandler(data) {
//     for (let i = 0; i < cards.length; i++) {
//         cards[i].addEventListener('click', (e) => {
//             modalMarkup()
//             updateModal(data[i])
//         })
//     }
// }

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

