//Selectors
const todoInput = document.querySelector('.todo_input');
const todoButton = document.querySelector('.todo_button');
const todoList = document.querySelector('.todo_list');
const filterOption = document.querySelector('.filter-todo');


//Event Listeners 
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);


//Functions
function addTodo(event){

    //Prevents form from submitting 
    event.preventDefault();

    //Create Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create li
    const newTodo = document.createElement('li');
    newTodo.innerHTML = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Add todo to local storage
    saveLocalTodos(todoInput.value);

    //Check mark button 
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);

    //Check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv);
    
    //Clear todo input value
    todoInput.value = "";
}

function deleteCheck(e)
{
    const item = e.target;

    //Delete todo
    if (item.classList[0] === "trash-btn")
    {
        //item.remove(); does not work, it deletes trash button instead
        //removing the parent element will delete the whole item 
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        //todo.remove(); using this just after the animation would
        //not let the animation run and immediately delete the item
        removeLocalTodos(todo);
        //This event listener waits for the above transition
        //to be completed before removing the item.
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });

    }

    //Check todo
    if(item.classList[0] === "completed-btn")
    {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        checkLocalTodos(todo);
    }

}


function filterTodo(e)
{
    const todos = todoList.childNodes;

    todos.forEach(function(todo)
    {
        switch(e.target.value)
        {
            case "all":
                todo.style.display = "flex";
                break;

            case "completed":
                if(todo.classList.contains("completed"))
                {
                    todo.style.display = "flex";
                }else 
                {
                    todo.style.display = "none";
                }
                break;

            case "uncompleted":
                if(!todo.classList.contains("completed"))
                {
                    todo.style.display = "flex";
                }else
                {
                    todo.style.display = "none";
                }
                break;
        }
    });
    //The problem with this is that after selecting an option,
    //I would have to click the arrow again for the filter
    //to work. Clicking the option once does not work.
}

function saveLocalTodos(todo)
{
    //Check for existing todo list to not overwrite it
    let todos;
    if(localStorage.getItem("todos") === null)
    {
        todos = [];
    }else
    {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos()
{
   //Check for existing todo list to not overwrite it
    let todos;
    if(localStorage.getItem("todos") === null)
    {
        todos = [];
    }else
    {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
    //Create Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create li
    const newTodo = document.createElement('li');
    newTodo.innerHTML = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Check mark button 
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);

    //Check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo)
{
    //Check for existing todo list to not overwrite it
    let todos;
    if(localStorage.getItem("todos") === null)
    {
        todos = [];
    }else
    {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    //Displays the text of the todo in the console when
    //the delete button is clicked.
    //It knows the delete button is clicked because this 
    //function is called in the deleteCheck function.
    // console.log(todo.children[0].innerText);
    // console.log(todos.indexOf("kiwi"));

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem("todos", JSON.stringify(todos));

}



function checkLocalTodos(todo)
{
    //Check for existing todo list to not overwrite it
    let todos;
    if(localStorage.getItem("todos") === null)
    {
        todos = [];
    }else
    {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    
    localStorage.setItem("todos", JSON.stringify(todos));

}