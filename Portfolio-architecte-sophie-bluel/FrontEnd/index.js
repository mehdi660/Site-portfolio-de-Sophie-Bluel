const gallery = document.querySelector(".gallery")
let category = window.localStorage.getItem('categoryId')
let elementTableau;


async function getWork() {
    try {
        const response = await fetch("http://localhost:5678/api/works")
        const json = await response.json()
        elementTableau = json
        ajoutGallerie(json)
        console.log(elementTableau);
    } catch (error) {
        console.log(error);
    }
}

getWork()

function ajoutGallerie(json) {
    json.forEach(element => {
        const figure = `<figure>
				<img src=${element.imageUrl} alt=${element.title}>
				<figcaption>${element.title}</figcaption>
			</figure>`
        const gallery = document.querySelector(".gallery")
        gallery.innerHTML = figure + gallery.innerHTML
    });
}

const btnAll = document.querySelector(".all");
const btnObject = document.querySelector(".object");
const btnAppart = document.querySelector(".appart");
const btnHotels = document.querySelector(".hotel_and_restaurant");



btnAll.addEventListener("click", () => {
    const projectFiltrees = elementTableau.filter(el => el.categoryId)
    console.log(projectFiltrees);
    document.querySelector(".gallery").innerHTML = "";
    ajoutGallerie(projectFiltrees)
});


btnObject.addEventListener("click", () => {
    const projectFiltrees = elementTableau.filter(el => el.categoryId === 1)
    console.log(projectFiltrees);
    document.querySelector(".gallery").innerHTML = "";
    ajoutGallerie(projectFiltrees)
});

btnAppart.addEventListener("click", () => {
    const projectFiltrees = elementTableau.filter(el => el.categoryId === 2)
    console.log(projectFiltrees);
    document.querySelector(".gallery").innerHTML = "";
    ajoutGallerie(projectFiltrees)
});


btnHotels.addEventListener("click", () => {
    const projectFiltrees = elementTableau.filter(el => el.categoryId === 3)
    console.log(projectFiltrees);
    document.querySelector(".gallery").innerHTML = "";
    ajoutGallerie(projectFiltrees)
});


const token = localStorage.token;
const editPart = document.querySelectorAll('.edit')
const editTop = document.querySelector('.edit-top')
const btnFilter = document.querySelector('.btn-filter')
const login = document.querySelector('#login')
if (token) {
    editPart.forEach(editPart => {
        editPart.style = "display: flex;"
        editTop.style = "display: block;"
    })
    btnFilter.style = "display:none;"
    login.innerHTML = "<li>logout</li>"

}

login.addEventListener("click", () => {
    if (token) {
        localStorage.removeItem('token')
    }
});


const editBtn = document.querySelector('.edit-project');
const modale = document.querySelector('.modale');
const overlay = document.querySelector('.overlay');
const cross = document.querySelector('.cross')

overlay.addEventListener("click", () => {
    if (overlay) {
        modale.style = "display: none;"
        overlay.style = "display: none;"
    }
})

cross.addEventListener("click", () => {
    if (cross) {
        modale.style = "display: none;"
        overlay.style = "display: none;"
    }
})


function ajoutGallerieModale(json) {
    const projectContainer = document.querySelector('.picture-container')
    projectContainer.textContent = '' // vider le contenu existant
    json.forEach(element => {
        const figure = `<figure class="picture">
        <div class="i-container"><i class="fa-solid fa-trash-can" style="color: #fff;"></i></div>
            <img src=${element.imageUrl} alt=${element.title}>
            <p>éditer</p>
        </figure>`

        projectContainer.innerHTML += figure // ajouter chaque image
    });
}

editBtn.addEventListener("click", async () => {
    if (editBtn) {
        try {
            const response = await fetch("http://localhost:5678/api/works")
            const json = await response.json()
            ajoutGallerieModale(json)
        } catch (error) {
            console.log(error);
        }
        modale.style = "display: flex;"
        overlay.style = "display: block;"
    }
})

const figure = `<figure class="picture">
  <div class="i-container"><i class="fa-solid fa-trash-can" style="color: #fff;"></i></div>
  <img src=${element.imageUrl} alt=${element.title} id="image-${element.id}">
  <p>éditer</p>
</figure>`

const deleteBtns = document.querySelectorAll('.fa-trash-can')
deleteBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
        const imageId = btn.parentNode.nextSibling.id.split('-')[1]
        await fetch(`http://localhost:5678/api/works/${imageId}`, {
            method: 'DELETE',
            headers: {
                "Accept": 'application/json',
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4MDYwODQ3NSwiZXhwIjoxNjgwNjk0ODc1fQ.z43GTYpUF3KpUwm-twzpuIL6A91n3V6MxCCWSpxKBJo`
            }
        })
            .then(response => {
                if (response.ok) {
                    console.log("c'est ok");
                    return response.json();
                } else {
                    throw new Error('Erreur lors de la suppression.')
                }
            })
            .then(data => {
                // supprimez l'élément du DOM
                const imageElement = document.getElementById(`image-${imageId}`)
                imageElement.parentNode.parentNode.removeChild(imageElement.parentNode)
            })
            .catch(error => {
                console.log(error);
                alert(error.message)
            })
    })
})





// const deleteBtns = document.querySelectorAll('.i-container');

// deleteBtns.forEach(btn => {
//     btn.addEventListener("click", async () => {
//         // Récupérer l'ID de l'élément à supprimer
//         const id = // récupérer l'ID de l'élément à partir de son parent

//             await fetch(`http://localhost:5678/api/works/${id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     "Accept": 'application/json',
//                     'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4MDYwODQ3NSwiZXhwIjoxNjgwNjk0ODc1fQ.z43GTYpUF3KpUwm-twzpuIL6A91n3V6MxCCWSpxKBJo`
//                 }
//             })
//                 .then(response => {
//                     if (response.ok) {
//                         console.log("c'est ok");
//                         return response.json();
//                     } else {
//                         throw new Error('Erreur lors de la suprression.')
//                     }
//                 })
//                 .then(data => {
//                     // Actualiser la galerie après la suppression de l'élément
//                     getWork();
//                     // Fermer la modale après la suppression de l'élément
//                     modale.style.display = "none";
//                     overlay.style.display = "none";
//                 })
//                 .catch(error => {
//                     console.log(error);
//                     alert('error.message')
//                 })
//     });
// });

