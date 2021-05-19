const STORAGE_NAME = "LIST_BUKU";

let listBuku = [];

function isStorage() {
  if (typeof Storage !== undefined) {
    return true;
  } else {
    alert("Browser kamu tidak support local Storage");
    return false;
  }
}

function loadDataFormStorage() {
  let dataStorage = localStorage.getItem(STORAGE_NAME);

  const data = JSON.parse(dataStorage);

  listBuku = data;

  console.log(listBuku);
}

function updateLocalStorage() {
  const stringify = JSON.stringify(listBuku);

  localStorage.setItem(STORAGE_NAME, stringify);
}

function addBuku() {}

function getBuku() {}

function findIndexBuku(id) {}
