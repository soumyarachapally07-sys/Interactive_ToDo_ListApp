const taskInput = document.getElementById("taskInput");

const addButton = document.getElementById("addButton");

const taskList = document.getElementById("taskList");


// Get saved tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Display tasks when the page opens
displayTasks();


// Add task when button is clicked
addButton.addEventListener("click", addTask);


// Add task when Enter key is pressed
taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});


function addTask() {

    const taskText = taskInput.value.trim();


    // Check if input is empty
    if (taskText === "") {

        alert("Please enter a task!");

        return;
    }


    // Create a task object
    const task = {

        text: taskText,

        completed: false
    };


    // Add task to array
    tasks.push(task);


    // Save tasks
    saveTasks();


    // Clear input box
    taskInput.value = "";


    // Display tasks
    displayTasks();
}


function displayTasks() {

    // Clear old list
    taskList.innerHTML = "";


    tasks.forEach(function(task, index) {

        // Create list item
        const li = document.createElement("li");

        li.classList.add("task");


        // Create checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = task.completed;


        // Create task text
        const span = document.createElement("span");

        span.textContent = task.text;


        // Create delete button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.classList.add("delete-button");


        // If task is completed
        if (task.completed) {

            li.classList.add("completed");
        }


        // Checkbox event
        checkbox.addEventListener("change", function() {

            tasks[index].completed = checkbox.checked;

            saveTasks();

            displayTasks();
        });


        // Delete button event
        deleteButton.addEventListener("click", function() {

            tasks.splice(index, 1);

            saveTasks();

            displayTasks();
        });


        // Add elements to list item
        li.appendChild(checkbox);

        li.appendChild(span);

        li.appendChild(deleteButton);


        // Add list item to page
        taskList.appendChild(li);

    });
}


// Save tasks in localStorage
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));
}