
const imgUrl = 'https://dog.ceo/api/breeds/image/random/4'
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
//const breedArea = document.getElementById('dog-breeds')
//const dropDown = document.getElementById('breed-dropdown')
let breeds = []


document.addEventListener('DOMContentLoaded', () => {
    getImages()
    getBreeds()
    document.getElementById('breed-dropdown').addEventListener('change', handleSelect )
})


function getImages() {
    fetch(imgUrl) 
    .then(resp => resp.json())
    .then(appendImages)
}

function appendImages(data) {
    //iterate and add images to DOM
    // turn data to elements so can append
    const dogArray = data.message
    const dogArea = document.getElementById("dog-image-container")
    dogArray.forEach(d => {
        dogArea.innerHTML += `<div><img src=${d} alt="DOG!"/></div>`
    })
}  

function getBreeds() {
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(data => {
        breeds = Object.keys(data.message)
        const liBreeds = addLiElements(breeds)
        appendBreeds(liBreeds)
    })
}

function addLiElements(breeds) {
  return breeds.map((b) => {
        let li = document.createElement('li')
        li.innerText = b 
        return li   
    })
    
}

function appendBreeds(liBreeds) {
     liBreeds.forEach(breed => {
         document.getElementById('dog-breeds').append(breed) 
         breed.addEventListener("click", function(e) {
            if  (e.target.style.color === 'blue') {
                e.target.style.color = 'black'
            } else {
                e.target.style.color = 'blue'
            }
    })
})
 
}

// function handleClick() {
//     if  (e.target.style.color === 'blue') {
//         e.target.style.color = 'black'
//     } else {
//         e.target.style.color = 'blue'
//     }


function handleSelect(e) {
    const letter = e.target.value
    //filter the breeds that start with the letter selected
    const filteredBreeds = breeds.filter(breed => breed.startsWith(letter))
    // append filtered breeds to DOM
    const filtered = addLiElements(filteredBreeds)
   const breedArea = document.getElementById('dog-breeds')
    breedArea.innerHTML = ''
     filtered.forEach(f => 
        breedArea.append(f) 
        // //{debugger}
        //appendBreeds(filtered)
     )

}









