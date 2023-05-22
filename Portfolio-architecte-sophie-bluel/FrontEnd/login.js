const connect = document.querySelector("input[type=submit]");
connect.addEventListener("click", function (event) {
  event.preventDefault(); // empêche le formulaire de se soumettre de manière conventionnelle
  loginUser(); // appelle la fonction pour se connecter à l'API
});

async function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const url = "http://localhost:5678/api/users/login";

  await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        // Si la réponse est réussie, redirigez l'utilisateur vers la page principale
        window.location.href = "./index.html";
        return response.json();
      } else if (!email) {
        // Si la réponse n'est pas réussie et l'email est vide, affichez un message d'erreur
        alert("Utilisateur non trouvé.");
      } else if (email && !password) {
        // Si la réponse n'est pas réussie, l'email est présent mais le mot de passe est vide, affichez un message d'erreur
        alert("Mauvais mot de passe.");
      } else {
        alert("Email ou mot de passe éronnés");
      }
    })
    .then((data) => {
      localStorage.setItem("token", data.token);
      console.log(data.token);
    })
    .catch((error) => console.error(error));

  // vérification de la présence du token dans le stockage local
  const token = localStorage.token;
  if (token) {
    // envoyer le token avec les requêtes à l'API
    fetch("http://localhost:5678/api/works", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log(token);
          return response.json();
        } else {
          throw new Error("Erreur lors de la récupération des données.");
        }
      })
      .then((data) => {})
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  }
}
