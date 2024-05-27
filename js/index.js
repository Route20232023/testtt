
const todoAddButton = document.getElementById("todo-button");
const taskInputAdd = document.getElementById("taskInput");
var todosContainer = document.getElementById("todos-container");
let allTodos = []
let completedTodos = []
let unCompletedTodos = []
var SelectInput = document.getElementById("mySelect");
if(localStorage.getItem("allTodos") != null){
  allTodos = JSON.parse(localStorage.getItem("allTodos"))
}
displayData(allTodos)
todoAddButton.addEventListener('click',function(e){
  e.preventDefault()
  addTodo()
})
function addTodo(){
  var newTodo = {
    task:taskInputAdd.value,
    isCompleted : false,
    id:`${Math.random()*10000}-${Math.random()*10000}`
  }
  console.log(newTodo);
  console.log(allTodos);
  allTodos.push(newTodo);
  localStorage.setItem('allTodos',JSON.stringify(allTodos))
  displayData(allTodos)
}
function displayData(arr){
  var cartoona = "";
 for (var  todo of arr) {
  cartoona+=`
  <div class="col-11 todo ${todo.isCompleted == true ? "completed" : ""} ">
  <div class="row bg-dark">
    <div class="col-8  py-3 fs-5">${todo.task}</div>
    <div class="col-2  py-3 bg-success d-flex justify-content-center" onclick="beCompleted('${todo.id}')"><i class="fa-solid fa-check fs-3  d-flex align-items-center"></i></div>
    <div class="col-2  py-3 bg-danger d-flex justify-content-center" onclick=" deleteTodo('${todo.id}')" ><i class="fa-solid fa-trash fs-3  d-flex align-items-center"></i></div>
  </div>
</div>
  `
 }
 todosContainer.innerHTML =cartoona
}
function beCompleted(id){
var theIndex = allTodos.findIndex(function(todo){return todo.id == id })
if(theIndex != -1){
  allTodos[theIndex].isCompleted = allTodos[theIndex].isCompleted  == true ? false :true
  localStorage.setItem("allTodos" ,JSON.stringify(allTodos))
  displayDataAccordingToSelectValue()
}else{
  console.log("not found");
}

console.log(id);
}
SelectInput.addEventListener('change',function(){
  console.log(SelectInput.options[SelectInput.options.selectedIndex].value);
  displayDataAccordingToSelectValue()
})
function displayDataAccordingToSelectValue(){
  console.log(SelectInput.options[SelectInput.options.selectedIndex].value);
  switch(SelectInput.options[SelectInput.options.selectedIndex].value){
    case 'all':
      console.log("all dis");
      displayData(allTodos);
      break;
      case 'completed':
        console.log("comp dis");
      var completedTodos = allTodos.filter(function(todo){return todo.isCompleted == true})
      console.log(completedTodos);
      displayData(completedTodos)
      break;
      case 'uncompleted' : 
      var unCompletedTodos = allTodos.filter(function(todo){return todo.isCompleted == false})
      console.log(unCompletedTodos);
      displayData(unCompletedTodos)
  }
}
function deleteTodo(id){
  var todoIndex = allTodos.findIndex(function(todo){return todo.id == id });
  if(todoIndex !=-1){
    allTodos.splice(todoIndex , 1)
    localStorage.setItem('allTodos', JSON.stringify(allTodos))
    displayDataAccordingToSelectValue()
  }
}





