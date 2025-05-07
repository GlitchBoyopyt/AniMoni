const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function loginWithProvider(providerType) {
  let provider;

  switch (providerType) {
    case 'google':
      provider = new firebase.auth.GoogleAuthProvider();
      break;
    case 'github':
      provider = new firebase.auth.GithubAuthProvider();
      break;
    case 'facebook':
      provider = new firebase.auth.FacebookAuthProvider();
      break;
  }

  auth.signInWithPopup(provider).then(result => {
    const user = result.user;
    alert("Logged in as: " + user.displayName);
    // Redirect to creator/viewer page
  }).catch(error => {
    console.error("Login error", error);
  });
}

