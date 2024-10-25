let elementCounter = 0;
let selectedElement = null;

// Show Insert Tab
function showInsertTab() {
  document.getElementById("insertTab").style.display = "block";
}

// Insert Text Box
function insertTextBox() {
  let textBox = document.createElement("div");
  textBox.className = "text-box";
  textBox.contentEditable = true;
  textBox.style.top = "50px";
  textBox.style.left = "50px";
  textBox.innerText = "Text";
  textBox.id = `element-${elementCounter++}`;
  textBox.onclick = selectElement;
  document.getElementById("canvas").appendChild(textBox);
  makeElementDraggable(textBox);
}

// Upload and Add Image
function uploadImage() {
  document.getElementById("imageUpload").click();
}

function loadImage(event) {
  let file = event.target.files[0];
  let reader = new FileReader();

  reader.onload = function(e) {
    let img = document.createElement("img");
    img.src = e.target.result;
    img.style.width = "100px";
    img.style.position = "absolute";
    img.style.top = "50px";
    img.style.left = "50px";
    img.id = `element-${elementCounter++}`;
    img.onclick = selectElement;
    document.getElementById("canvas").appendChild(img);
    makeElementDraggable(img);
  };

  reader.readAsDataURL(file);
}

// Insert Shapes (Rectangle, Circle, Line)
function addShape(type) {
  let shape = document.createElement("div");
  shape.className = "shape-box";
  shape.style.position = "absolute";
  shape.style.top = "50px";
  shape.style.left = "50px";
  shape.style.backgroundColor = "#007bff";
  shape.id = `element-${elementCounter++}`;

  switch (type) {
    case 'rectangle':
      shape.style.width = "100px";
      shape.style.height = "50px";
      break;
    case 'circle':
      shape.style.width = "50px";
      shape.style.height = "50px";
      shape.style.borderRadius = "50%";
      break;
    case 'line':
      shape.style.width = "200px";
      shape.style.height = "2px";
      shape.style.backgroundColor = "#000";
      break;
  }

  shape.onclick = selectElement;
  document.getElementById("canvas").appendChild(shape);
  makeElementDraggable(shape);
}

// Select an element on the canvas
function selectElement(event) {
  selectedElement = event.target;
}

// Make elements draggable
function makeElementDraggable(element) {
  let isMouseDown = false;
  let offsetX, offsetY;

  element.onmousedown = function(e) {
    isMouseDown = true;
    selectedElement = element;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  };

  document.onmouseup = function() {
    isMouseDown = false;
  };

  document.onmousemove = function(e) {
    if (isMouseDown) {
      selectedElement.style.top = (e.clientY - offsetY) + "px";
      selectedElement.style.left = (e.clientX - offsetX) + "px";
    }
  };
}
