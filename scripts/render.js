// Utility to load and parse JSON files
async function loadJSON(path) {
    const response = await fetch(path);
    if (!response.ok) {
      console.error(`Failed to load ${path}`);
      return [];
    }
    return await response.json();
  }
  
  // Render Experience
  function renderExperience(data) {
    const container = document.getElementById("experience-list");
    if (!container) return;
  
    container.innerHTML = "";
  
    data.forEach(job => {
      const wrapper = document.createElement("article");
      wrapper.className = "experience-item";
      wrapper.style.marginBottom = "1.8rem";
  
      let responsibilitiesHTML = "";
      let externalUrl = null;
  
      if (Array.isArray(job.responsibilities)) {
        responsibilitiesHTML = job.responsibilities
          .map(item => {
            if (item?.description) {
              if (item?.url) {
              return `
                <a href="${item.url}" class="experience-external-link" target="_blank" rel="noopener noreferrer">
                  <li>${item.description}</li>
                </a>
              `;
            } else {
              return `
                <li class="experience-no-description">${item.description}</li>
              `;
            }
          }})
          .join("");

      }
  
      wrapper.innerHTML = `
        <h3 class="experience-role">
          <span class="in-section-title">${job.role}</span>
          <span class="experience-company"> · ${job.company}</span>
        </h3>
  
        <p class="experience-meta">
          ${job.location} — ${job.period}
        </p>
  
        ${
          responsibilitiesHTML
            ? `
              <div class="experience-list-wrapper">
                <ul class="experience-list">
                  ${responsibilitiesHTML}
                </ul>
              </div>
            `
            : ""
        }
      `;
  
      container.appendChild(wrapper);
    });
  }
  
  
  
  function renderEducation(data) {
    const container = document.getElementById("education-list");
    if (!container) return;
  
    container.innerHTML = "";
  
    data.forEach(item => {
      const wrapper = document.createElement("article");
      wrapper.className = "education-item";
      wrapper.style.marginBottom = "1.8rem";
  
      // Format coursework list
      const courseworkList = item.details.coursework?.length
      ? `
        <ul class="coursework-tags">
          ${item.details.coursework.map(c => `<li class="tag">${c}</li>`).join("")}
        </ul>
      `
      : "";
    
  
      wrapper.innerHTML = `
        <h3 class="education-degree">
          <span class="in-section-title">${item.institution}</span><br>
          ${item.degree}
        </h3>
  
        <p class="education-meta">${item.period}</p>
  
        <ul class="education-details">
          <li><strong>Concentration:</strong> ${item.details.concentration}</li>
          <li><strong>Grade:</strong> ${item.details.grade}</li>
          ${item.details.thesis ? `<li><strong>Thesis:</strong> ${item.details.thesis}</li>` : ""}
        </ul>
  
        ${courseworkList ? `
          <p style="margin-top:0.4rem;"><strong>Coursework:</strong></p>
          <ul class="education-coursework">${courseworkList}</ul>
        ` : ""}
      `;
  
      container.appendChild(wrapper);
    });
  }

  
  // Initialize on page load
  document.addEventListener("DOMContentLoaded", async () => {
    // Render year
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  
    // Load and render Experience
    const experience = await loadJSON("data/experience.json");
    renderExperience(experience);
  
    // Education
    const education = await loadJSON("data/education.json");
    renderEducation(education);
  });
  