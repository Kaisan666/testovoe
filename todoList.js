const todoListWrapper = document.querySelector(".todoList_wrapper")
const todoListHtml = document.querySelector(".todoList")
document.querySelector(".todoList_btn").addEventListener("click", () => {
  if (!todoListWrapper.classList.contains("active_wrapper")){
  todoListWrapper.classList.add("active_wrapper")
    setTimeout(() => todoListHtml.classList.add("active_todoList"), 1)
  }
  else{
    todoListHtml.classList.remove("active_todoList")
    setTimeout(()=> todoListWrapper.classList.remove("active_wrapper"), 100)
  }})

  
  let todoList = [];
  window.onload = () => {
    todoList = JSON.parse(localStorage.getItem("todoList"));
    displayTodo();
  };
  
  const inputToDo = document.querySelector(".todoInput"),
    todo = document.querySelector(".todo");
  
  inputToDo.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      if (inputToDo.value) {
        const newTodo = {
          id: Date.now(),
          todo: inputToDo.value,
          checked: false,
        };
        todoList.push(newTodo);
        displayTodo();
        setTodoToLS();
        inputToDo.value = "";
      } else {
        createError();
      }
    }
  });
  
  todo.addEventListener("click", makeChacked);
  function makeChacked(e) {
    if (e.target.type == "checkbox") {
      const parent = e.target.closest("li");
      const taskId = Number(parent.id);
      parent.classList.toggle("checked");
      todoList.find((todo) => {
        if (todo.id == taskId) {
          if (todo.checked == true) {
            todo.checked = false;
          } else {
            todo.checked = true;
          }
        }
      });
    }
    setTodoToLS()
  }
  
  todo.addEventListener("click", deleteTask);
  function deleteTask(e) {
    if (e.target.dataset.action == "delete") {
      const parent = e.target.closest("li");
      const taskId = Number(parent.id);
      todoList = todoList.filter((todo) => {
        return todo.id != taskId;
      });
    }
    setTodoToLS();
    displayTodo();
  }
  
  const delete_selectedBtn = document.querySelector(".delete_selected");
  delete_selectedBtn.addEventListener("click", () => {
    todoList = todoList.filter((todo) => {
      return todo.checked === false;
    });
    setTodoToLS();
    displayTodo();
  });
  
  function setTodoToLS() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }
  function displayTodo() {
    let tasksToset = "";
    todoList.forEach((task) => {
      tasksToset += `<li class="todo_item ${task.checked === true ? "checked" : ""} todoElement" id='${task.id}' >
                      <input class="todo_checkbox" type ='checkbox' id='${task.id}' ${task.checked === true ? "checked" : ""}>
                      <span class="todo_text" for="${task.id}">${task.todo}</span>
                      <button class="delete_task" data-action = "delete">🗑️</button>
              </li>`;
    });
  
    todo.innerHTML = tasksToset;
  }
  if(/Android|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)) {
    document.addEventListener("click", (e)=>{
      const todoElement = document.querySelectorAll(".todoElement")
      todoElement.forEach( elem => {
        elem.addEventListener("click", (e) =>{
          e.stopPropagation(); // Останавливаем распространение события
        })
      })
        if(todoListHtml.classList.contains("active_todoList")){
        todoListHtml.classList.remove("active_todoList")
    setTimeout(()=> todoListWrapper.classList.remove("active_wrapper"), 100)
  }})
    }

function createError(){
  
  const error = `
  <div class="error">
    <span>Ошибка</span>
    <span>Сначала введите задачу</span>
  </div>
  `
  const existingError = document.querySelector(".error");
    if (existingError) {
        return
    }
  todoListHtml.insertAdjacentHTML("beforebegin", error)
  setTimeout(()=>document.querySelector(".error").classList.add("error_active"), 100)
  setTimeout(()=> {
    const error = document.querySelector(".error")
    error.classList.remove("error_active")
    setTimeout(() =>{
      error.remove()
    },250)
  },2000)
}