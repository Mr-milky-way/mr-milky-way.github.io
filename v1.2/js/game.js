// hello, this is outred. im guessing if youre looking at this file you have programming knowledge, and this file is detailed with comments so you know what everything does. please dont skid this, it took me awhile. this script powers the game page - i.e. the search bar and each individual game tile, + the iframe for each game. please exuse any mistakes, because i am not that good at javascript and i am still learning :)

// fetches all the game tile data from the games.json file
fetch('json/games.json')
// selects search bar
  .then(response => response.json())
  .then(data => {
    const gamesContainer = document.querySelector('.games');
    const searchInput = document.querySelector('.search-input');

    // Render the initial grid of images
    renderGrid(data);

    // Add an event listener to the search input that filters the grid as the user types
    searchInput.addEventListener('input', event => {
      const searchQuery = event.target.value.toLowerCase();
      const filteredData = data.filter(item => item.title.toLowerCase().includes(searchQuery));
      if (filteredData.length === 0) {
        // Display message when there are no matching search results
        gamesContainer.innerHTML = '<center><p class="no-results-message">No results found. Join the <a class="hyperlink" href="discord.gg/PBmrGy8EPh">Discord server</a> to request a game.</p></center>';
      } else {
        // Render the grid of images for the matching search results
        renderGrid(filteredData);
      }
    });
// polyfill for webp image for mobile user
!function(){var e=document.createElement("script");e.src="https://unpkg.com/webp-hero@0.0.2/dist-cjs/polyfills.js",document.head.appendChild(e);var t=document.createElement("script");t.src="https://unpkg.com/webp-hero@0.0.2/dist-cjs/webp-hero.bundle.js",document.head.appendChild(t),e.onload=t.onload=function(){var n=new webpHero.WebpMachine;n.polyfillDocument()}}();


    function renderGrid(items) {
      // Clear the current contents of the games container
      gamesContainer.innerHTML = '';
      //`<img src="${item.image}" alt="${item.title}" <h2>${item.title}</h2>';

      // Render the grid of images
      items.forEach(item => {
        const game = document.createElement('div');
        game.classList.add('game');
        game.innerHTML = `<div onclick="localStorage.setItem('currentgame', '${item.link}'); localStorage.setItem('currenttitle', '${item.title}'); localStorage.setItem('currentdescription', '${item.description}'); window.location.href = '/g/load.html';"><img src="${item.image}" loading="lazy"; alt="${item.title}" draggable="false"><h2>${item.title}</h2></div>`;
        gamesContainer.appendChild(game);

         // Add event listener to the game element to show the iframe popup
        game.addEventListener("click", () => {
           //Create the iframe element
          const iframe = document.createElement("iframe");
          iframe.src = item.link;

          
 // Create the fullscreen button element 
 const fullscreenBtn = document.createElement("button");
 fullscreenBtn.innerText = "Fullscreen";

 // Add a click event listener to the fullscreen button element that will make the iframe element go fullscreen
 fullscreenBtn.addEventListener("click", () => {
   if (iframe.requestFullscreen) {
     iframe.requestFullscreen();
   } else if (iframe.webkitRequestFullscreen) { // Safari
     iframe.webkitRequestFullscreen();
   } else if (iframe.msRequestFullscreen) { // IE11
     iframe.msRequestFullscreen();
   }

 });

          // Add styles to make the iframe appear as a popup
          iframe.style.position = "fixed";
          iframe.style.top = "50%";
          iframe.style.left = "50%";
          iframe.style.transform = "translate(-50%, -50%)";
          iframe.style.zIndex = "999";
          iframe.style.height = "85%";
          iframe.style.width = "85%";
          iframe.style.borderRadius = "12px";
          iframe.style.border = "3px solid black";
          iframe.style.filter = "none";
          iframe.style.boxShadow = "0px 0px 35px #000000";

          // makes the back arrow button to exit the iframe, also with css 
          // select the body and button with const variable
          const body = document.querySelector('body');
          const backButton = document.createElement('button');
          backButton.innerText = '→';
          backButton.style.position = 'fixed';
          backButton.style.top = '7.5%';
          backButton.style.left = '93%';
          backButton.style.padding = '8px';
          backButton.style.borderRadius = '12px';
          backButton.style.color = 'white';
          backButton.style.backgroundColor = '#A020F0';
          backButton.style.border = 'none';
          backButton.style.fontSize = '18px';
          backButton.style.zIndex = '1000';
          backButton.h
          // make the back and fullscreen buttons disappear when back button is clicked
          backButton.addEventListener('click', removeBlur, () => {
            body.style.filter = 'none';
            backButton.style.display = 'none';
            
            iframe.remove();
          });

          // function to remove blur after back button is clicked
          function removeBlur() {
            var allElements = Array.from(document.body.querySelectorAll('*'));
            allElements.forEach(function(element) {
              element.style.filter = "none";
              backButton.style.display = 'none';
              body.style.filter = 'none';
              fullscreenButton.style.display = 'none';
              iframe.remove();
            });
          }
          
          document.body.appendChild(backButton);
          // code that makes the fullscreen button to make the iframe fullscreen

          // select the fullscreen button and making it a const variable
          const fullscreenButton = document.createElement("fullscreenButton");
          // select the body tag and making it a const variable
          const body1 = document.getElementsByTagName("body")[0]
          fullscreenButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen" viewBox="0 0 16 16"> <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/> </svg>';
          fullscreenBtn.classList.add("fullscreen-btn");
          fullscreenButton.style.position = 'fixed';
          fullscreenButton.style.top = '14%';
          fullscreenButton.style.left = '93%';
          fullscreenButton.style.padding = '8px';
          fullscreenButton.style.borderRadius = '12px';
          fullscreenButton.style.color = 'white';
          fullscreenButton.style.backgroundColor = '#A020F0';
          fullscreenButton.style.border = 'none';
          fullscreenButton.style.zIndex = '1000';
          fullscreenButton.style.margin = "0";
          fullscreenButton.addEventListener("click", () => {
            if (iframe.requestFullscreen) {
              iframe.requestFullscreen();
            } else if (iframe.webkitRequestFullscreen) {
              iframe.webkitRequestFullscreen();
            } else if (iframe.msRequestFullscreen) {
              iframe.msRequestFullscreen();
            }
          });

          // get all elements within the body except the iframe
          const elementsToBlur = Array.from(document.body.querySelectorAll('*:not(iframe)'));

          // apply blur filter to all elements except the iframe
          elementsToBlur.forEach(function(element) {
          element.style.filter = "blur(5px)";
          });

           // keep the iframe from being blurred
           iframe.style.filter = 'none';
           backButton.style.filter = 'none';


          // Add a fullscreen mode listener to the document
  document.addEventListener("keydown", (event) => {
    if (event.keyCode === 70) { // "f" key
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
      }
    }
  });


// add the fullscreen button to the document
          document.body.appendChild(fullscreenButton);  
          // Add the iframe to the document
          document.body.appendChild(iframe);
        });
      });
    }
  });  