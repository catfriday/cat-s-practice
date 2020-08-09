// const url = "https://pokeapi.co/api/v2/pokemon/pikachu/"
// let url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a'
// let patchUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='
document.addEventListener("DOMContentLoaded", function (e){

let url = 'http://localhost:3000/drinks/'
// const thing = fetch(url)

// console.log("Pokemon: ", thing)

fetch(url)
.then(response => response.json())
.then(drinks => renderDrinks(drinks))
// .catch(error => {
//   console.log("There's been an error: ", error)
// })
// .finally(data => {
//   console.log("Mystery!!", data)
// })
// renderDrinks(drinks)

function renderDrinks(drinks){
    drinks.forEach(drink => renderDrink(drink))
}

function renderDrink(drink){
    // let ul = document.querySelector('#list')
    // let li = document.createElement('li')
    // // let h3 = document.createElement('h3')
    // // let body = document.querySelector('body')
    // li.innerText = drink.strDrink
    // ul.appendChild(li)
    // // body.appendChild(div)
    // li.addEventListener('click', (e) => {
    //     drinkDetail(li, drink)
    // })
    let drinkCollection = document.querySelector('#drink-collection')
   

    
//     div.innerHTML = ` <div class="card"> 
//     <h2> ${drink.strDrink}</h2>
//     <img src=${drink.strDrinkThumb} class="drink-pic"/> 
//     <h3> ${drink.strCategory}</h3>
//     <p>4 ${drink.strInstructions}</p>
//   </div>`
//   div.appendChild(contentDiv)
  
//   let deleteButton = document.createElement('button')
//   deleteButton.innerText = 'delete drink'
//   deleteButton.dataset.id = drink.id 
//   contentDiv.appendChild(deleteButton)
//   deleteButton.addEventListener('click', (e) => {
//       deleteFunction(drink, contentDiv)
//     })
//     console.log(contentDiv)


    let div = document.createElement('div')
      div.className = 'card'

      let h2 = document.createElement('h2')
      h2.innerText = drink.strDrink
      div.append(h2)

      let image = document.createElement('img')
      image.className = "drink-pic"
      image.src = drink.strDrinkThumb
      div.append(image)

      let h3 = document.createElement('h3')
      h3.innerText = drink.strCategory
      div.append(h3)

      let ptag = document.createElement('p')
      ptag.innerText = drink.strInstructions
      div.append(ptag)

      let deleteButton = document.createElement('button')
        deleteButton.innerText = 'delete drink'
        deleteButton.dataset.id = drink.id 
        div.appendChild(deleteButton)
        deleteButton.addEventListener('click', (e) => {
      deleteFunction(drink, div)
    })
            
      drinkCollection.append(div)
    
}

// function drinkDetail(li, drink){
//     // let div = document.querySelector('#show-panel')
//     // div.innerHTML = ""
//     let div = document.querySelector('#drink-collection')

//     let contentDiv = document.createElement('div')
//     contentDiv.innerHTML = ` <div class="card"> 
//     <h2> ${drink.strDrink}</h2>
//     <img src=${drink.strDrinkThumb} class="drink-pic"/> 
//     <h3> ${drink.strCategory}</h3>
//     <p>4 ${drink.strInstructions}</p>
//   </div>`

// //   <button class="like-btn"> Like <3</button>
//     div.appendChild(contentDiv)

//     // let h1 = document.createElement('h1')
//     // h1.innerText = drink.strDrink
//     // contentDiv.appendChild(h1)

//     // let image = document.createElement('img')
//     // image.src = drink.strDrinkThumb
//     // contentDiv.appendChild(image)

//     // let h2 = document.createElement('h2')
//     // h2.innerText = drink.strCategory
//     // contentDiv.appendChild(h2)

//     // let p = document.createElement('p')
//     // p.innerText = drink.strInstructions
//     // contentDiv.appendChild(p)

//     let deleteButton = document.createElement('button')
//     deleteButton.innerText = 'delete drink'
//     deleteButton.dataset.id = drink.id 
//     contentDiv.appendChild(deleteButton)
//     deleteButton.addEventListener('click', (e) => {
//         deleteFunction(drink, contentDiv)
//     })
//     console.log(div)

// }

let form = document.getElementsByClassName('add-drink')[0]
form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e.target)

    let drinkName = form.name.value
    let drinkImage = form.image.value
    let drinkCat = form.category.value 
    let drinkDirections = form.directions.value
    createDrink(drinkName, drinkImage, drinkCat, drinkDirections)

    form.reset()
})

function createDrink(drinkName, drinkImage, drinkCat, drinkDirections){
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "strDrink": drinkName,
            "strCategory": drinkCat,
            "strInstructions": drinkDirections,
            "strDrinkThumb": drinkImage
        })
    })
    .then(function(response) {
        return response.json();
    })
    .then(data =>renderDrink(data)
    )
}

function deleteFunction(drink, contentDiv){
    fetch(url + drink.id, {
        method: 'DELETE'
    })
    .then(res => res.json())
.then(res => 
    {contentDiv.remove()
    // li.remove()
})

}

})