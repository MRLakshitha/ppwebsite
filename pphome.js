let currentSlide = 0;
let elementCounter = 0;
let selectedElement = null;

// Add a new slide
function addSlide() {
    currentSlide++;
    let slideList = document.getElementById("slidesList");
    let slideItem = document.createElement("li");
    slideItem.textContent = `Slide ${currentSlide}`;
    slideItem.setAttribute('onclick', `loadSlide(${currentSlide})`);
    slideList.appendChild(slideItem);
    clearCanvas();
}

// Load a slide
function loadSlide(slideNumber) {
    console.log("Loading Slide: " + slideNumber);
}

// Clear canvas for a new slide
function clearCanvas() {
    document.getElementById('canvas').innerHTML = '';
}

// Add a text box to the canvas
function addTextBox() {
    let textBox = document.createElement("div");
    textBox.classList.add("text-box");
    textBox.contentEditable = true;
    textBox.style.top = "50px";
    textBox.style.left = "50px";
    textBox.style.fontSize = "16px";
    textBox.style.fontFamily = "Arial";
    textBox.setAttribute("id", `element-${elementCounter++}`);
    textBox.onclick = selectElement;
    document.getElementById('canvas').appendChild(textBox);
    makeElementDraggable(textBox);
}

// Add a rectangle shape to the canvas
function addRectangle() {
    let rectangle = document.createElement("div");
    rectangle.classList.add("shape-box");
    rectangle.style.width = "100px";
    rectangle.style.height = "100px";
    rectangle.style.backgroundColor = "#f00";
    rectangle.style.top = "50px";
    rectangle.style.left = "50px";
    rectangle.setAttribute("id", `element-${elementCounter++}`);
    rectangle.onclick = selectElement;
    document.getElementById('canvas').appendChild(rectangle);
    makeElementDraggable(rectangle);
}

// Add a circle shape to the canvas
function addCircle() {
    let circle = document.createElement("div");
    circle.classList.add("shape-box");
    circle.style.width = "100px";
    circle.style.height = "100px";
    circle.style.backgroundColor = "#00f";
    circle.style.borderRadius = "50%";
    circle.style.top = "50px";
    circle.style.left = "50px";
    circle.setAttribute("id", `element-${elementCounter++}`);
    circle.onclick = selectElement;
    document.getElementById('canvas').appendChild(circle);
    makeElementDraggable(circle);
}


// Add a line shape to the canvas
function addLine() {
    let line = document.createElement("div");
    line.classList.add("shape-box");
    line.style.width = "200px";
    line.style.height = "2px";
    line.style.backgroundColor = "#000";
    line.style.top = "50px";
    line.style.left = "50px";
    line.setAttribute("id", `element-${elementCounter++}`);
    line.onclick = selectElement;
    document.getElementById('canvas').appendChild(line);
    makeElementDraggable(line);
}

function addShape() {
    if (selectedSlide) {
        const shape = document.createElement('div');
        shape.style.width = "100px";
        shape.style.height = "100px";
        shape.style.backgroundColor = "blue";
        shape.style.margin = "10px 0";
        shape.className = "shape-box";
        selectedSlide.appendChild(shape);

shape.draggable = true;
        shape.addEventListener('dragstart', dragStart);
    }
}

// Drag and drop for shapes
function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
}



// Delete a slide
function deleteSlide() {
    let slideList = document.getElementById("slidesList");
    if (slideList.childNodes.length > 0) {
        slideList.removeChild(slideList.lastChild);
        clearCanvas();
    }
}

// Font family, size, color changes
// function changeFontFamily() {
//     if (selectedElement) {
//         let fontFamily = document.getElementById("fontFamily").value;
//         selectedElement.style.fontFamily = fontFamily;
//     }
// }
document.addEventListener("DOMContentLoaded", () => {
    // Dynamically add font styles to the dropdown
    const fontFamilies = [
        "Arial", 
        "Times New Roman", 
        "Verdana", 
        "Courier New", 
        "Georgia", 
        "Comic Sans MS", 
        "Impact", 
        "Tahoma", 
        "Lucida Sans", 
        "Garamond", 
        "Palatino", 
        "Trebuchet MS"
    ];

    const fontFamilySelect = document.getElementById("fontFamily");

    fontFamilies.forEach(font => {
        const option = document.createElement("option");
        option.value = font;
        option.textContent = font;
        fontFamilySelect.appendChild(option);
    });
});

// Function to change font family
function changeFontFamily() {
    if (selectedElement) {
        let fontFamily = document.getElementById("fontFamily").value;
        selectedElement.style.fontFamily = fontFamily;
    }
}


function changeFontSize() {
    if (selectedElement) {
        let fontSize = document.getElementById("fontSize").value;
        selectedElement.style.fontSize = fontSize + 'px';
    }
}

function changeFontColor() {
    if (selectedElement) {
        let fontColor = document.getElementById("fontColor").value;
        selectedElement.style.color = fontColor;
    }
}

function toggleBold() {
    if (selectedElement) {
        if (selectedElement.style.fontWeight === "bold") {
            selectedElement.style.fontWeight = "normal";
        } else {
            selectedElement.style.fontWeight = "bold";
        }
    }
}

// Function to toggle italic
function toggleItalic() {
    if (selectedElement) {
        if (selectedElement.style.fontStyle === "italic") {
            selectedElement.style.fontStyle = "normal";
        } else {
            selectedElement.style.fontStyle = "italic";
        }
    }
}

// Function to toggle underline
function toggleUnderline() {
    if (selectedElement) {
        if (selectedElement.style.textDecoration === "underline") {
            selectedElement.style.textDecoration = "none";
        } else {
            selectedElement.style.textDecoration = "underline";
        }
    }
}

// Function to select the element
function selectElement(event) {
    selectedElement = event.target;
}

// Example: dynamically added event listener to select elements for applying styles
const textBoxes = document.querySelectorAll('.text-box'); // Add class text-box to your text containers
textBoxes.forEach(textBox => {
    textBox.addEventListener('click', selectElement);
});


// Text alignment controls
function alignText(alignment) {
    if (selectedElement) {
        selectedElement.style.textAlign = alignment;
    }
}

// Upload and add an image
function uploadImage() {
    document.getElementById('imageUpload').click();
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
        img.setAttribute("id", `element-${elementCounter++}`);
        img.onclick = selectElement;
        document.getElementById('canvas').appendChild(img);
        makeElementDraggable(img);
    };

    reader.readAsDataURL(file);
}

// Make elements draggable
function makeElementDraggable(element) {
    let isMouseDown = false;
    let offsetX, offsetY;

    element.onmousedown = function (e) {
        isMouseDown = true;
        selectedElement = element;
        element.classList.add("selected");
        offsetX = e.offsetX;
        offsetY = e.offsetY;
    };

    document.onmouseup = function () {
        isMouseDown = false;
        element.classList.remove("selected");
    };

    document.onmousemove = function (e) {
        if (isMouseDown) {
            element.style.top = (e.clientY - offsetY) + "px";
            element.style.left = (e.clientX - offsetX) + "px";
        }
    };
}

// Select an element when clicked
function selectElement(event) {
    selectedElement = event.target;
}
