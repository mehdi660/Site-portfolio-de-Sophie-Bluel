
document.querySelector("#connect").addEventListener("click", function (event) {
    event.preventDefault(); // empêche le formulaire de se soumettre de manière conventionnelle
    loginUser(); // appelle la fonction pour se connecter à l'API
});

function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const url = "http://localhost:5678/api/users/login";


    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                // Si la réponse est réussie, redirigez l'utilisateur vers la page principale
                window.location.href = "./index.html";
                return response.json();

            } else {
                // Si la réponse n'est pas réussie, affichez un message d'erreur
                throw new Error('Erreur lors de la connexion');
            }
        })
        .then(data => {
            localStorage.setItem("token", data.token)
            console.log(data.token)

        })
        .catch(error => console.error(error));
}




