const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");

function updateTaskVisibility() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filterValue = filterSelect.value;

    for (const li of taskList.children) {
        const textSpan = li.querySelector("span");
        const taskText = textSpan ? textSpan.textContent.toLowerCase() : "";
        const completed = li.classList.contains("completed");

        const matchesSearch = searchTerm === "" || taskText.includes(searchTerm);
        const matchesFilter =
            filterValue === "all" ||
            (filterValue === "completed" && completed) ||
            (filterValue === "incomplete" && !completed);

        li.style.display = matchesSearch && matchesFilter ? "" : "none";
    }
}

function toggleTaskCompletion(checkbox, li, editBtn) {
    if (checkbox.checked) {
        li.classList.add("completed");
        editBtn.disabled = true;
        editBtn.style.opacity = "0.5";
        editBtn.style.cursor = "not-allowed";
    } else {
        li.classList.remove("completed");
        editBtn.disabled = false;
        editBtn.style.opacity = "1";
        editBtn.style.cursor = "pointer";
    }
}

function startEditingTask(li, textSpan, editBtn) {
    const input = document.createElement("input");
    input.type = "text";
    input.value = textSpan.textContent;

    input.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            editBtn.click();
        }
    });

    li.replaceChild(input, textSpan);
    editBtn.textContent = "✅";
    li.classList.add("editing");
    input.focus();
}

function finishEditingTask(li, textSpan, editBtn) {
    const input = li.querySelector("input[type='text']");
    const newText = input.value.trim();

    if (newText !== "") {
        textSpan.textContent = newText;
        li.replaceChild(textSpan, input);
        editBtn.textContent = "↩️";
        li.classList.remove("editing");
        updateTaskVisibility();
    }
}

function createTaskElement(taskText) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    li.appendChild(checkbox);

    const textSpan = document.createElement("span");
    textSpan.textContent = taskText;
    li.appendChild(textSpan);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = "delete-btn";
    deleteBtn.setAttribute("aria-label", "Excluir tarefa");
    deleteBtn.addEventListener("click", function() {
        taskList.removeChild(li);
    });
    li.appendChild(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.textContent = "↩️";
    editBtn.className = "edit-btn";
    editBtn.setAttribute("aria-label", "Editar tarefa");

    checkbox.addEventListener("change", function() {
        toggleTaskCompletion(checkbox, li, editBtn);
    });

    editBtn.addEventListener("click", function() {
        if (!li.classList.contains("editing")) {
            startEditingTask(li, textSpan, editBtn);
        } else {
            finishEditingTask(li, textSpan, editBtn);
        }
    });

    li.appendChild(editBtn);
    return li;
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const li = createTaskElement(taskText);
        taskList.appendChild(li);
        taskInput.value = "";
        taskInput.focus();
    }
}

searchInput.addEventListener("input", updateTaskVisibility);
filterSelect.addEventListener("change", updateTaskVisibility);
addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});

searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        updateTaskVisibility();
    }
});

