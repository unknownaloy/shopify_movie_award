const apiKey = "78b512cf";

// Variable that holds the user's movie nominated choices
const nomineeList = [];


// This function runs when the webpage is loaded
// It checks if the user has made any previous nominations on their last visit,
// and if any, loads their previous choices on the webpage
onload = function() {

    if (localStorage.getItem("storedNominees")) {
        let storedData = JSON.parse(localStorage.getItem("storedNominees"));

        if (storedData !== null) {
            for (let i = 0; i < storedData.length; i++) {
                const nomineeHidden = document.getElementById("nomineeHidden");
                nomineeHidden.classList.remove("hidden");
                nomineeList.push(storedData[i]);
                appendNomineeToDom(storedData[i]);
            }
        }
    }
};


// Function to show a snackbar when the user has nominated up to 5 movies
function myFunction() {
    // Get the snackbar DIV
    let snackBar = document.getElementById("snackbar");

    // Add the "show" class to DIV
    snackBar.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function() { snackBar.className = snackBar.className.replace("show", ""); }, 3000);
}


document.addEventListener("click", event => {

    /// Event listener for the search result
    if (event.target.matches(".searchLI")) {
        const movieItem = event.target.value;
        if (!nomineeList.includes(movieItem) && nomineeList.length < 5) {
            const nomineeHidden = document.getElementById("nomineeHidden");
            nomineeHidden.classList.remove("hidden");

            if (localStorage.getItem("storedNominees")) {
                localStorage.removeItem("storedNominees");
            }

            nomineeList.push(movieItem);

            localStorage.setItem("storedNominees", JSON.stringify(nomineeList));

            appendNomineeToDom(movieItem);

            /// Disable search result button
            event.target.disabled = true;
        }

        if (nomineeList.length === 5) {
            myFunction();
        }
    }


    /// Event listener for the user nominees list
    if (event.target.matches(".nomineeLI")) {
        const movieItem = event.target.value;

        // Getting the index of the movie info from the nomineeList
        const index = nomineeList.indexOf(movieItem);

        if (index > -1) {
            if (localStorage.getItem("storedNominees")) {
                localStorage.removeItem("storedNominees");
            }

            // Removing the user nominated movie from the list
            nomineeList.splice(index, 1);

            localStorage.setItem("storedNominees", JSON.stringify(nomineeList));
        }

        if (nomineeList.length === 0) {
            const nomineeHidden = document.getElementById("nomineeHidden");
            nomineeHidden.classList.add("hidden");
        }

        // Removing the "li" element from the DOM
        event.target.parentNode.remove();

        const oldSearchResult = document.querySelectorAll(".searchResult button");

        if (oldSearchResult.length >= 1) {
            for (let i = 0; i < oldSearchResult.length; i++) {

                if (oldSearchResult[i].value === movieItem) {
                    oldSearchResult[i].disabled = false;
                    break;
                }
            }
        }
    }
});


// Method that submit the user's movie search query when the "enter" key is pressed
document.addEventListener("keypress", (event) => {
    if (event.keyCode === 13) {
        let searchQuery = document.getElementById("searchQuery").value;
        searchQuery = searchQuery.trim().toLowerCase();
        if (searchQuery.length !== 0 || searchQuery !== "") {
            console.log("Enter has been pressed", searchQuery);
            fetchMovieSearch(searchQuery);
        }
    }
});


// Function that appends "li" elements to the DOM when a user nominates a movie
const appendNomineeToDom = (nominee) => {
    const ul = document.querySelector(".nomineeList");
    const li = document.createElement("li");

    li.textContent = nominee;

    const button = document.createElement("button");
    button.innerHTML = "Remove";
    button.setAttribute("class", "btn btn-outline-secondary btn-sm nomineeLI");
    button.setAttribute("value", nominee);

    li.append(button);

    ul.appendChild(li);
};


// Function for creating "li" and a child "button" element
const createLi = (movie) => {
    const li = document.createElement('li');

    const movieChunk = `${movie["Title"]} (${movie["Year"]})`;
    li.textContent = movieChunk;

    const button = document.createElement("button");

    if (nomineeList.includes(movieChunk)) {
        button.disabled = true;
    }

    button.innerHTML = "Nominate";
    button.setAttribute("class", "btn btn-outline-secondary btn-sm searchLI");
    button.setAttribute("value", movieChunk);

    li.append(button);
    return li;
};


// Function that appends "li" elements to the DOM from search results optioned
// NOTE: This function utilizes the [createLi] function
const appendToDOM = (movies) => {

    const searchHidden = document.getElementById("searchHidden");
    searchHidden.classList.remove("hidden");

    let searchQuery = document.getElementById("searchQuery").value;
    const ul = document.querySelector('.searchResult');
    const resultFor = document.querySelector(".resultFor");
    resultFor.append(`Results for "${searchQuery}"`);

    //iterate over all the movies result
    movies.map(movie => {
        ul.appendChild(createLi(movie));
    });
};


// This function removes the previous search result "li" elements if any
const resetPreviousData = () => {
    const prevUL = document.querySelector(".searchResult");

    const prevLi = document.querySelectorAll(".searchResult li");

    const resultFor = document.querySelector(".resultFor");
    resultFor.innerText = "";

    /// Clearing previous movie search results if any
    if (prevLi.length > 0) {
        for (let i = 0; i < prevLi.length; i++) {
            prevUL.removeChild(prevLi[i]);
        }
    }
};


const fetchMovieSearch = (movieTitle) => {
    axios.get(`https://www.omdbapi.com/?s=${movieTitle}&apikey=${apiKey}`)
        .then(response => {

            if (response.status === 200) {

                if (response.data["Response"] === "True") {
                    resetPreviousData();

                    const searchResult = response.data.Search;

                    appendToDOM(searchResult);

                } else {

                    /// No search result was found
                    resetPreviousData();

                    const errorMessage = response.data["Error"];

                    const searchHidden = document.getElementById("searchHidden");
                    searchHidden.classList.remove("hidden");

                    const resultFor = document.querySelector(".resultFor");
                    resultFor.append(errorMessage);
                }

            }
        })
        .catch(error => console.error(error));
};