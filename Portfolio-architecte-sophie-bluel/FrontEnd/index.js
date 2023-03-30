
const gallery = document.querySelector(".gallery")
let category = window.localStorage.getItem('categoryId')
let elementTableau;


async function getWork() {
    try {
        const response = await fetch("http://localhost:5678/api/works")
        const json = await response.json()
        elementTableau = json
        ajoutGallerie(json)
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
editBtn.addEventListener("click", () => {
    if (editBtn) {
        modale.style = "display: block;"
        overlay.style = "display: block;"
    }
})



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
