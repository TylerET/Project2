// Make elements draggable
function dragElement(element) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  //If the window has a child with the titlebar id, it will only allow dragging from the titlebar.
  if (document.getElementById(element.id + "-title-bar")) {
    document.getElementById(element.id + "-title-bar").onmousedown =
      dragMouseDown;
  } else {
    //Else just make the whole window draggable.
    element.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e.preventDefault();
    //This takes the current position of the mouse/widow, so that we can compare it to the new position once dragged
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    //Calculates the new position of the element and adjusts the element to that
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = element.offsetTop - pos2 + "px";
    element.style.left = element.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // remves the event listener when user stops dragging element
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  dragElement(document.getElementById("aboutMeWindow"));
  dragElement(document.getElementById("contactMeWindow"));
});

function openWindow(id) {
  var element = document.getElementById(id);
  element.style.display = "block";
  dragElement(element);
}

function closeWindow(id) {
  document.getElementById(id).style.display = "none";
}

function resizeMouseDown(e) {
  e.preventDefault();
  // Initialize starting position
  pos3 = e.clientX;
  pos4 = e.clientY;
  document.onmouseup = stopResize;
  document.onmousemove = elementResize;
}
