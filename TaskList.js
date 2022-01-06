// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListers();

//Load all event listeners
function loadEventListers(){

      /// DOM Load Event
      document.addEventListener('DOMContentLoaded', getTasks);
      //Add task event
      form.addEventListener('submit',addTask);

      //remove task
      taskList.addEventListener('click', removeTasks);

      // Clear Task
      clearBtn.addEventListener('click', clearTask);

      // Filter Task
      filter.addEventListener('keyup', filterTask);
}

//--- Get Task From Local Storage
function getTasks(){
      let tasks;
      if(localStorage.getItem('tasks') === null){
            tasks = [];
      }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
      }

      tasks.forEach(function(task){
            // Create li element
      const li = document.createElement('li');
      // Add Class
      li.className = 'collection-item';
      // Create text node and append to li
      li.appendChild(document.createTextNode(task));

      // Create New Link Element
      const link = document.createElement('a');
      //  Add a class
      link.className = 'delete-item secondary-content';
      //  Add icon html
      link.innerHTML = '<i class="fas fa-times"></i>';
      //  Append the link to li
      li.appendChild(link);

      //  Append li to ul
      taskList.appendChild(li);
      })
}

//Add Task
function addTask(e){

      if(taskInput.value === ''){
            alert('Add a task');
      }else{
             // Create li element
      const li = document.createElement('li');
      // Add Class
      li.className = 'collection-item';
      // Create text node and append to li
      li.appendChild(document.createTextNode(taskInput.value));

      // Create New Link Element
      const link = document.createElement('a');
      //  Add a class
      link.className = 'delete-item secondary-content';
      //  Add icon html
      link.innerHTML = '<i class="fas fa-times"></i>';
      //  Append the link to li
      li.appendChild(link);

      //  Append li to ul
      taskList.appendChild(li);

      // Store in LS
      storeTaskInLocalStorage(taskInput.value);

      // Clear input 
      taskInput.value = '';

      e.preventDefault();
      }

}

//--------Store in Local Storage
function storeTaskInLocalStorage(task){
      let tasks;
      if(localStorage.getItem('tasks') === null){
            tasks = [];
      }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
      }

      tasks.push(task);

      localStorage.setItem('tasks', JSON.stringify(tasks));
}

//-------Remove tasks
function removeTasks(e){

      if(e.target.parentElement.classList.contains('delete-item')){
            if(confirm('Are You Sure?')){
                  e.target.parentElement.parentElement.remove();

                  //Remove from LS
                  removeTasksFromLocalStorage(e.target.parentElement.parentElement);
            }
           
      }
}


//-------Romove Task From Ls
function removeTasksFromLocalStorage(taskItem){
      let tasks;
      if(localStorage.getItem('tasks') === null){
            tasks =[];
      }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
      }

      tasks.forEach(function(task, index){
            if(taskItem.textContent === task){
                  tasks.splice(index, 1);
            }
      });

      localStorage.setItem('tasks', JSON.stringify(tasks));
}



///------Clear Tasks
function clearTask(e){
    // taskList.innerHTML = '';

    //Faster
    while(taskList.firstChild){
          taskList.removeChild(taskList.firstChild);
    }
    //jsperf.com/innerhtml-vs-removechild

    ///    Clear Task from LS
    clearTaskFromLocalStorage();
}

    ///    Clear Task from LS
function clearTaskFromLocalStorage(){
      localStorage.clear();
}


 ///------Filter Task
 function filterTask(e){
      const text = e.target.value.toLowerCase();
      
      document.querySelectorAll('.collection-item').forEach(function(task){
            const item = task.firstChild.textContent;

            if(item.toLowerCase().indexOf(text) != -1){
                  task.style.display = 'block';
            }else{
                  task.style.display = 'none';
            }
      });

}
