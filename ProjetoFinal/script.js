function openNewTaskModal() {
    // Abre o modal para criar uma nova tarefa
    document.getElementById("modalTitle").innerText = "Nova Tarefa"; // Define o título do modal como "Nova Tarefa"
    
    // Limpa os campos do modal para uma nova tarefa
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDescription").value = "";
    document.getElementById("taskAssignee").value = "";
    document.getElementById("taskUrgency").value = "1";
    document.getElementById("taskDate").value = "";
    document.getElementById("taskColumn").value = "backlog";

    // Exibe o modal de tarefa
    document.getElementById("taskModal").style.display = "flex";
}

function openEditTaskModal(task) {
    // Abre o modal para editar uma tarefa existente
    document.getElementById("modalTitle").innerText = "Editar Tarefa"; // Define o título do modal como "Editar Tarefa"
    
    // Preenche o modal com os dados da tarefa selecionada
    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskDescription").value = task.description;
    document.getElementById("taskAssignee").value = task.assignee;
    document.getElementById("taskUrgency").value = task.urgency;
    document.getElementById("taskDate").value = task.date;
    document.getElementById("taskColumn").value = task.column;

    // Exibe o botão de exclusão de tarefa
    document.getElementById("deleteButton").style.display = "inline-block";

    // Exibe o modal de tarefa
    document.getElementById("taskModal").style.display = "flex";
}

function closeModal() {
    // Fecha o modal de tarefa
    document.getElementById("taskModal").style.display = "none";
}

function openTaskModal(task = null) {
    // Abre o modal, configurando-o para criar nova tarefa ou editar uma existente
    document.getElementById("taskModal").style.display = "flex";

    if (task) {
        // Configura o modal para editar uma tarefa
        document.getElementById("modalTitle").innerText = "Editar Tarefa";
        document.getElementById("taskTitle").value = task.title;
        document.getElementById("taskDescription").value = task.description;
        document.getElementById("taskAssignee").value = task.assignee;
        document.getElementById("taskUrgency").value = task.urgency;
        document.getElementById("taskDate").value = task.date;
        document.getElementById("taskColumn").value = task.column;
        
        // Adiciona o ID da tarefa para referência durante a edição
        document.getElementById("taskModal").setAttribute("data-task-id", task.id);
    } else {
        // Configura o modal para criação de nova tarefa
        document.getElementById("modalTitle").innerText = "Nova Tarefa";
        document.getElementById("taskTitle").value = "";
        document.getElementById("taskDescription").value = "";
        document.getElementById("taskAssignee").value = "";
        document.getElementById("taskUrgency").value = "1";
        document.getElementById("taskDate").value = "";
        document.getElementById("taskColumn").value = "backlog";
        
        // Remove o ID para nova criação
        document.getElementById("taskModal").removeAttribute("data-task-id");
    }
}

function saveTask() {
    // Salva ou atualiza uma tarefa no armazenamento
    const modal = document.getElementById("taskModal");
    const taskId = modal.getAttribute("data-task-id");
    const taskTitle = document.getElementById("taskTitle").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const taskAssignee = document.getElementById("taskAssignee").value;
    const taskUrgency = document.getElementById("taskUrgency").value;
    const taskDate = document.getElementById("taskDate").value;
    const taskColumn = document.getElementById("taskColumn").value;

    if (taskTitle) {
        const tasks = getTasks(); // Obtém as tarefas salvas

        if (taskId) {
            // Edita a tarefa existente com base no ID
            createNotification("Tarefa editada com sucesso", "#4CAF50");
            const taskIndex = tasks.findIndex(task => task.id === parseInt(taskId));
            tasks[taskIndex] = { ...tasks[taskIndex], title: taskTitle, description: taskDescription, assignee: taskAssignee, urgency: taskUrgency, date: taskDate, column: taskColumn };
        } else {
            // Cria uma nova tarefa com um novo ID
            const newTask = {
                id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
                title: taskTitle,
                description: taskDescription,
                assignee: taskAssignee,
                urgency: taskUrgency,
                date: taskDate,
                column: taskColumn
            };
            createNotification("Tarefa criada com sucesso", "#4CAF50");
            tasks.push(newTask);
        }

        setTasks(tasks); // Salva as tarefas atualizadas
        loadTasks(); // Recarrega as tarefas na interface
        closeModal(); // Fecha o modal de tarefa

        // Remove o ID do modal após a edição
        modal.removeAttribute("data-task-id");
    } else {
        createNotification("Insira ao menos um título", "rgb(250, 96, 96)");
    }
}

