
document.querySelector("#connect").addEventListener("click", function (event) {
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
            password: password
        }),
        headers: {
            "Content-Type": "application/json",
            "Accept": 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                // Si la réponse est réussie, redirigez l'utilisateur vers la page principale
                window.location.href = "./admin.html";
                return response.json();
            } else {
                // Si la réponse n'est pas réussie, affichez un message d'erreur
                alert('Utlisateur non trouvé.');
            }
        })
        .then(data => {
            localStorage.setItem("token", data.token)
            console.log(data.token)
        })
        .catch(error => console.error(error));
}

// vérification de la présence du token dans le stockage local
const token = localStorage.getItem("token")
if (token) {
    // envoyer le token avec les requêtes à l'API
    fetch("http://localhost:5678/api/works", {

        headers: {
            "Content-Type": "application/json",
            // "Accept": 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (response.ok) {
                console.log(token);
                return response.json();
            } else {
                throw new Error('Erreur lors de la récupération des données.')
            }
        })
        .then(data => {
        })
        .catch(error => {
            console.log(error);
            alert(error.message)
        })
}




