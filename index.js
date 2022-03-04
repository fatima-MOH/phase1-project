document.addEventListener("DOMContentLoaded",()=>{



//Event Listeners
const form = document.querySelector('#pokemon-form')
form.addEventListener('submit',handeleSubmit)

 
//Event handlers 
function handeleSubmit(e) {
    e.preventDefault()
    
    let pokemonObj={
        name:e.target.name.value,
        imageUrl:e.target.image_url.value,
        description:e.target.description.value,
        likes:0
    }
    form.reset()
    renderOnePokemon(pokemonObj)
    addPokemon(pokemonObj)
    
}


//DOM Render functions
function renderOnePokemon(pokemon){
    //buid pokemon 
    let card= document.createElement('li')
    card.className='card'
    card.innerHTML=`
    <div id="img">
    <img src="${pokemon.imageUrl}">
    </div>
    <div class="content">
    <h4>${pokemon.name}</h4>
    <P>
    <span class="likes-count">${pokemon.likes}</span>like<p>
    <p>${pokemon.description}</p>
    </div>
    <div class="buttons">
    <button id='like'>LIKE</button>
    <button id='delete'> DELETE</button>
    </div>
    `
    card.querySelector('#like').addEventListener('click', ()=>{
     pokemon.likes+=1;
     card.querySelector('span').textContent=pokemon.likes;
     UpdateLikes(pokemon)
     

    })
    card.querySelector('#delete').addEventListener('click', ()=>{
        card.innerHTML=''
        deletePokemon(pokemon.id)
    })



    //Add pokemon card to document
    document.querySelector('#pokemon-list').appendChild(card)
}
//Fetch resquests
//Get fetch for all pokemon resources
function getAllPokemons(){
    fetch('http://localhost:3000/pokemonData')
    .then(res=>res.json())
    .then(pokemonData=>pokemonData.forEach(pokemon=>renderOnePokemon(pokemon)))

}
function addPokemon(pokemonObj){
  console.log("post")
    fetch('http://localhost:3000/pokemonData',{
        method: 'POST',
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pokemonObj)
    
    })
    .then(res => res.json())
    .then(pokemon => console.log(pokemon))
}

function  UpdateLikes(pokemonObj) {
  fetch(`http://localhost:3000/pokemonData/${pokemonObj.id}`,{
      method:'PATCH',
      headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pokemonObj)
  })
  .then(res => res.json())
  .then(pokemon=>console.log(pokemon))

}
function deletePokemon(id) {
    fetch(`http://localhost:3000/pokemonData/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(pokemon=>console.log(pokemon))
}



//intial Render
//Get Data and Render our pkemons to the DOM
function initialize() {
    
    getAllPokemons()

}
initialize()
})
