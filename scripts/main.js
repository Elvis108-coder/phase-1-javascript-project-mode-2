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

