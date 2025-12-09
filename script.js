let tasks = JSON.parse(localStorage.getItem("tasks")) || [
];
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function renderTasks() {
    taskList.innerHTML = "";
    const sorted = tasks
        .map((task, index) => ({ ...task, index })) 
        .sort((a, b) => a.completed - b.completed);
    sorted.forEach(taskObj => {
        const li = document.createElement("li");
        li.className = `task-item ${taskObj.completed ? "completed" : ""}`;
        li.innerHTML = `
            <div class="task-content">
                <input type="checkbox" class="task-checkbox"
                    ${taskObj.completed ? "checked" : ""}
                    data-i="${taskObj.index}">
                <span class="task-text">${taskObj.description}</span>
            </div>
            <button class="delete-button" data-i="${taskObj.index}">
                <i class="material-icons">delete</i>
            </button>
            `;
        taskList.appendChild(li);
    });
    attachListeners();
}

function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.push({ description: text, completed: false });
    taskInput.value = "";
    save();
    renderTasks();
}

function toggleTask(i) {
    tasks[i].completed = !tasks[i].completed;
    save();
    renderTasks();
}

function deleteTask(i) {
    tasks.splice(i, 1);
    save();
    renderTasks();
}

function attachListeners() {
    document.querySelectorAll(".task-checkbox").forEach(checkbox => {
        checkbox.addEventListener("change", e => {
            toggleTask(e.target.dataset.i);
        });
    });

    document.querySelectorAll(".delete-button").forEach(btn => {
        btn.addEventListener("click", e => {
            deleteTask(e.currentTarget.dataset.i);
        });
    });
}

addTaskButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => {
    if (e.key === "Enter") addTask();
});
renderTasks();
