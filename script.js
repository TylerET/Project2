"use strict";
// z index counter so when you move a window it will appear over other windows
let zIndexMax = 0;

// Make elements draggable
function dragElement(element) {
  let pos1 = 0,
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
    zIndexMax++;
    document.onmouseup = removeMouseEvents;
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
    element.style.zIndex = zIndexMax;
  }

  function removeMouseEvents() {
    // remves the event listener when user stops dragging/resizing element
    document.onmouseup = null;
    document.onmousemove = null;
  }

  if (document.getElementById(element.id + "-resize-handle")) {
    // gets the resize div and adds event if it exists
    let resizeHandle = document.getElementById(element.id + "-resize-handle");
    resizeHandle.onmousedown = resizeMouseDown;
  }

  function resizeMouseDown(e) {
    e.preventDefault();
    // Gets starting positions
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = removeMouseEvents;
    document.onmousemove = elementResize;
  }

  function elementResize(e) {
    e.preventDefault();
    // Calculate new sizes
    let pos1 = pos3 - e.clientX;
    let pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    var newWidth = element.offsetWidth - pos1;
    var newHeight = element.offsetHeight - pos2;
    // Windows were able to be resized off screen, this checks if the new size compared to the screen size
    let maxWidth = window.innerWidth - element.offsetLeft - 4;
    let taskbarHeight = document.getElementById("taskbar").offsetHeight;
    let maxHeight = window.innerHeight - element.offsetTop - taskbarHeight;
    if (newWidth > maxWidth) {
      newWidth = maxWidth;
    }
    if (newHeight > maxHeight) {
      newHeight = maxHeight;
    }
    // checks for a minimum so they can't resize the window too small to interact with
    if (newWidth < 100) newWidth = 100;
    if (newHeight < 50) newHeight = 50;

    // Apply new sizes to element
    element.style.width = newWidth + "px";
    element.style.height = newHeight + "px";
  }

  // TODO prevent moving a window offscreen from stretching the page
}

document.addEventListener("DOMContentLoaded", function () {
  addEventListenerToWindows();
});

function addEventListenerToWindows() {
  const windows = document.getElementsByClassName("window");
  Array.from(windows).forEach((window) => {
    dragElement(window);
  });
}

function openWindow(id) {
  let element = document.getElementById(id);
  element.style.display = "block";
  dragElement(element);
}

function toggleNav() {
  let element = document.getElementById("taskbarMenu");
  let current = element.style.display;
  element.style.display = current == "none" ? "block" : "none";
}

function closeWindow(id) {
  document.getElementById(id).style.display = "none";
}
