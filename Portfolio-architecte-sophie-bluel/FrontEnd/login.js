
document.querySelector("#connect").addEventListener("click", function (event) {
    event.preventDefault(); // empêche le formulaire de se soumettre de manière conventionnelle
    loginUser(); // appelle la fonction pour se connecter à l'API
});

function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const url = "http://localhost:5678/api/users/login";

    const data = {
        email: 'sophie.bluel@test.tld',
        password: 'S0phie'
    };

    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}





