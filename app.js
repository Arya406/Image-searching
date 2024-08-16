const accessKey = "tg0TmOtyQf0Cz27d5CgcZFaIU5iCWUok09BfYmCQZ48";
const formE1 = document.querySelector("form");
const input1 = document.getElementById("search-input");
const searchresults = document.querySelector(".search-results")
const showMore = document.getElementById("show-more-button");

let inputdata = "";
let page = 1;

async function searchImage(){
    inputdata=input1.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accessKey}`
   
   try{
    const response = await fetch(url);
    const data  = await response.json()

    const results = data.results
   
    if(page===1){
        searchresults.innerHTML="";

    }
    results.map((result) =>{
        const imagewrapper = document.createElement('div')
        imagewrapper.classList.add("search-result")
        const image = document.createElement('img')
        image.src=result.urls.small
        image.alt = result.alt_description;
        const imagelink = document.createElement("a");
        imagelink.href=result.links.html;
        imagelink.target="_blank"
        imagelink.textContent=result.alt_description


        imagewrapper.appendChild(image);
        imagewrapper.appendChild(imagelink);
        searchresults.appendChild(imagewrapper);

    });

    page++
    if(page>1){
        showMore.style.display="block"
    }

} catch(error){
    console.error("error",error)

}

}

formE1.addEventListener("submit",(event)=>{
    event.preventDefault();
    page = 1;
    searchImage();
})

showMore.addEventListener("click",()=>{
    searchImage();
})