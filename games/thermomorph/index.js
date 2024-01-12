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