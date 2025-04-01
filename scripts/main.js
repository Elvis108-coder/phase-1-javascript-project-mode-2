document.addEventListener("DOMContentLoaded", () => {
    const petList = document.getElementById("pet-list");
    const favoriteList = document.getElementById("favorite-list");
    const searchBar = document.getElementById("searchBar");
    const popup = document.getElementById("popup");

    let pets = [];
    let favorites = [];fetch("http://localhost:3000/pets")
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
            `;

            const favButton = document.createElement("button");
            favButton.textContent = "❤️ Favorite";
            favButton.addEventListener("click", () => addToFavorites(pet));

            petCard.appendChild(favButton);
            petList.appendChild(petCard);
        });
    }

