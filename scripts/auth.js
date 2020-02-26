//listen for auth status changes
auth.onAuthStateChanged(user => {
  console.log(user);
  if (user) {
    //get dada from data base
    db.collection("guides")
      .onSnapshot(snapshot => {
        setUpGuides(snapshot.docs);
        setupUI(user);
      })
      .catch(err => {
        console.log(err.message);
      });
  } else {
    setupUI();
    setUpGuides([]);
  }
});

//create new guide
const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", e => {
  e.preventDefault();
  db.collection("guides")
    .add({
      title: createForm["title"].value,
      content: createForm["content"].value
    })
    .then(() => {
      //close the model and reset form
      const modal = document.querySelector("#modal-create");
      M.Modal.getInstance(modal).close();
      createForm.reset();
    })
    .catch(err => {
      console.log(err.message);
    });
});

//signup user
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", e => {
  e.preventDefault();

  //get user info (look into signupfForm and find an id 'signup-email')
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  //sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    console.log(cred.user);
    const modal = document.querySelector("#modal-signup");
    //after getting user info close it
    M.Modal.getInstance(modal).close();
    //clear form
    signupForm.reset();
  });
});

//logout user
const logout = document.querySelector("#logout");
logout.addEventListener("click", e => {
  e.preventDefault();
  auth.signOut();
});

//login user
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  auth.signInWithEmailAndPassword(email, password).then(cred => {
    console.log(cred.user);
    //clode the login modal and close the form
    const modal = document.querySelector("#modal-login");
    //after getting user info close it
    M.Modal.getInstance(modal).close();
    //clear form
    loginForm.reset();
  });
});
