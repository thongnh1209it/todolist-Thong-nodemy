//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
todoButton.addEventListener("click", addTodo);
filterOption.addEventListener("change", filterTodo);
document.addEventListener("DOMContentLoaded", loadTodos);

//functions
function addTodo(event, todo = null) {
  event.preventDefault();
  //todo container
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //todo li
  const newTodo = document.createElement("li");
  console.log("inputt", todoInput);
  if (todo === null) {
    newTodo.innerText = todoInput.value;
    setLocalStorage(todoInput.value);
  } else {
    newTodo.innerText = todo;
  }

  todoInput.value = "";
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //todo buttons

  const checkMarkButton = document.createElement("button");
  checkMarkButton.addEventListener("click", e => {
    e.preventDefault();
    todoDiv.classList.toggle("completed");
  });
  checkMarkButton.innerHTML = '<i class="fas fa-check"></i>';
  checkMarkButton.classList.add("complete-btn");
  todoDiv.appendChild(checkMarkButton);

  const trashButton = document.createElement("button");

  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  trashButton.addEventListener("click", e => {
    todoDiv.classList.toggle("fall");
    let todos = JSON.parse(localStorage.getItem("todos"));

    let index = todos.indexOf(todoDiv.innerText);

    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));

    newTodo.innerText = "Finished :)";

    todoDiv.addEventListener("transitionend", () => {
      todoDiv.remove();
    });
  });

  //append to list
  todoList.appendChild(todoDiv);
}

function filterTodo(e) {
  console.log("click", e.target.value);
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
  console.log(todos);
}
function setLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos(e) {
  if (
    localStorage.getItem("todos") === "[]" ||
    localStorage.getItem("todos") === null
  ) {
    return;
  } else {
    let todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach(todo => {
      addTodo(e, todo);
    });
  }
}
