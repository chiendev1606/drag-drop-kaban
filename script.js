const addBtns = document.querySelectorAll(".add-btn:not(.solid)");
const saveItemBtns = document.querySelectorAll(".solid");
const addItemContainers = document.querySelectorAll(".add-container");
const addItems = document.querySelectorAll(".add-item");
// Item Lists
const draggedListArray = document.querySelectorAll(".drag-item-list");
const backlogList = document.getElementById("backlog-list");
const progressList = document.getElementById("progress-list");
const completeList = document.getElementById("complete-list");
const onHoldList = document.getElementById("on-hold-list");

// Items
let hasFirstLoadContent = false;
let currentItem;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];

// Drag Functionality
function allowDrop(e) {
  e.preventDefault();
}

function drag(column) {
  currentColumn = column;
  currentItem = e.target;
}

function dragStart(e) {
  draggedListArray[column].classList.add("over");
}

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem("backlogItems")) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ["Release the course", "Sit back and relax"];
    progressListArray = ["Work on projects", "Listen to music"];
    completeListArray = ["Being cool", "Getting stuff done"];
    onHoldListArray = ["Being uncool"];
  }
}

// Set localStorage Arrays
function updateSavedColumns() {
  localStorage.setItem("backlogItems", JSON.stringify(backlogListArray));
  localStorage.setItem("progressItems", JSON.stringify(progressListArray));
  localStorage.setItem("completeItems", JSON.stringify(completeListArray));
  localStorage.setItem("onHoldItems", JSON.stringify(onHoldListArray));
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // console.log("columnEl:", columnEl);
  // console.log("column:", column);
  // console.log("item:", item);
  // console.log("index:", index);
  // List Item
  const listEl = document.createElement("li");
  listEl.classList.add("drag-item");
  listEl.textContent = item;
  columnEl.appendChild(listEl);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!hasFirstLoadContent) {
    getSavedColumns();
  }
  // Backlog Column
  backlogListArray.forEach((item, idx) => {
    createItemEl(backlogList, 0, item, idx);
  });
  // Progress Column
  progressListArray.forEach((item, idx) => {
    createItemEl(progressList, 1, item, idx);
  });
  // Complete Column
  completeListArray.forEach((item, idx) => {
    createItemEl(completeList, 2, item, idx);
  });
  // On Hold Column
  onHoldListArray.forEach((item, idx) => {
    createItemEl(onHoldList, 3, item, idx);
  });
  // Run getSavedColumns only once, Update Local Storage
  updateSavedColumns();
  hasFirstLoadContent = true;
}

updateDOM();