function deleteTask() {
    // Exclui uma tarefa existente com base no ID
    const taskId = document.getElementById("taskModal").getAttribute("data-task-id");

    if (taskId) {
        const tasks = getTasks(); // Obtém as tarefas salvas
        const updatedTasks = tasks.filter(task => task.id !== parseInt(taskId)); // Filtra a tarefa a ser excluída

        setTasks(updatedTasks); // Salva a lista de tarefas atualizada
        loadTasks(); // Recarrega as tarefas na interface
        closeModal(); // Fecha o modal de tarefa

        createNotification("Tarefa excluída com sucesso!", "#4CAF50");
    } else {
        createNotification("Erro ao excluir tarefa!", "rgb(250, 96, 96)");
    }
}

function getTasks() {
    // Retorna todas as tarefas salvas no localStorage
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function setTasks(tasks) {
    // Salva a lista de tarefas no localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    // Carrega e exibe todas as tarefas nas colunas do quadro Kanban
    const columns = {
        backlog: document.getElementById("backlog"),
        development: document.getElementById("development"),
        completed: document.getElementById("completed")
    };

    // Limpa as colunas mantendo os cabeçalhos
    Object.values(columns).forEach(column => column.innerHTML = column.querySelector("h2").outerHTML);

    // Ordena as tarefas por urgência (maior para menor)
    const tasks = getTasks().sort((a, b) => b.urgency - a.urgency);

    tasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.draggable = true;
        taskElement.ondragstart = (event) => event.dataTransfer.setData('text', task.id); // Permite arrastar a tarefa

        taskElement.onclick = () => openTaskModal(task); // Abre o modal de edição ao clicar no card

        // Define a classe de estilo da data com base na comparação com a data atual
        const taskDate = new Date(task.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        taskDate.setHours(0, 0, 0, 0);
        let dateClass = "date-future";
        if (taskDate.getTime() === today.getTime()) {
            dateClass = "date-today";
        } else if (taskDate.getTime() < today.getTime()) {
            dateClass = "date-past";
        }

        // Cria o conteúdo HTML do card da tarefa
        taskElement.innerHTML = 
            `<h3>${task.title}</h3>
            <p><strong>Responsável:</strong> ${task.assignee}</p>
            <p><strong>Urgência:</strong> ${task.urgency}</p>
            <p class="task-date ${dateClass}"><strong>Data:</strong> ${task.date}</p>`;

        columns[task.column].appendChild(taskElement); // Adiciona o card à coluna correspondente
    });
}

function createNotification(message, color = "rgb(250, 96, 96)") {
    // Exibe uma notificação temporária na tela
    const notificationContainer = document.getElementById("notificationsContainer");
    const notification = document.createElement("div");
    notification.classList.add("notification");
    if (color === "#4CAF50") notification.classList.add("green");
    notification.style.backgroundColor = color;

    notification.innerHTML = 
        `<span>${message}</span>
        <button class="notification-close-btn" onclick="this.parentElement.remove()">✖</button>`;

    notificationContainer.appendChild(notification);

    setTimeout(() => {
        if (notificationContainer.contains(notification)) {
            notification.remove(); // Remove a notificação após 10 segundos
        }
    }, 8000);
}

function drop(event) {
    // Muda a coluna de uma tarefa ao soltá-la na coluna desejada
    event.preventDefault();
    const column = event.currentTarget;
    if (!column.classList.contains("column")) return;

    const taskId = event.dataTransfer.getData('text');
    const tasks = getTasks();
    const task = tasks.find(t => t.id === parseInt(taskId));
    if (task) {
        task.column = column.id; // Atualiza a coluna da tarefa
        setTasks(tasks);
        loadTasks();

        createNotification(`${task.title} adicionado a ${column.querySelector("h2").innerText}`, "#4CAF50");
    }
}

function allowDrop(event) {
    // Permite a ação de arrastar e soltar
    event.preventDefault();
}

function checkTaskDeadlines() {
    // Verifica se há tarefas pendentes próximas do prazo e exibe notificação
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

// Executa ao carregar o conteúdo da página
document.addEventListener('DOMContentLoaded', () => {
    checkTaskDeadlines(); // Verifica prazos
    loadTasks(); // Carrega as tarefas
});
