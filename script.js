document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Display tasks
    function displayTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function(task, index) {
            const li = document.createElement('li');
            li.textContent = task;
            
            // Add event listener to toggle task completion
            li.addEventListener('click', function() {
                toggleTaskCompletion(index);
            });
            
            // Add line-through style for completed tasks
            if (task.startsWith('✔')) {
                li.style.textDecoration = 'line-through';
            }
            
            // Create delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '❌';
            deleteBtn.classList.add('delete-btn'); // Add a class for styling
            deleteBtn.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent task toggle when clicking delete button
                deleteTask(index);
            });
            li.appendChild(deleteBtn);
            
            taskList.appendChild(li);
        });
    }

    // Function to toggle task completion
    function toggleTaskCompletion(index) {
        tasks[index] = tasks[index].startsWith('✔') ? tasks[index].substring(2) : '✔ ' + tasks[index];
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }

    // Function to delete task
    function deleteTask(index) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }

    displayTasks();

    // Add new task
    addTaskBtn.addEventListener('click', function() {
        const task = taskInput.value.trim();
        if (task !== '') {
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            displayTasks();
            taskInput.value = '';
        }
    });
});
