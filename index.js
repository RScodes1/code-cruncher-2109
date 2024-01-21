
let ColoringUrl = `https://mock-final-copy-api.onrender.com/images`;
let AffirmUrl = `https://mock-final-copy-api.onrender.com/affirmations`;
let ContactUrl = `https://mock-final-copy-api.onrender.com/contacts`;
let ThoughtUrl = `https://mock-final-copy-api.onrender.com/thoughts`;


let limit = 5;

let queryParams = `_page=1&_limit=5`;

async function fetchData(url,queryParams){
       try {
           let res = await fetch(`${url}?${queryParams}`);
           let totalData = res.headers.get("X-Total-Count");
           let totalPages = Math.ceil(totalData/limit);
           pagination(totalPages, limit, queryParams);
           let data = await res.json();
           console.log(data);
           appendData(data);
       }
       catch(error){
        console.log(error);
       }
}

fetchData(ColoringUrl, queryParams);

let mainSection = document.getElementById('images-appending');


function appendData(datas){
         
   mainSection.innerHTML = "";

   datas.forEach((data) => {
    mainSection.append(createCard(data));
   })
}

function createCard(item){

    let cardlist = document.createElement('div')
    cardlist.className = "images-to-coloured";

    //  let p = document.createElement('p');
    //    p.className = "adult-coloring";
    //    p.innerText = "Adult Colouring";

              let imageAdult = document.createElement('div');
              imageAdult.className = "image-adult";
    
      let TextTag = document.createElement('p');
      TextTag.innerText = "Click On The Image To Download";
   
      let divimage = document.createElement('div');
      divimage.className = "div-image";

      let imageTag = document.createElement('img');
      imageTag.src = item.image;
      imageTag.alt = item.name;

      divimage.append(imageTag);

     imageAdult.append(TextTag);
     imageAdult.append(imageTag);

     cardlist.append(imageAdult);
        // cardlist.append(p);
     return cardlist;
}

let paginationWrapper = document.getElementById('pagination-images');


function pagination(totalPages, limit, queryParams){
       
    paginationWrapper.innerHTML = ""; // Clear existing buttons

    for(let i = 1; i <= totalPages; i++){
        let button = document.createElement('button');
          button.innerText = i;
          button.addEventListener('click', ()=>{
            fetchData(`${ColoringUrl}?_page=${i}&_limit=${limit}`);
          })
          paginationWrapper.append(button);
    }
     
}


let currIndex = 0;
let affirmations = [];

async function fetchImages(){
    try {
        let res = await fetch(AffirmUrl);
        let data = await res.json();
        console.log(data);
        affirmations = data.slice(0,23);
        showImage(currIndex);
    }
    catch(error){
     console.log(error);
    }
}

const imageBox = document.getElementById('image-box');

const forwardBtn = document.getElementById('forward-btn');
const backwardBtn = document.getElementById('backward-btn');

function createAffirmationBox(imageUrl, name, description) {

    const affirmationContainer = document.createElement('div');
    affirmationContainer.className = 'affirmation-container';

        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = 'Affirmation Image';

        const affirmationInfor = document.createElement('div');
        affirmationInfor.className =  "affirmation-info";


        const affirmationName = document.createElement('h3');
        affirmationName.className =  "affirmation-name";
        affirmationName.textContent = name;

        const affirmationDescription = document.createElement('p');
        affirmationDescription.className =  "affirmation-description";
        affirmationDescription.textContent = description;

        affirmationInfor.append(affirmationName);
        affirmationInfor.append(affirmationDescription);
        
        affirmationContainer.append(image);
        affirmationContainer.append(affirmationInfor);

       return affirmationContainer;
    
}

function showImage(index) {

    const affirmation = affirmations[index];
    const imageUrl = affirmation.image;
    const name = affirmation.name;
    const description = affirmation.description;

    // Create the affirmation box
    const affirmationBox = createAffirmationBox(imageUrl, name, description);

    // Clear existing content in the image-box div
    imageBox.innerHTML = '';

    // Append the new affirmation box to the image-box div
    imageBox.appendChild(affirmationBox);

}


forwardBtn.addEventListener('click',() => {
    currIndex = (currIndex + 1) % affirmations.length;
    showImage(currIndex);
})

backwardBtn.addEventListener('click', () => {
    currIndex = (currIndex - 1 + affirmations.length) % affirmations.length;
    showImage(currIndex);
});

fetchImages();

