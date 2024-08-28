document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal-wrapper");
  const addSkillBtn = document.getElementById("add-skill");
  const closeBtn = document.getElementById("cancel-skill-button");
  const addSkillForm = document.getElementById("addSkillForm");
  const skillRow2 = document.getElementById("skill-row2");

  function capitalizeFirstLetterOfEachWord(str) {
    return str.replace(/\b[a-z]/g, (match) => match.toUpperCase());
  }

  addSkillBtn.onclick = function () {
    modal.style.display = "flex";
  };

  closeBtn.onclick = function () {
    modal.style.display = "none";
    addSkillForm.reset();
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  function getWidthForProficiency(proficiency) {
    const maxWidth = 290.51;
    const percentage = Math.min(Math.max(proficiency, 0), 100);
    return (percentage / 100) * maxWidth;
  }

  function createSkillCard(domainName, skills) {
    const card = document.createElement("div");
    card.className = "skill-card";
    card.innerHTML = `
      <div class="skill-content">
        <h4>${domainName}</h4>
        ${skills
          .map(
            (skill, index) => `
          <div class="skill-name" style="top: ${37.38 + index * 43.44}px">
            <p style="width: 75%">${skill.name}</p>
            <p>${skill.proficiency}%</p>
          </div>
          <div class="line" style="top: ${66.67 + index * 43.44}px">
            <div class="outer-rect">
              <div class="completed-bar" style="width: ${getWidthForProficiency(skill.proficiency)}px"></div>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    `;
    return card;
  }

  // Handle form submission
  addSkillForm.onsubmit = function (e) {
    e.preventDefault();

    const lowerDomainName = document
      .getElementById("domain-input")
      .value.trim();
    const domainName = capitalizeFirstLetterOfEachWord(lowerDomainName);
    const skillInputs = document.querySelectorAll(".skill-input");
    const proficiencyInputs = document.querySelectorAll(".skill-proficiency");

    let isValid = true;
    let validationMessage = "";

    if (!domainName || domainName.length < 3) {
      isValid = false;
      validationMessage +=
        "Domain Name is required and must be at least 3 characters long.\n\n";
    }

    let hasAtLeastOneSkill = false;
    const skills = [];
    for (let i = 0; i < skillInputs.length; i++) {
      const skill = skillInputs[i].value.trim();
      const proficiency = proficiencyInputs[i].value;

      if (skill) {
        hasAtLeastOneSkill = true;

        if (skill.length > 25) {
          console.log(skill.length);
          isValid = false;
          validationMessage += `Skill "${skill}" exceeds 25 letters. Please shorten it.\n\n`;
        }

        if (!proficiency) {
          isValid = false;
          validationMessage += `Proficiency is required for skill "${skill}".\n\n`;
        } else {
          const proficiencyValue = parseInt(proficiency);

          if (proficiencyValue > 100) {
            isValid = false;
            validationMessage += `Proficiency for skill "${skill}" cannot exceed 100%.\n\n`;
          } else {
            skills.push({
              name: capitalizeFirstLetterOfEachWord(skill),
              proficiency: proficiencyValue,
            });
          }
        }
      }
    }

    if (!hasAtLeastOneSkill) {
      isValid = false;
      validationMessage += "At least one skill is required.\n\n";
    }

    if (isValid) {
      console.log("Domain Name:", domainName);
      console.log("Skills:", skills);

      const newSkillCard = createSkillCard(domainName, skills);
      skillRow2.appendChild(newSkillCard);

      modal.style.display = "none";
      addSkillForm.reset();
    } else {
      alert(validationMessage);
    }
  };
});
