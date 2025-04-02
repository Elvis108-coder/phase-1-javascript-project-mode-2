Pet Adoption Web App/
Overview
A Single Page Application (SPA) that allows users to browse available pets, search by breed, and manage favorites. Built with JavaScript, HTML, and CSS, and fetches data from a local JSON server.

Features
Fetches pet data from a local API (db.json).

Displays pet cards with images, names, breeds, and ages.

Allows users to add and remove pets from favorites.

Search bar to filter pets by breed.

Pop-up notifications for actions.

Animations for improved UI.

Setup Instructions
Clone the repository:

git clone https://github.com/your-username/pet-adoption-app.git
cd pet-adoption-app
Install and run JSON Server:


npm install -g json-server
json-server --watch db.json
JSON server runs at http://localhost:3000.

Open index.html in your browser.

Main Functionalities
Fetching and Displaying Pets


fetch("http://localhost:3000/pets")
  .then(res => res.json())
  .then(data => displayPets(data));
Adding to Favorites

function addToFavorites(pet) {
    if (!favorites.some(fav => fav.id === pet.id)) {
        favorites.push(pet);
        showPopup(`${pet.name} added to favorites!`);
        displayFavorites();
    }
}
Removing from Favorites

function removeFromFavorites(id) {
    favorites = favorites.filter(pet => pet.id !== id);
    showPopup("Removed from favorites.");
    displayFavorites();
}
Search Functionality

searchBar.addEventListener("input", (e) => {
    const filteredPets = pets.filter(pet => pet.breed.toLowerCase().includes(e.target.value.toLowerCase()));
    displayPets(filteredPets);
});
Key Event Listeners
Click – Add/remove favorites.

Input – Filter pets by search bar.

Double Click – Remove from favorites.

Mouseover – Highlight pet cards.

Deployed Project
View the live demo here:https://sparkling-marigold-73e09c.netlify.app/

Author
Name: Elvis Rotich

Email: biggeelvo831@gmail.com

GitHub: Elvis108-coder