document.addEventListener("DOMContentLoaded", () => {
    const petList = document.getElementById("pet-list");
    const favoriteList = document.getElementById("favorite-list");
    const searchBar = document.getElementById("searchBar");
    const popup = document.getElementById("popup");

    let pets = [];
    let favorites = [];

    // Fetch pets from API or db.json
    fetch("http://localhost:3000/pets")
        .then(res => res.json())
        .then(data => {
            pets = data;
            displayPets(pets);
        });

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
                <button onclick="addToFavorites(${pet.id})">❤️ Favorite</button>
            `;
            petList.appendChild(petCard);
        });
    }

    window.addToFavorites = (id) => {
        const pet = pets.find(p => p.id === id);
        if (!favorites.includes(pet)) {
            favorites.push(pet);
            showPopup(`${pet.name} added to favorites!`);
            displayFavorites();
        }
    };

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
                <button class="remove" onclick="removeFromFavorites(${pet.id})">❌ Remove</button>
            `;
            favoriteList.appendChild(favCard);
        });
    }

    window.removeFromFavorites = (id) => {
        favorites = favorites.filter(p => p.id !== id);
        showPopup("Removed from favorites.");
        displayFavorites();
    };

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
