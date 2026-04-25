// Task add form

const taskInput = document.getElementById("task-inp");
const addTask = document.getElementById("task-btn");
const message = document.getElementById("empty-message");
const task = document.getElementById("added-task");
let taskList = [];
console.log(taskList);
addTask.addEventListener("click", (e) => {
  e.preventDefault();
  const currentValue = taskInput.value.trim(); // .trim() prevents adding empty spaces 
if(!currentValue){
    return
}else{
    message.style.display = "none"
}

  // 1. Create the li
  const li = document.createElement("li");
  // 2. Create the checkbox and delete button
  const checkbox = document.createElement("input");
  const deleteBtn = document.createElement("button");
  checkbox.type = "checkbox";
  checkbox.className = "task-check";
  deleteBtn.type = "button";
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete"
  // 3. Create a span or text node for the task text
  const taskText = document.createTextNode(" " + currentValue);
  // 4. Assemble: Add text box first and then text to the li
  li.appendChild(checkbox);
  li.appendChild(taskText);
  li.appendChild(deleteBtn);
  // 5. Add finished li to the list
  task.appendChild(li);
  // 6. Make the delete button functional
  deleteBtn.addEventListener("click",()=>{
    li.remove();
    // Check if list is empty to show message again
    if(task.children.length===0){
        message.style.display = "block";
    }

  })
  taskInput.value = ""
});

