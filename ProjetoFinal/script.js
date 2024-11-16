function openNewTaskModal() {
    // Define o título do modal como "Nova Tarefa"
    document.getElementById("modalTitle").innerText = "Nova Tarefa";

    // Limpa todos os campos do modal
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
    document.getElementById("taskAssignee").value = "";
    document.getElementById("taskUrgency").value = "1";
    document.getElementById("taskDate").value = "";
    document.getElementById("taskColumn").value = "backlog";

    // Exibe o modal
    document.getElementById("taskModal").style.display = "flex";
}

function openEditTaskModal(task) {
    document.getElementById("modalTitle").innerText = "Editar Tarefa";

    // Preenche os campos do modal com os dados da tarefa
    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskDescription").value = task.description;
    document.getElementById("taskAssignee").value = task.assignee;
    document.getElementById("taskUrgency").value = task.urgency;
    document.getElementById("taskDate").value = task.date;
    document.getElementById("taskColumn").value = task.column;

    // Exibe o botão de exclusão
    document.getElementById("deleteButton").style.display = "inline-block";

    // Exibe o modal
    document.getElementById("taskModal").style.display = "flex";
}


function closeModal() {
    document.getElementById("taskModal").style.display = "none";
}

// Função que abre o modal tanto para nova tarefa quanto para edição
function openTaskModal(task = null) {
    document.getElementById("taskModal").style.display = "flex";

    if (task) {
        // Preenche os campos do modal com as informações da tarefa
        document.getElementById("modalTitle").innerText = "Editar Tarefa";
        document.getElementById("taskTitle").value = task.title;
        document.getElementById("taskDescription").value = task.description;
        document.getElementById("taskAssignee").value = task.assignee;
        document.getElementById("taskUrgency").value = task.urgency;
        document.getElementById("taskDate").value = task.date;
        document.getElementById("taskColumn").value = task.column;

        // Atribui o ID da tarefa ao modal para editar
        document.getElementById("taskModal").setAttribute("data-task-id", task.id);
    } else {
        // Configuração para uma nova tarefa
        document.getElementById("modalTitle").innerText = "Nova Tarefa";
        document.getElementById("taskTitle").value = "";
        document.getElementById("taskDescription").value = "";
        document.getElementById("taskAssignee").value = "";
        document.getElementById("taskUrgency").value = "1";
        document.getElementById("taskDate").value = "";
        document.getElementById("taskColumn").value = "backlog";

        // Remove o ID para indicar criação de nova tarefa
        document.getElementById("taskModal").removeAttribute("data-task-id");
    }
}

function saveTask() {
    const taskId = document.getElementById("taskModal").getAttribute("data-task-id");
    const taskTitle = document.getElementById("taskTitle").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const taskAssignee = document.getElementById("taskAssignee").value;
    const taskUrgency = document.getElementById("taskUrgency").value;
    const taskDate = document.getElementById("taskDate").value;
    const taskColumn = document.getElementById("taskColumn").value;

    if (taskTitle) {
        const tasks = getTasks();

        if (taskId) {
            // Edita a tarefa existente
            createNotification(`Tarefa editada com sucesso`, "#4CAF50")
            const taskIndex = tasks.findIndex(task => task.id === parseInt(taskId));
            tasks[taskIndex] = { ...tasks[taskIndex], title: taskTitle, description: taskDescription, assignee: taskAssignee, urgency: taskUrgency, date: taskDate, column: taskColumn };
        }
        else {
            // Cria uma nova tarefa
            const newTask = {
                id: tasks.length + 1,
                title: taskTitle,
                description: taskDescription,
                assignee: taskAssignee,
                urgency: taskUrgency,
                date: taskDate,
                column: taskColumn
            };
            createNotification("Tarefa criada com sucesso", "#4CAF50")
            tasks.push(newTask);
        }

        setTasks(tasks);
        loadTasks();
        closeModal();
    }
    else{
        createNotification("Insira ao menos um título", "rgb(250, 96, 96)")
    }
}

function deleteTask() {
    // Obtém o ID da tarefa que está sendo editada
    const taskId = document.getElementById("taskModal").getAttribute("data-task-id");

    if (taskId) {
        // Recupera as tarefas do localStorage
        const tasks = getTasks();

        // Filtra para excluir a tarefa correspondente
        const updatedTasks = tasks.filter(task => task.id !== parseInt(taskId));

        // Atualiza as tarefas no localStorage
        setTasks(updatedTasks);

        // Recarrega as tarefas na interface
        loadTasks();

        // Fecha o modal
        closeModal();

        // Exibe uma notificação de exclusão
        createNotification("Tarefa excluída com sucesso!", "#4CAF50");
    } else {
        // Caso o ID não seja encontrado, exibe um aviso
        createNotification("Erro ao excluir tarefa!", "rgb(250, 96, 96)");
    }
}


function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function setTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const columns = {
        backlog: document.getElementById("backlog"),
        development: document.getElementById("development"),
        completed: document.getElementById("completed")
    };

    Object.values(columns).forEach(column => column.innerHTML = column.querySelector("h2").outerHTML);

    const tasks = getTasks();
    tasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.draggable = true;
        taskElement.ondragstart = (event) => event.dataTransfer.setData('text', task.id);

        // Configura o modal de edição ao clicar no card
        taskElement.onclick = () => openTaskModal(task);

        // Configuração da cor da data
        const taskDate = new Date(task.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let dateClass = "date-future";
        if (taskDate < today) {
            dateClass = "date-past";
        } else if (taskDate.getTime() === today.getTime()) {
            dateClass = "date-today";
        }

        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p><strong>Responsável:</strong> ${task.assignee}</p>
            <p><strong>Urgência:</strong> ${task.urgency}</p>
            <p class="task-date ${dateClass}"><strong>Data:</strong> ${task.date}</p>
        `;

        columns[task.column].appendChild(taskElement);
    });
}


function createNotification(message, color = "rgb(250, 96, 96)") {
    const notificationContainer = document.getElementById("notificationsContainer");
    const notification = document.createElement("div");
    notification.classList.add("notification");
    if (color === "#4CAF50") notification.classList.add("green");
    notification.style.backgroundColor = color;

    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close-btn" onclick="this.parentElement.remove()">✖</button>
    `;

    notificationContainer.appendChild(notification);

    setTimeout(() => {
        if (notificationContainer.contains(notification)) {
            notification.remove();
        }
    }, 10000);
}

function drop(event) {
    event.preventDefault();

    const column = event.currentTarget;
    if (!column.classList.contains("column")) return;

    const taskId = event.dataTransfer.getData('text');
    const tasks = getTasks();
    const task = tasks.find(t => t.id === parseInt(taskId));
    if (task) {
        task.column = column.id;
        setTasks(tasks);
        loadTasks();

        createNotification(`${task.title} adicionado a ${column.querySelector("h2").innerText}`, "#4CAF50");
    }
}

function allowDrop(event) {
    event.preventDefault();
}

function checkTaskDeadlines() {
    const tasks = getTasks();
    const today = new Date();
    let showNotification = false;

    tasks.forEach(task => {
        if (task.column.toLowerCase() === "completed") return;
        const taskDate = new Date(task.date);
        const daysDifference = Math.floor((taskDate - today) / (1000 * 60 * 60 * 24));

        if (daysDifference >= 0 && daysDifference <= 3) {
            showNotification = true;
        }
    });

    if (showNotification) {
        createNotification("Você tem tarefas pendentes!", "rgb(250, 96, 96)");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkTaskDeadlines();
    loadTasks();
});
