function openMenu() {
  document.getElementById("menu").style.width = "100%";
}

function closeMenu() {
  document.getElementById("menu").style.width = "0";
}

const subtitle = document.getElementsByClassName("card-subtitle")[0];

const createWord = (text, index) => {
  const word = document.createElement("span");
  
  word.innerHTML = `${text} `;
  
  word.classList.add("card-subtitle-word");
  
  word.style.transitionDelay = `${index * 40}ms`;
  
  return word;
}

const addWord = (text, index) => subtitle.appendChild(createWord(text, index));

const createSubtitle = text => text.split(" ").map(addWord);

createSubtitle("Better than the one you just came from");


//Check if the page is loaded in an iframe
if(window.self != window.top) {
  //Almost all browsers will deny Cross-Origin script access, so
  //we will use a try-catch block
  try {
    if(window.parent.location.hostname.indexOf("mydomain.com") == -1) {
      window.location.href = "http://www.youtube.com/watch_popup?v=oHg5SJYRHA0";
    } else {
      //You are in an iframe but Same-Origin
    }
  } catch (ex) {
    //Congrats, you are in an iframe loaded in a stranger's site!
    window.location.href = "http://www.youtube.com/watch_popup?v=oHg5SJYRHA0";
  }
}