function setActiveButton() {
  var currentPage = window.location.pathname.split("/").pop();

  document.getElementById("home-button").classList.remove("active-button");
  document.getElementById("skill-button").classList.remove("active-button");

  if (currentPage === "index.html" || currentPage === "") {
    document.getElementById("home-button").classList.add("active-button");
  } else if (currentPage === "skills.html") {
    document.getElementById("skill-button").classList.add("active-button");
  }
}

window.onload = setActiveButton;
