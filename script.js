// Selectors
const inputForm = document.querySelector(".list-form");
const inputItem = document.querySelector(".input-item");
const list = document.querySelector(".list");
const deleteAllBtn = document.querySelector(".delete-all-btn");

// Listeners
inputForm.addEventListener("submit", addItem);
document.addEventListener("DOMContentLoaded", renderItemsFromLS);
list.addEventListener("click", deleteItem);
deleteAllBtn.addEventListener("click", deleteAllItems);

// Functions

function addItem(event) {
	event.preventDefault();

	if (inputItem.value === "") {
		alert("Type something");
	} else {
		let li = document.createElement("li");
		li.classList.add("list-item");
		li.innerHTML = inputItem.value;
		saveToLocalStorage(inputItem.value);

		let deleteLink = document.createElement("a");
		deleteLink.classList.add("item-delete");
		deleteLink.innerHTML = `<i class="icon-x-square"></i>`;

		li.appendChild(deleteLink);

		let divItemContainer = document.createElement("div");
		divItemContainer.classList.add("list-item-container");
		divItemContainer.appendChild(li);

		list.appendChild(divItemContainer);
	}
	inputItem.value = "";
}

function deleteItem(event) {
	if (event.target.parentElement.className === "item-delete") {
		const itemToBeDeleted =
			event.target.parentElement.parentElement.parentElement;
		console.log(itemToBeDeleted);
		deleteFromLS(itemToBeDeleted);
		itemToBeDeleted.innerHTML = "";
	}
}

function deleteAllItems(event) {
	event.preventDefault();
	list.innerHTML = "";
	localStorage.clear();
}

// LocalStorage

// Save
function saveToLocalStorage(todo) {
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}

// Render saved items
function renderItemsFromLS() {
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.forEach((todo) => {
		let li = document.createElement("li");
		li.classList.add("list-item");
		li.innerHTML = todo;

		let deleteLink = document.createElement("a");
		deleteLink.classList.add("item-delete");
		deleteLink.innerHTML = `<i class="icon-x-square"></i>`;

		li.appendChild(deleteLink);

		let divItemContainer = document.createElement("div");
		divItemContainer.classList.add("list-item-container");
		divItemContainer.appendChild(li);

		list.appendChild(divItemContainer);
	});
}

// Delete From LS
function deleteFromLS(todo) {
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}

	itemToDelete = todo.children[0].innerText;
	todos.splice(todos.indexOf(itemToDelete), 1);
	localStorage.setItem("todos", JSON.stringify(todos));
}
