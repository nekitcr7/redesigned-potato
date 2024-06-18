document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();
    if (task) {
        const taskList = document.getElementById('taskList');
        const listItem = document.createElement('li');
        listItem.textContent = task;
        listItem.onclick = () => {
            listItem.remove();
            saveTasks();
        };
        taskList.appendChild(listItem);
        taskInput.value = '';
        saveTasks();
    }
}

function saveTasks() {
    const tasks = [];
    const taskList = document.getElementById('taskList').children;
    for (let task of taskList) {
        tasks.push(task.textContent);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    for (let task of tasks) {
        const listItem = document.createElement('li');
        listItem.textContent = task;
        listItem.onclick = () => {
            listItem.remove();
            saveTasks();
        };
        taskList.appendChild(listItem);
    }
}
