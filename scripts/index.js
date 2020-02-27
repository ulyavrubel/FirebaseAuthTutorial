const guideList = document.querySelector(".guides");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accoutDetails = document.querySelector(".account-details");
const adminItems = document.querySelectorAll(".admin");

//show different links for login and logout users
const setupUI = user => {
  if (user) {
    //show only for admin
    if (user.admin) {
      adminItems.forEach(item => {
        item.style.display = "block";
      });
    }
    //account info
    db.collection("users")
      .doc(user.uid)
      .get()
      .then(doc => {
        const html = `
      <div>Logged in as user ${user.email}</div>
      <div>${doc.data().bio}</div>
      <div class="pink-text">${user.admin ? "Admin" : ""}</div>
    `;
        accoutDetails.innerHTML = html;
      });

    //toggle UI elements
    loggedInLinks.forEach(item => {
      item.style.display = "block";
    });
    loggedOutLinks.forEach(item => {
      item.style.display = "none";
    });
  } else {
    //do not show admin items
    adminItems.forEach(item => {
      item.style.display = "none";
    });
    //hide account info
    accoutDetails.innerHTML = "";

    //hide links
    loggedInLinks.forEach(item => {
      item.style.display = "none";
    });
    loggedOutLinks.forEach(item => {
      item.style.display = "block";
    });
  }
};

//setting guides
const setUpGuides = data => {
  if (data.length) {
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
  } else {
    guideList.innerHTML = `<h5 class="center-align">Login to view guides</h5>`;
  }
};

// setup materialize components
document.addEventListener("DOMContentLoaded", function() {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals); //materialized library

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
