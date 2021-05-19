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

  if (data) {
    listBuku = data;
  }
}

function updateLocalStorage() {
  const stringify = JSON.stringify(listBuku);

  localStorage.setItem(STORAGE_NAME, stringify);
}

function findIndexBuku(id) {
  let index = 0;
  for (let buku of listBuku) {
    if (buku.id == id) {
      return index;
    }

    index++;
  }
  return -1;
}
