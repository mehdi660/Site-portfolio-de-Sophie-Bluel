const gallery = document.querySelector(".gallery")


async function getWork() {
    try {
        const response = await fetch("http://localhost:5678/api/works")
        const json = await response.json()
        console.log(json);
        ajoutGallerie(json)
    } catch (error) {
        console.log(error);
    }
}
getWork()

function ajoutGallerie(json) {
    json.forEach(element => {
        console.log(element.imageUrl, element.title);
        const figure = `<figure>
				<img src=${element.imageUrl} alt=${element.title}>
				<figcaption>${element.title}</figcaption>
			</figure>`
        const gallery = document.querySelector(".gallery")
        gallery.innerHTML = figure + gallery.innerHTML
        console.log(gallery.innerHTML);
    });
}