const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

addButton.addEventListener("click", function() {
    let taskText = taskInput.value.trim();
    if (taskText !== "") {
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
        deleteBtn.setAttribute('aria-label', 'Excluir tarefa');
        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(li);
        });
        li.appendChild(deleteBtn);

        const editBtn = document.createElement("button");
        editBtn.textContent = "↩️";
        editBtn.className = "edit-btn";
        editBtn.setAttribute('aria-label', 'Editar tarefa');
        
        checkbox.addEventListener('change', function() {
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
        });
        
        editBtn.addEventListener('click', function() {
            const isEditing = li.classList.contains("editing");
            
            if (!isEditing) {
                const input = document.createElement("input");
                input.type = "text";
                input.value = textSpan.textContent;
                
                li.replaceChild(input, textSpan);
                editBtn.textContent = "✅";
                li.classList.add("editing");
                input.focus();
            } else {
                const input = li.querySelector("input[type='text']");
                const newText = input.value.trim();
                
                if (newText !== "") {
                    textSpan.textContent = newText;
                    li.replaceChild(textSpan, input);
                    editBtn.textContent = "↩️";
                    li.classList.remove("editing");
                }
            }
        });
        li.appendChild(editBtn);

        taskList.appendChild(li);
        taskInput.value = "";
        taskInput.focus();
    }
});


taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addButton.click();
    }
});

