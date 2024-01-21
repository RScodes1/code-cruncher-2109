

let colorData = [];

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

/*Sandesh js start*/
/*Guided Meditation Start*/
let currentIndex = 0;
let data;
        function fetchImage() {
          fetch('https://mock-final-copy-api.onrender.com/mh-media')
            .then(response => response.json())
            .then(data1 => {data=data1;displayImage(data1)})
            .catch(error => console.error('Error fetching data:', error));
        }
      
        function displayImage(data) {
          const gmImageDiv = document.getElementById('gmImage');
          gmImageDiv.innerHTML = '';
      
          const imageObject = data[currentIndex];
          const imageElement = document.createElement('img');
          imageElement.src = imageObject.image;
          gmImageDiv.appendChild(imageElement);
      
          const linkElement = document.createElement('a');
          linkElement.href = imageObject.link;
          linkElement.target="_blank";
          linkElement.textContent = imageObject.name;
          gmImageDiv.appendChild(linkElement);
        }
      
        function prevImage() {
          currentIndex = (currentIndex - 1 + data.length) % data.length;
          displayImage(data);
        }
      
        function nextImage() {
          currentIndex = (currentIndex + 1) % data.length;
          displayImage(data);
        }

        fetchImage();
/*Guided Meditation End*/
/*Audio Story Start*/
const itemsPerPage = 1;
let currentPage = 1;
let imageData;
function fetchImages() {
    fetch('https://mock-final-copy-api.onrender.com/imagery-Data')
      .then(response => response.json())
      .then(data1 => {imageData=data1;displayImages(data1);generatePagination()})
      .catch(error => console.error('Error fetching data:', error));
  }

function displayImages() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const gmImageDiv = document.getElementById('asImage');
    gmImageDiv.innerHTML = ''; 

    for (let i = startIndex; i < endIndex; i++) {
        if (imageData[i]) {
            const imageObject = imageData[i];
            //const imageContainer = document.createElement('div');
            //imageContainer.className = 'image-container';

            const imageElement = document.createElement('img');
            imageElement.src = imageObject.image;
            //imageContainer.appendChild(imageElement);
            gmImageDiv.appendChild(imageElement);

            const linkElement = document.createElement('a');
            linkElement.href = imageObject.link;
            linkElement.target="_blank";
            linkElement.textContent = imageObject.name;
            //linkElement.textContent = imageObject.link;
            //imageContainer.appendChild(linkElement);
            gmImageDiv.appendChild(linkElement);

            //gmImageDiv.appendChild(imageElement,linkElement);
        }
    }
}

function generatePagination() {
    const totalPages = Math.ceil(imageData.length / itemsPerPage);
    const paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.textContent = i;
        li.addEventListener('click', () => {
            currentPage = i;
            displayImages();
            updatePaginationStyle();
        });

        if (i === currentPage) {
            li.style.fontWeight = 'bold';
        }

        paginationElement.appendChild(li);
    }
}

function updatePaginationStyle() {
    const paginationElement = document.getElementById('pagination');
    const paginationItems = paginationElement.getElementsByTagName('li');

    for (let i = 0; i < paginationItems.length; i++) {
        if (i + 1 === currentPage) {
            paginationItems[i].style.fontWeight = 'bold';
        } else {
            paginationItems[i].style.fontWeight = 'normal';
        }
    }
}

fetchImages();
/*Audio Story End*/
/*Sandesh js end*/
