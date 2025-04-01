#Pet Adoption Web App#
#Overview
This is a Single Page Application (SPA) that allows users to browse available pets, search by breed, add pets to their favorites, and remove them. The app is built using JavaScript, HTML, and CSS and fetches data from a local JSON server.

#Features
✅ Fetches pet data from a local API (db.json).
✅ Displays pet cards with images, names, breeds, and ages.
✅ Allows users to favorite and remove pets.
✅ Includes a search bar for filtering pets by breed.
✅ Shows pop-up notifications for actions.
✅ Uses animations for a better UI experience.

#Setup Instructions
Clone the repository:

sh
Copy
Edit
git clone https://github.com/your-username/pet-adoption-app.git
cd pet-adoption-app
Install and run JSON Server:

sh
Copy
Edit
npm install -g json-server
json-server --watch db.json
JSON server runs at http://localhost:3000.

Open index.html in your browser.

#Main Functionalities
>Fetching and Displaying Pets
>javascript
>Copy
>Edit
fetch("http://localhost:3000/pets")
  .then(res => res.json())
  .then(data => displayPets(data));
>>Adding to Favorites
javascript
Copy
Edit
>>function addToFavorites(pet) {
    if (!favorites.some(fav => fav.id === pet.id)) {
        favorites.push(pet);
        showPopup(`${pet.name} added to favorites!`);
        displayFavorites();
    }
}
>>Removing from Favorites
javascript
Copy
Edit
>>function removeFromFavorites(id) {
    favorites = favorites.filter(pet => pet.id !== id);
    showPopup("Removed from favorites.");
    displayFavorites();
}
>>Search Functionality
javascript
Copy
Edit
>>searchBar.addEventListener("input", (e) => {
    const filteredPets = pets.filter(pet => pet.breed.toLowerCase().includes(e.target.value.toLowerCase()));
    displayPets(filteredPets);
});
>>Key Event Listeners
Click – Add/remove favorites.

Input – Filter pets using the search bar.

Double Click – Remove a pet from favorites.

>>Mouseover – Highlight pet cards.

&Author&
   Name:Elvis Rotich
   Email:biggeelvo831@gmail.com
   Github:Elvis108-coder