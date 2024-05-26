 let keysPressed = [];

      document.addEventListener('keydown', (event) => {
        keysPressed.push(event.key);

     
        keysPressed = [...new Set(keysPressed)];

        if (keysPressed.length === 3 && keysPressed.includes('o') && keysPressed.includes('p') && keysPressed.includes('d')) {
          runMyFunction();
          keysPressed = []; 
        }
      });

      document.addEventListener('keyup', () => {
        keysPressed = [];
      });

      function runMyFunction() {
        openPopup()
      }

      const form = document.querySelector('form');
      const passwordInput = document.getElementById('password');
      const correctPassword = 'OP*2001';

      form.addEventListener('submit', (event) => {
        if (passwordInput.value !== correctPassword) {
          event.preventDefault();
          alert('BAD PASSWORD RETARD');
        }
      });

      function openPopup() {
        document.getElementById("popup").style.display = "block";
      }

      function closePopup() {
        document.getElementById("popup").style.display = "none";
      }

function openMenu() {
  document.getElementById("menu").style.width = "100%";
}
  
function closeMenu() {
  document.getElementById("menu").style.width = "0";
}

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
