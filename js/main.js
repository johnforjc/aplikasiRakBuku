function validationInput() {
  if (document.getElementById("judul").value !== "" && document.getElementById("author").value !== "" && document.getElementById("tahun").value !== "") {
    return true;
  }
  return false;
}

document.addEventListener("DOMContentLoaded", () => {
  const formTambahBuku = document.getElementById("formTambahBuku");
  const formCariBuku = document.getElementById("cariBuku");

  formTambahBuku.addEventListener("submit", (e) => {
    e.preventDefault();
    // Validation
    if (validationInput()) {
      addBuku();
    } else {
      alert("Form belum diisikan dengan benar");
    }

    form.reset();
  });

  formCariBuku.addEventListener("submit", (e) => {
    e.preventDefault();

    const judulDicari = document.getElementById("judulDicari").value;

    if (judulDicari !== "") {
      resetDataRak();
      cariBuku(judulDicari);
    } else {
      resetDataRak();
      showData();
    }
  });

  formCariBuku.addEventListener("reset", () => {
    resetDataRak();
    showData();
  });

  //   Checking apakah Storage support di browser
  if (isStorage()) {
    loadDataFormStorage();
    showData();
  }
});
