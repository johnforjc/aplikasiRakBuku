function validationInput() {
  if (document.getElementById("judul").value !== "" && document.getElementById("author").value !== "" && document.getElementById("tahun").value !== "") {
    return true;
  }
  return false;
}

document.addEventListener("DOMContentLoaded", (e) => {
  const form = document.getElementById("formTambahBuku");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Validation
    if (validationInput()) {
      addBuku();
    } else {
      alert("Form belum diisikan dengan benar");
    }

    form.reset();
  });

  //   Checking apakah Storage support di browser
  if (isStorage()) {
    loadDataFormStorage();
    showData();
  }
});
