document.addEventListener("DOMContentLoaded", () => {
    const petList = document.getElementById("pet-list");
    const favoriteList = document.getElementById("favorite-list");
    const searchBar = document.getElementById("searchBar");
    const popup = document.getElementById("popup");

    let pets = [];
    let favorites = [];


    fetch("/db.json")
        .then(res => {
            if (!res.ok) throw new Error("Failed to fetch pets");
            return res.json();
        })
        .then(data => {
            pets = data.pets;  
            displayPets(pets);
        })
        .catch(err => console.error("Error fetching pets:", err));

    function displayPets(petsArray) {
        petList.innerHTML = "";
        petsArray.forEach(pet => {
            const petCard = document.createElement("div");
            petCard.className = "pet-card";
            petCard.setAttribute("data-id", pet.id);
            petCard.innerHTML = `
                <img src="${pet.image}" alt="${pet.name}">
                <h3>${pet.name}</h3>
                <p>Breed: ${pet.breed}</p>
                <p>Age: ${pet.age}</p>
            `;

            const favButton = document.createElement("button");
            favButton.textContent = "❤️ Favorite";
            favButton.addEventListener("click", () => addToFavorites(pet));

            const adoptButton = document.createElement("button");
            adoptButton.textContent = pet.adopted ? "Adopted" : "Adopt Me";
            adoptButton.classList.add("adopt-button");
            adoptButton.disabled = pet.adopted;
            adoptButton.addEventListener("click", () => adoptPet(pet, adoptButton));

            petCard.appendChild(favButton);
            petCard.appendChild(adoptButton);
            petList.appendChild(petCard);
        });
    }

    function adoptPet(pet, button) {
        console.log(`Attempting to adopt pet ID: ${pet.id}`);
        fetch(`/db.json`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ adopted: true }),
        })
            .then(res => {
                console.log(`Response status: ${res.status}`);
                if (!res.ok) {
                    return res.text().then(text => {
                        throw new Error(`Failed to adopt pet. Status: ${res.status}, Response: ${text}`);
                    });
                }
                return res.json();
            })
            .then(updatedPet => {
                console.log("Pet adopted successfully:", updatedPet);
                pet.adopted = true;
                button.textContent = "Adopted";
                button.disabled = true;
                showPopup(`${pet.name} has been adopted!`);
                displayPets(pets);
            })
            .catch(err => {
                console.error("Error adopting pet:", err);
                showPopup("Failed to adopt pet. Try again.");
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
