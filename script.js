// Function to retrieve tasks from local storage
function getTasksFromStorage() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return storedTasks;
}

// Function to save tasks to local storage
function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to delete a task
function deleteTask(taskId) {
    const tasks = getTasksFromStorage();
    const updatedTasks = tasks.filter(task => task.id !== taskId);

    updateTaskList(updatedTasks);
    saveTasksToStorage(updatedTasks);
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const tasks = getTasksFromStorage();
        const taskId = Date.now().toString(); // Use timestamp as a unique identifier

        tasks.push({ id: taskId, text: taskText, completed: false });

        updateTaskList(tasks);
        saveTasksToStorage(tasks);

        taskInput.value = '';
    }
}

// Function to update the task list in the UI
function updateTaskList(tasks) {
    const taskListContainer = document.getElementById('taskList');
    taskListContainer.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        if (task.completed) {
            taskElement.classList.add('completed');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskCompletion(task.id));

        const text = document.createElement('span');
        text.textContent = task.text;

        const icons = document.createElement('div');
        icons.className = 'icons';

        const editIcon = document.createElement('span');
        editIcon.textContent = '✎';
        editIcon.className = 'edit-icon';
        editIcon.addEventListener('click', () => editTask(task.id));

        const trashIcon = document.createElement('span');
        trashIcon.textContent = '🗑️';
        trashIcon.className = 'trash-icon';
        trashIcon.addEventListener('click', () => deleteTask(task.id));

        icons.appendChild(editIcon);
        icons.appendChild(trashIcon);

        taskElement.appendChild(checkbox);
        taskElement.appendChild(text);
        taskElement.appendChild(icons);

        taskListContainer.appendChild(taskElement);
    });

    console.log('Updated task list:', tasks); // Debugging statement
}

// Function to toggle task completion
function toggleTaskCompletion(taskId) {
    const tasks = getTasksFromStorage();
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        updateTaskList(tasks);
        saveTasksToStorage(tasks);
    }
}

// Function to edit a task
function editTask(taskId) {
    const tasks = getTasksFromStorage();
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
        const newText = prompt('Edit task:', tasks[taskIndex].text);
        if (newText !== null) {
            tasks[taskIndex].text = newText;
            updateTaskList(tasks);
            saveTasksToStorage(tasks);
        }
    }
}

// Initial load
const initialTasks = getTasksFromStorage();
console.log('Initial tasks from storage:', initialTasks); // Debugging statement
updateTaskList(initialTasks);