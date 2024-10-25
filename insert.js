let elementCounter = 0;
let selectedElement = null;


// Show the Insert Tab
function showInsertTab() {
  document.getElementById("insertTab").style.display = "block";
}

// Delete selected element
function deleteElement() {
  if (selectedElement) {
    selectedElement.remove();
    selectedElement = null;
  }
}

// Resize selected element
function resizeElement(width, height) {
  if (selectedElement) {
    selectedElement.style.width = `${width}px`;
    selectedElement.style.height = `${height}px`;
  }
}

// Dynamically insert a Text Box
function insertTextBox() {
  const textBox = document.createElement("div");
  textBox.className = "text-box";
  textBox.contentEditable = true;
  textBox.style.position = "absolute";
  textBox.style.top = "50px";
  textBox.style.left = "50px";
  textBox.textContent = "Enter text here";
  textBox.id = `element-${elementCounter++}`;
  textBox.onclick = selectElement;
  document.getElementById("canvas").appendChild(textBox);
  makeElementDraggable(textBox);
}

// Upload and insert an image
function uploadImage() {
  document.getElementById("imageUpload").click();
}

// Load the uploaded image to the canvas
function loadImage(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = document.createElement("img");
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

// Insert a symbol
function insertSymbol(symbol) {
  const symbolElement = document.createElement("div");
  symbolElement.innerHTML = symbol;
  symbolElement.style.fontSize = "50px";
  symbolElement.style.position = "absolute";
  symbolElement.style.top = "50px";
  symbolElement.style.left = "50px";
  symbolElement.id = `element-${elementCounter++}`;
  symbolElement.onclick = selectElement;
  document.getElementById("canvas").appendChild(symbolElement);
  makeElementDraggable(symbolElement);
}

// Insert a 2x2 table with adjustable rows and columns
function insertTable(rows = 2, cols = 2) {
  const table = document.createElement("table");
  table.style.border = "1px solid black";
  table.style.position = "absolute";
  table.style.top = "50px";
  table.style.left = "50px";

  for (let i = 0; i < rows; i++) {
    const row = table.insertRow();
    for (let j = 0; j < cols; j++) {
      const cell = row.insertCell();
      cell.style.border = "1px solid black";
      cell.style.padding = "10px";
      cell.textContent = `Row ${i + 1}, Col ${j + 1}`;
    }
  }
  table.id = `element-${elementCounter++}`;
  table.onclick = selectElement;
  document.getElementById("canvas").appendChild(table);
  makeElementDraggable(table);
}

// Insert Word Art with color options
function insertWordArt(color = "#ff0000") {
  const wordArt = document.createElement("div");
  wordArt.className = "text-box";
  wordArt.contentEditable = true;
  wordArt.style.position = "absolute";
  wordArt.style.top = "50px";
  wordArt.style.left = "50px";
  wordArt.textContent = "Word Art";
  wordArt.style.fontSize = "30px";
  wordArt.style.fontFamily = "Impact";
  wordArt.style.color = color;
  wordArt.id = `element-${elementCounter++}`;
  wordArt.onclick = selectElement;
  document.getElementById("canvas").appendChild(wordArt);
  makeElementDraggable(wordArt);
}




// Insert equation into the canvas
function insertEquation() {
    const equationType = document.getElementById("equationType").value;
    let equationText = "";

    switch (equationType) {
        case "quadratic":
            equationText = "x = (-b ± √(b² - 4ac)) / 2a";
            break;
        case "pythagorean":
            equationText = "a² + b² = c²";
            break;
        case "euler":
            equationText = "e^(iπ) + 1 = 0";
            break;
        case "binomial":
            equationText = "(a + b)^n = Σ[n,k] * a^(n-k) * b^k";
            break;
        case "areaCircle":
            equationText = "A = πr²";
            break;
        default:
            equationText = "";
            break;
    }

    if (equationText) {
        let equationElement = document.createElement("div");
        equationElement.classList.add("equation");
        equationElement.textContent = equationText;
        equationElement.style.fontSize = "16px";
        equationElement.style.fontFamily = "Arial";
        equationElement.style.position = "absolute";
        equationElement.style.top = "50px";
        equationElement.style.left = "50px";
        equationElement.setAttribute("id", `element-${elementCounter++}`);
        equationElement.onclick = selectElement;
        document.getElementById('canvas').appendChild(equationElement);
        makeElementDraggable(equationElement);
    }
}





// Screenshot placeholder with resize and adjustments
function insertScreenshot() {
  const img = document.createElement("img");
  img.src = "https://via.placeholder.com/200x100";
  img.style.position = "absolute";
  img.style.top = "50px";
  img.style.left = "50px";
  img.style.width = "200px";
  img.style.height = "100px";
  img.id = `element-${elementCounter++}`;
  img.onclick = selectElement;
  document.getElementById("canvas").appendChild(img);
  makeElementDraggable(img);
}

// Insert a basic shape (rectangle or circle)
function addShape(type) {
  const shape = document.createElement("div");
  shape.className = "shape-box";
  shape.style.position = "absolute";
  shape.style.top = "50px";
  shape.style.left = "50px";
  shape.id = `element-${elementCounter++}`;

  if (type === "rectangle") {
    shape.style.width = "100px";
    shape.style.height = "50px";
    shape.style.backgroundColor = "#007bff";
  } else if (type === "circle") {
    shape.style.width = "50px";
    shape.style.height = "50px";
    shape.style.borderRadius = "50%";
    shape.style.backgroundColor = "#007bff";
  }
  
  shape.onclick = selectElement;
  document.getElementById("canvas").appendChild(shape);
  makeElementDraggable(shape);
}

// Make elements draggable
function makeElementDraggable(element) {
  let offsetX, offsetY;
  element.onmousedown = function(e) {
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    document.onmousemove = function(event) {
      element.style.top = `${event.clientY - offsetY}px`;
      element.style.left = `${event.clientX - offsetX}px`;
    };
  };
  document.onmouseup = function() {
    document.onmousemove = null;
  };
}



// Function to select an element when clicked (shape or text)
function selectElement(event) {
    selectedElement = event.target;
}

// Function to change the color of the selected shape
function changeShapeColor() {
    if (selectedElement && selectedElement.classList.contains('shape-box')) {
        const color = document.getElementById("shapeColor").value;
        selectedElement.style.backgroundColor = color;
    }
}

// Function to change the color of the selected text or WordArt
function changeTextColor() {
    if (selectedElement && (selectedElement.classList.contains('text-box') || selectedElement.classList.contains('insertwordart'))) {
        const color = document.getElementById("textColor").value;
        selectedElement.style.color = color;
    }
}

// Example: Add shape with event listener to select it for applying color
function addRectangle() {
    let rectangle = document.createElement("div");
    rectangle.classList.add("shape-box");
    rectangle.style.width = "100px";
    rectangle.style.height = "100px";
    rectangle.style.backgroundColor = "#f00"; // Default color
    rectangle.style.position = "absolute";
    rectangle.style.top = "50px";
    rectangle.style.left = "50px";
    rectangle.setAttribute("id", `element-${elementCounter++}`);
    rectangle.onclick = selectElement;
    document.getElementById('canvas').appendChild(rectangle);
    makeElementDraggable(rectangle);
}

// Example: Add text box with event listener to select it for applying color
function addTextBox() {
    let textBox = document.createElement("div");
    textBox.classList.add("text-box");
    textBox.contentEditable = true;
    textBox.style.top = "50px";
    textBox.style.left = "50px";
    textBox.style.fontSize = "16px";
    textBox.style.fontFamily = "Arial";
    textBox.style.color = "#000"; // Default color
    textBox.setAttribute("id", `element-${elementCounter++}`);
    textBox.onclick = selectElement;
    document.getElementById('canvas').appendChild(textBox);
    makeElementDraggable(textBox);
}

// Make elements draggable (from previous code)
function makeElementDraggable(element) {
    let isMouseDown = false;
    let offsetX, offsetY;

    element.onmousedown = function (e) {
        isMouseDown = true;
        selectedElement = element; // Set the selected element
        offsetX = e.offsetX;
        offsetY = e.offsetY;
    };

    document.onmouseup = function () {
        isMouseDown = false;
    };

    document.onmousemove = function (e) {
        if (isMouseDown) {
            element.style.top = (e.clientY - offsetY) + "px";
            element.style.left = (e.clientX - offsetX) + "px";
        }
    };
}


// Function to select an element
function selectElement(event) {
  selectedElement = event.target;
}
function insertChart() {
    const chart = document.createElement("div");
    chart.innerHTML = "<svg width='200' height='100'><rect width='50' height='100' style='fill:blue;'/><rect x='60' width='50' height='50' style='fill:red;'/></svg>";
    chart.style.position = "absolute";
    chart.style.top = "50px";
    chart.style.left = "50px";
    chart.id = `element-${elementCounter++}`;
    chart.onclick = selectElement;
    document.getElementById("canvas").appendChild(chart);
    makeElementDraggable(chart);
  }

// Adjust font color for selected Word Art
function changeWordArtColor(color) {
  if (selectedElement && selectedElement.classList.contains("text-box")) {
    selectedElement.style.color = color;
  }
}

// Table adjustment with row and column selection
function adjustTable(rows, cols) {
  if (selectedElement && selectedElement.tagName === "TABLE") {
    selectedElement.innerHTML = "";
    for (let i = 0; i < rows; i++) {
      const row = selectedElement.insertRow();
      for (let j = 0; j < cols; j++) {
        const cell = row.insertCell();
        cell.style.border = "1px solid black";
        cell.style.padding = "10px";
        cell.textContent = `Row ${i + 1}, Col ${j + 1}`;
      }
    }
  }
}

// // Add options for symbol and icon dropdowns
// function populateDropdown(dropdownId, options) {
//   const dropdown = document.getElementById(dropdownId);
//   dropdown.innerHTML = ""; // Clear existing options
//   options.forEach(option => {
//     const item = document.createElement("option");
//     item.textContent = option;
//     dropdown.appendChild(item);
//   });
// }

// // Populate symbol and icon dropdowns with sample data
// populateDropdown("symbolsDropdown", ["★", "♥", "✓", "♠"]);
// populateDropdown("iconsDropdown", ["😊", "📷", "🎨", "🛠"]);
  


// Function to insert a symbol
function insertSymbol() {
    const symbol = document.getElementById("symbolSelect").value;
    const symbolElement = document.createElement("div");
    symbolElement.classList.add("symbol-icon");
    symbolElement.textContent = symbol;
    symbolElement.style.fontSize = "24px";
    symbolElement.style.position = "absolute";
    symbolElement.style.top = "50px";
    symbolElement.style.left = "50px";
    symbolElement.setAttribute("contenteditable", "true");
    document.getElementById('canvas').appendChild(symbolElement);
    makeElementDraggable(symbolElement);
}

// Function to insert an icon
function insertIcon() {
    const icon = document.getElementById("iconSelect").value;
    const iconElement = document.createElement("div");
    iconElement.classList.add("symbol-icon");
    iconElement.textContent = icon;
    iconElement.style.fontSize = "24px";
    iconElement.style.position = "absolute";
    iconElement.style.top = "50px";
    iconElement.style.left = "50px";
    iconElement.setAttribute("contenteditable", "true");
    document.getElementById('canvas').appendChild(iconElement);
    makeElementDraggable(iconElement);
}

// Make elements draggable
function makeElementDraggable(element) {
    let isMouseDown = false;
    let offsetX, offsetY;

    element.onmousedown = function (e) {
        isMouseDown = true;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
    };

    document.onmouseup = function () {
        isMouseDown = false;
    };

    document.onmousemove = function (e) {
        if (isMouseDown) {
            element.style.top = (e.clientY - offsetY) + "px";
            element.style.left = (e.clientX - offsetX) + "px";
        }
    };
}

// Function to change font color
function changeFontColor() {
    const fontColor = document.getElementById("fontColor").value;
    if (selectedElement) {
        selectedElement.style.color = fontColor;
    }
}

// Function to highlight text
function highlightText() {
    const highlightColor = document.getElementById("highlightColor").value;
    if (selectedElement) {
        selectedElement.style.backgroundColor = highlightColor;
    }
}

// Function to add a bullet list
function addBullet() {
    if (selectedElement && selectedElement.tagName === "DIV") {
        let bulletList = document.createElement("ul");
        bulletList.classList.add("bullet-list");
        
        let listItem = document.createElement("li");
        listItem.textContent = "New Bullet Item";
        bulletList.appendChild(listItem);
        
        selectedElement.appendChild(bulletList);
    }
}

// Function to add a numbered list
function addNumberedList() {
    if (selectedElement && selectedElement.tagName === "DIV") {
        let numberedList = document.createElement("ol");
        numberedList.classList.add("numbered-list");
        
        let listItem = document.createElement("li");
        listItem.textContent = "New Numbered Item";
        numberedList.appendChild(listItem);
        
        selectedElement.appendChild(numberedList);
    }
}
// Function to open the comment box
function openCommentBox() {
    if (selectedElement) {
        document.getElementById("commentBox").style.display = "block";
    } else {
        alert("Please select an element to add a comment.");
    }
}

// Function to close the comment box
function closeCommentBox() {
    document.getElementById("commentBox").style.display = "none";
    document.getElementById("commentText").value = ''; // Clear text area
}

// Function to add a comment
function addComment() {
    const commentText = document.getElementById("commentText").value;
    if (commentText && selectedElement) {
        // Create a new list item to display the comment
        const commentItem = document.createElement("li");
        commentItem.classList.add("comment-item");
        commentItem.textContent = `Comment on ${selectedElement.id}: ${commentText}`;
        
        // Append comment to the comments list
        document.getElementById("commentsList").appendChild(commentItem);
        
        // Optionally store comment as a data attribute on the selected element
        if (!selectedElement.comments) {
            selectedElement.comments = [];
        }
        selectedElement.comments.push(commentText);
        
        closeCommentBox(); // Close the comment box
    } else {
        alert("Please enter a comment.");
    }
}

// Function to select an element when clicked and store it as selected
function selectElement(event) {
    selectedElement = event.target;
}