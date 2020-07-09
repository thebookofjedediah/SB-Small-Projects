// Select commonly used elements for ease
const form = document.querySelector('#addTodo');
const todoList = document.querySelector("#todoList");
const todoInput = document.querySelector("#todoName");

function addToLocalStorage() {
  localStorage.myTodoList = todoList.innerHTML;
}

function populateList() {
    var storedValues = localStorage.myTodoList;
    if(!storedValues) {
      todoList.innerHTML = '<li><input type="checkbox"> Begin Your Todo List<button>X</button></li>'
    }
    else {
      todoList.innerHTML = storedValues;
    }
  }

// add event listener for the todo list, listen for a click and check if it is a input (checkbox) or a button
todoList.addEventListener('click', function(e){
  if(e.target.tagName === 'INPUT'){
    // get the li item
    const completed = e.target.parentElement;
    // cross out the todo
    completed.classList.toggle('finished');
  }
  if(e.target.tagName === 'BUTTON'){
    //remove the whole li
    e.target.parentElement.remove();
    addToLocalStorage();
  }
})

form.addEventListener('submit', function(e){
  // stop form from default refreshing behavior
  e.preventDefault();
  // Create new todo
  const newTodo = document.createElement('li');
  // create checkbox for new todo
  const checkBtn = document.createElement('input');
  //  create remove button for new todo 
  const removeBtn = document.createElement('button')
  // set checkbox attribute
  checkBtn.setAttribute('type', 'checkbox')
  // set removeBtn to X
  removeBtn.innerText = "X";
  // set new todo text to the form input value
  newTodo.innerText = todoName.value;
  // add checkbox to new todo
  newTodo.prepend(checkBtn);
  // add remove button to new todo
  newTodo.appendChild(removeBtn);
  // add new todo to the todo list
  todoList.appendChild(newTodo);
  // reset form input value
  todoName.value = '';
  addToLocalStorage();
})

populateList();