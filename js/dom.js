const notCompletedBook = document.getElementById("notcompletedShelf");
const completedBook = document.getElementById("completedShelf");

function showData() {
  for (let buku of listBuku) {
    makeElement(buku);
  }
}

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

  console.log(newItem);
}

function deleteBook(id) {
  findIndexBuku(id);
}

function makeElement(buku) {
  let elementTitle = document.createElement("h2");
  elementTitle.innerHTML = buku.title;

  let elementAuthorYear = document.createElement("p");
  elementAuthorYear.innerHTML = `${buku.author}, ${buku.year}`;

  let deleteBtn = document.createElement("div");
  deleteBtn.classList.add("btn", "btn-delete");
  deleteBtn.innerHTML = "Hapus";

  let changerBtn = document.createElement("div");
  changerBtn.classList.add("btn", "btn-changer");
  changerBtn.innerHTML = buku.isComplete ? "Belum Selesai" : "Sudah Selesai";

  let bookInfoElement = document.createElement("div");
  bookInfoElement.classList.add("bookInfo");
  bookInfoElement.append(elementTitle, elementAuthorYear);

  let bookControlElement = document.createElement("div");
  bookControlElement.classList.add("bookControl");
  bookControlElement.append(changerBtn, deleteBtn);

  let bookItemElement = document.createElement("div");
  bookItemElement.classList.add("bookItem");
  bookItemElement.append(bookInfoElement, bookControlElement);
  bookItemElement["bukuId"] = buku.id;

  //   console.log(bookItemElement["bukuId"]);

  if (buku.isComplete) {
    completedBook.append(bookItemElement);
  } else {
    notCompletedBook.append(bookItemElement);
  }
}
