document.addEventListener("DOMContentLoaded", function () {
  const cancelButton = document.getElementById("cancel-button");
  const form = document.getElementById("skill-form");
  const activeCardsSection = document.getElementById("active-cards-section");

  function checkChildren() {
    const noResult = document.getElementById("no-result");
    const children = activeCardsSection.children.length;

    if (children === 0) {
      noResult.style.display = "flex";
    } else {
      noResult.style.display = "none";
    }
  }

  checkChildren();

  cancelButton.onclick = function () {
    form.reset();
  };

  function createCard(projectTitle, projectDesc) {
    const card = document.createElement("div");
    card.className = "card";
    const ID = Date.now();
    card.id = `card-${ID}`;

    card.innerHTML = `
            <div>
              <button id="${ID}" class="delete-button" >X</button>
            </div>
            <div class="card-content">
              <h1 id="title">${projectTitle}</h1>
              <p id="description">
                ${projectDesc}
              </p>
            </div>
            <button id="finish-button">Finish</button>
          `;

    return { card, ID };
  }

  form.onsubmit = function (e) {
    e.preventDefault();

    const projectTitle = document.getElementById("title").value.trim();
    const projectDesc = document.getElementById("desc").value.trim();

    const { card, ID } = createCard(projectTitle, projectDesc);

    activeCardsSection.appendChild(card);
    checkChildren();

    const deleteButton = document.getElementById(ID);

    deleteButton.onclick = function (e) {
      e.preventDefault();
      const card = document.getElementById(`card-${ID}`);
      card.remove();
      checkChildren();
    };

    form.reset();
  };
});
