document.addEventListener("DOMContentLoaded", () => {
    const petList = document.getElementById("pet-list");
    const favoriteList = document.getElementById("favorite-list");
    const searchBar = document.getElementById("searchBar");
    const popup = document.getElementById("popup");

    let pets = [];
    let favorites = [];
    fetch("http://localhost:3000/pets")
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        pets = data;
        displayPets(pets);
    })
    .catch(error => console.error("Error fetching pets:", error));

    function displayPets(petsArray) {
        petList.innerHTML = "";
        petsArray.forEach(pet => {
            const petCard = document.createElement("div");
            petCard.className = "pet-card";
            petCard.innerHTML = `
                <img src="${pet.image}" alt="${pet.name}">
                <h3>${pet.name}</h3>
                <p>Breed: ${pet.breed}</p>
                <p>Age: ${pet.age}</p>
            `;

            const favButton = document.createElement("button");
            favButton.textContent = "❤️ Favorite";
            favButton.addEventListener("click", () => addToFavorites(pet));

            petCard.appendChild(favButton);
            petList.appendChild(petCard);
        });
    }


function addToFavorites(pet) {
        if (!favorites.some(fav => fav.id === pet.id)) {
            favorites.push(pet);
            showPopup(`${pet.name} added to favorites!`);
            displayFavorites();
        }
    }
    function displayFavorites() {
        favoriteList.innerHTML = "";
        favorites.forEach(pet => {
            const favCard = document.createElement("div");
            favCard.className = "pet-card";
            favCard.innerHTML = `
                <img src="${pet.image}" alt="${pet.name}">
                <h3>${pet.name}</h3>
                <p>Breed: ${pet.breed}</p>
                <p>Age: ${pet.age}</p>
            `;
            const removeButton = document.createElement("button");
            removeButton.classList.add("remove");
            removeButton.textContent = "❌ Remove";
            removeButton.addEventListener("click", () => removeFromFavorites(pet.id));

            favCard.appendChild(removeButton);
            favoriteList.appendChild(favCard);
        });
    }
    function removeFromFavorites(id) {
        favorites = favorites.filter(p => p.id !== id);
        showPopup("Removed from favorites.");
        displayFavorites();
    }
    searchBar.addEventListener("input", (e) => {
        const searchText = e.target.value.toLowerCase();
        const filteredPets = pets.filter(pet => pet.breed.toLowerCase().includes(searchText));
        displayPets(filteredPets);
    });
    function showPopup(message) {
        popup.textContent = message;
        popup.classList.remove("hidden");
        setTimeout(() => popup.classList.add("hidden"), 2000);
    }
});

