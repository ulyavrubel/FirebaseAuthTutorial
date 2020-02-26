//setting guides
const guideList = document.querySelector(".guides");

const setUpGuides = data => {
  let html = "";
  data.forEach(doc => {
    const guide = doc.data();
    const li = `
      <li>
          <div class="collapsible-header grey lighten-4">${guide.title}</div>
          <div class="collapsible-body white">
            <span>${guide.content}</span>
          </div>
      </li>
    `;
    html += li;
  });

  guideList.innerHTML = html;
};

// setup materialize components
document.addEventListener("DOMContentLoaded", function() {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals); //materialized library

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
