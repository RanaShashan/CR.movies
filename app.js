








// Select elements
const leftBtn = document.querySelector('.bi.bi-chevron-left');
const rightBtn = document.querySelector('.bi.bi-chevron-right');
const cardsContainer = document.querySelector('.cards');
const searchContainer = document.querySelector('.search');
const searchInput = document.getElementById('search_input');
const video = document.querySelector('video');
const playButton = document.getElementById('play');
const seriesButton = document.getElementById('series');
const moviesButton = document.getElementById('movies'); // New button for movies
const kidsButton = document.getElementById('kids'); // New button for kids
const homeButton = document.getElementById('home'); // New button for home

let movieData = [];

// Scroll functionality for cards
leftBtn.addEventListener('click', () => {
    cardsContainer.scrollLeft -= 140;
});
rightBtn.addEventListener('click', () => {
    cardsContainer.scrollLeft += 140;
});


// Load movies into the card container on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    fetch("movie.json")
        .then(response => response.json())
        .then(data => {
            movieData = data;
            displayMovies(movieData); // Display all movies by default
        })
        .catch(error => console.error("Error fetching movie data:", error));
});

// Function to display movies in cards container
function displayMovies(data) {
    cardsContainer.innerHTML = ""; // Clear previous cards
    data.forEach(movie => {
        const card = document.createElement("a");
        card.href = movie.url;
        card.className = "card";
        card.innerHTML = `
            <img src="${movie.sposter}" alt="${movie.name}" class="poster">
            <div class="rest_card">
                <img src="${movie.bposter}" alt="${movie.name}">
                <div class="cont">
                    <h4>${movie.name}</h4>
                    <div class="sup">
                        <p>${movie.genre}, ${movie.date}</p>
                        <h3><span>IMDB</span> <i class="bi bi-star-fill">${movie.imdb}</i></h3>
                    </div>
                </div>
            </div>`;
        cardsContainer.appendChild(card);
    });
    document.getElementById('title').movie.name = data[0].name;
    document.getElementById('trail1').movie.trailer = data[0].trailer;
    document.getElementById('gen').innerText = data[0].genre;
    document.getElementById('date').innerText = data[0].date;
    document.getElementById('rate').innerHTML = `<span> IMDB </span><i class="bi bi-star-fill">/i> ${data[0].imdb}`;

}

// Search functionality
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    if (query === "") {
        searchContainer.style.visibility = "hidden";
        searchContainer.style.opacity = 0;
        return;
    } else {
        searchContainer.style.visibility = "visible";
        searchContainer.style.opacity = 1;
    }

    const results = movieData.filter(movie =>
        movie.name.toLowerCase().includes(query) ||
        movie.genre.toLowerCase().includes(query) ||
        movie.type.toLowerCase().includes(query)
    );

    searchContainer.innerHTML = "";
    if (results.length > 0) {
        results.forEach(movie => {
            const card = document.createElement("a");
            card.className = "card";
            card.href = movie.url || "#";
            card.innerHTML = `
                <img src="${movie.sposter}" alt="${movie.name}">
                <div class="cont">
                    <h3>${movie.name}</h3>
                    <p>${movie.genre}, ${movie.date}, <span>IMDB</span> <i class="bi bi-star-fill">${movie.imdb}</i></p>
                </div>`;
            searchContainer.appendChild(card);
        });
    } else {
        const noResult = document.createElement("p");
        noResult.textContent = "No results found.";
        searchContainer.appendChild(noResult);
    }
});

// Video play/pause toggle
playButton.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playButton.innerHTML = `Pause <i class="bi bi-pause-fill"></i>`;
    } else {
        video.pause();
        playButton.innerHTML = `Play <i class="bi bi-play-fill"></i>`;
    }
});

// Update play button state if video is played or paused
video.addEventListener('play', () => {
    playButton.innerHTML = `Pause <i class="bi bi-pause-fill"></i>`;
});

video.addEventListener('pause', () => {
    playButton.innerHTML = `Play <i class="bi bi-play-fill"></i>`;
});

// Display series only when series button is clicked
seriesButton.addEventListener('click', () => {
    const seriesData = movieData.filter(movie => movie.type === "series");
    displayMovies(seriesData);
});


// Display movies only when movies button is clicked
moviesButton.addEventListener('click', () => {
    const moviesData = movieData.filter(movie => movie.type === "movie");
    displayMovies(moviesData);
});

// Display kids content only when kids button is clicked
kidsButton.addEventListener('click', () => {
    const kidsData = movieData.filter(movie => movie.type === "kids");
    displayMovies(kidsData);
});

homeButton.addEventListener('click', () => {
    window.location.href = 'index.html'; // Navigate to the home page
});










document.addEventListener("DOMContentLoaded", function() {
    const showPopupBtn = document.querySelector(".login-btn");
    const formPopup = document.querySelector(".form-popup");
    const hidePopupBtns = formPopup.querySelectorAll(".close-btn");
    const signupLoginLinks = formPopup.querySelectorAll(".bottom-link a");
    const signupForm = document.querySelector('.form-box.signup form');
    const loginForm = document.querySelector('.form-box.login form');

    // Show/Hide Popup
    if (showPopupBtn) {
        showPopupBtn.addEventListener("click", () => {
            document.body.classList.toggle("show-popup");
        });
    }

    hidePopupBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            document.body.classList.remove("show-popup");
        });
    });

    // Switch between Signup and Login forms
    signupLoginLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const isSignup = link.id === 'signup-link';
            formPopup.classList.toggle("show-signup", isSignup);
            formPopup.classList.toggle("show-login", !isSignup);
        });
    });

    // Handle Form Submission
    const handleFormSubmit = async (form, endpoint) => {
        const email = form.querySelector('input[name="email"]').value;
        const password = form.querySelector('input[name="password"]').value;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();
            if (result.success) {
                alert(`${form.classList.contains('signup') ? 'Signup' : 'Login'} successful!`);
                form.reset(); // Reset form fields
                document.body.classList.remove("show-popup");
            } else {
                alert(result.message || `${form.classList.contains('signup') ? 'Signup' : 'Login'} failed. Please try again.`);
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            alert("An error occurred. Please try again.");
        }
    };

    // Attach submit event listeners
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            handleFormSubmit(signupForm, '/save-signup-data');
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            handleFormSubmit(loginForm, '/save-login-data'); // Assuming a different endpoint for login
        });
    }
});


