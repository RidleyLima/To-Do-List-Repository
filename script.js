const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

addButton.addEventListener("click", function() {
    let taskText = taskInput.value.trim();
    if (taskText !== "") {
        const li = document.createElement("li");
        const textSpan = document.createElement("span");
        textSpan.textContent = taskText;
        li.appendChild(textSpan);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.className = "delete-btn";
        deleteBtn.setAttribute('aria-label', 'Excluir tarefa');
        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(li);
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        taskInput.value = "";
        taskInput.focus();
    }
});

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addButton.click();
    }
});

