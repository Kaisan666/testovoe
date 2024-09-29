document.querySelector(".todoList_btn").addEventListener("click", (e) => {
    document.querySelector(".todoList_wrapper").classList.toggle("active_wrapper");
    setTimeout(() => document.querySelector(".todoList").classList.toggle("active_todoList"),1);
  });
  
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
        console.log(newTodo);
        console.log(todoList);
      } else {
        alert("Сначала введите задачу");
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
          console.log("ХУЙ");
          if (todo.checked == true) {
            todo.checked = false;
          } else {
            todo.checked = true;
          }
        }
      });
      console.log(taskId);
      console.log(todoList);
    }
    setTodoToLS()
  }
  
  todo.addEventListener("click", deleteTask);
  function deleteTask(e) {
    if (e.target.dataset.action == "delete") {
      console.log("ХУЙ");
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
      // console.log(todo.checked === true)
      return todo.checked === false;
    });
    // todoList.find((todo)=>{
    //     if (todo.checked === true){
    //         console.log(todo)
    //         todoList.splice(todoList.indexOf(todo), 1)
    //         displayTodo()
  
    //     }
    // })
    setTodoToLS();
    displayTodo();
    console.log(todoList);
  });
  
  function setTodoToLS() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }
  function displayTodo() {
    let tasksToset = "";
    todoList.forEach((task) => {
      tasksToset += `<li class="todo_item ${task.checked === true ? "checked" : ""}" id='${task.id}' >
                  <div class="todo_item_task">
                      <input class="todo_checkbox" type ='checkbox' id='${task.id}' ${task.checked === true ? "checked" : ""}>
                      <span class="todo_text" for="${task.id}">${task.todo}</span>
                      <button class="delete_task" data-action = "delete">🗑️</button>
                  </div>
              </li>`;
    });
  
    todo.innerHTML = tasksToset;
  }
  if (/Android|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)) {
    document.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log(e.target)
      
  })};