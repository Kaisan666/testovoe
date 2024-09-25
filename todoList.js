document.querySelector(".todoList_btn").addEventListener("click", (e) =>{
    document.querySelector(".todoList_wrapper").classList.toggle("active_wrapper")
    setTimeout(()=>document.querySelector(".todoList").classList.toggle("active_todoList"), 1 )
    
}
    
)