const notCompletedBook = document.getElementById("notcompletedShelf");
const completedBook = document.getElementById("completedShelf");

// Reset Data untuk pencarian
function resetDataRak() {
  notCompletedBook.innerHTML = "";
  completedBook.innerHTML = "";
}

// Menampilkan buku saat pertama kali dijalankan
function showData() {
  if (listBuku) {
    for (let buku of listBuku) {
      makeElement(buku);
    }
  }
}

// Mencari buku untuk form pencarian
function cariBuku(judul) {
  if (listBuku) {
    for (let buku of listBuku) {
      if (buku.title.toLowerCase().search(judul.toLowerCase()) >= 0) {
        makeElement(buku);
      }
    }
  }
}

// Menambah buku sekaligus menampilkannya dan mengupdate data yang ada di localStorage
function addBuku() {
  const judul = document.getElementById("judul").value;
  const author = document.getElementById("author").value;
  const year = Number(document.getElementById("tahun").value);

  let newItem = {
    id: +new Date(),
    title: judul,
    author: author,
    year: year,
    isComplete: false,
  };

  listBuku.push(newItem);

  makeElement(newItem);
  updateLocalStorage();
}

function toogleNotification() {
  const notification = document.getElementById("deleteNotification");
  notification.classList.toggle("active");
}

// Notifikasi Konfimasi untuk delete
function showNotification(element) {
  let indexOnListBuku = findIndexBuku(element["bukuId"]);

  const notification = document.getElementById("deleteNotification");
  toogleNotification();

  const valueJudul = notification.querySelector("#valueJudul");
  valueJudul.innerHTML = listBuku[indexOnListBuku].title;

  const valueAuthor = notification.querySelector("#valueAuthor");
  valueAuthor.innerHTML = listBuku[indexOnListBuku].author;

  const valueTahun = notification.querySelector("#valueTahun");
  valueTahun.innerHTML = listBuku[indexOnListBuku].year;

  let cancelBtn = document.createElement("div");
  cancelBtn.classList.add("btn", "btn-danger");
  cancelBtn.innerHTML = "Tidak";
  cancelBtn.addEventListener("click", () => {
    toogleNotification();
  });

  let confirmBtn = document.createElement("div");
  confirmBtn.classList.add("btn", "btn-primary");
  confirmBtn.innerHTML = "Ya";
  confirmBtn.addEventListener("click", () => {
    deleteBook(element, indexOnListBuku);
  });

  let groupBtn = notification.querySelector("#modalGroupBtn");
  groupBtn.innerHTML = "";
  groupBtn.append(cancelBtn, confirmBtn);
}

// Event Handler untuk button hapus buku
function deleteBook(element, idx) {
  toogleNotification();

  listBuku.splice(idx, 1);

  element.remove();
  updateLocalStorage();
}

// Event Handler untuk button sudah selesai atau belum selesai
function changeIsCompleteBook(element) {
  let indexOnListBuku = findIndexBuku(element["bukuId"]);

  listBuku[indexOnListBuku].isComplete = !listBuku[indexOnListBuku].isComplete;

  makeElement(listBuku[indexOnListBuku]);
  element.remove();
  updateLocalStorage();
}

// Membuat element HTML dari data buku
function makeElement(buku) {
  let elementTitle = document.createElement("h2");
  elementTitle.classList.add("judul");
  elementTitle.innerHTML = buku.title;

  let elementAuthor = document.createElement("p");
  elementAuthor.classList.add("author");
  elementAuthor.innerHTML = buku.author;

  let elementYear = document.createElement("p");
  elementYear.classList.add("year");
  elementYear.innerHTML = buku.year;

  let deleteBtn = document.createElement("div");
  deleteBtn.classList.add("btn", "btn-danger");
  deleteBtn.innerHTML = "Hapus";
  deleteBtn.addEventListener("click", (e) => {
    showNotification(e.target.parentElement.parentElement);
  });

  let changerBtn = document.createElement("div");
  changerBtn.classList.add("btn", "btn-primary");
  changerBtn.innerHTML = buku.isComplete ? "Belum Selesai" : "Sudah Selesai";
  changerBtn.addEventListener("click", (e) => {
    changeIsCompleteBook(e.target.parentElement.parentElement);
  });

  let bookInfoElement = document.createElement("div");
  bookInfoElement.classList.add("bookInfo");
  bookInfoElement.append(elementTitle, elementAuthor, elementYear);

  let bookControlElement = document.createElement("div");
  bookControlElement.classList.add("bookControl");
  bookControlElement.append(changerBtn, deleteBtn);

  let bookItemElement = document.createElement("div");
  bookItemElement.classList.add("bookItem");
  bookItemElement.append(bookInfoElement, bookControlElement);
  bookItemElement["bukuId"] = buku.id;

  if (buku.isComplete) {
    completedBook.append(bookItemElement);
  } else {
    notCompletedBook.append(bookItemElement);
  }
}
