// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load All Event Listener

loadEventListeners();

// Load all event listener
function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add task event
    form.addEventListener('submit', addTask);
    // remove task event 
    taskList.addEventListener('click', removeTask);
    // clear task event
    clearBtn.addEventListener('click', clearTask);
    // filter task event
    filter.addEventListener('keyup', filterTask);


}

// store task
function getTasks(task){
    let tasks;
    if(localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        // create li element
        const li = document.createElement('li');
        // add class
        li.classList = 'collection-item';
        // create text node and append to li
        li.appendChild(document.createTextNode(task));
        // create new link element
        const link = document.createElement('a');
        //add class
        link.className = 'delete-item secondary-content';
        //add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //append the link to li
        li.appendChild(link);
        console.log(li);
        // Append li to ul
        taskList.appendChild(li);
    });


}


// Add Task
function addTask(e){

    if(taskInput.value === '') {
        alert('add a task');
    }
    // create li element
    const li = document.createElement('li');
    // add class
    li.classList = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);
    console.log(li);
    // Append li to ul
    taskList.appendChild(li);

    // store in local storage
    storeTaskInLocalStorage(taskInput.value);



    // Clear input
    taskInput.value = '';

    e.preventDefault();
};

// store task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks))
}


//remove task
function removeTask(e){
    // only delete when i is clicked
    if(e.target.parentElement.classList.contains('delete-item')){
        if (confirm('Are you sure')){
        e.target.parentElement.parentElement.remove();

        // remove form local storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// remove form local storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);

        }
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



// clear task
function clearTask(e){
    //taskList.innerHTML = '';

    // loop though faster
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
        //https://stackoverflow.com/questions/62630808/why-removechild-faster-than-innerhtml#:~:text=As%20a%20rule%20of%20thumb,Therefore%20removeChild%20is%20faster.
    }

    // clear from local storage
    clearTaskFromLocalStorage();
}

    // clear from local storage
function clearTaskFromLocalStorage(){
    localStorage.clear();
}

// filter tasks
function filterTask(e){
     const text = e.target.value.toLowerCase();
     document.querySelectorAll('.collection-item').forEach(function(task){
        const item = taks.firstChild.textContent;
        if (item.toLowerCase().indexOf(text)!=-1){
            task.style.display = 'block'; // show

        } else {
            taks.style.display = 'none'; // hide
        }
     });


}