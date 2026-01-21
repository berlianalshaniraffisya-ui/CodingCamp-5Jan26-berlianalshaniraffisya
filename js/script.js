let todos = [];

function addTodo() {
    const taskInput = document.getElementById("todo-input");
    const dateInput = document.getElementById("date-input");

    if (taskInput.value === "" || dateInput.value === "") {
        alert("Please fill in both task name and the date.");
        return;
    }

    const newTodo = {
        task: taskInput.value,
        date: dateInput.value,
        status: 'ongoing' // Otomatis ongoing saat baru ditambah
    };

    todos.push(newTodo);
    renderTodos();

    taskInput.value = ""; 
    dateInput.value = "";
}

function renderTodos() {
    const todoList = document.getElementById('todo-list');
    const filterValue = document.getElementById('filter').value;
    
    todoList.innerHTML = '';

    const filteredTodos = todos.filter(todo => {
        if (filterValue === 'ongoing') return todo.status === 'ongoing';
        if (filterValue === 'completed') return todo.status === 'completed';
        if (filterValue === 'uncompleted') return todo.status === 'uncompleted';
        return true; 
    });

    if (filteredTodos.length === 0) {
        todoList.innerHTML = '<li class="p-8 text-center text-gray-500">No task found</li>';
        return;
    }

    filteredTodos.forEach((todo) => {
        const originalIndex = todos.indexOf(todo);
        
        // Logika Style Warna Teks Berdasarkan Status
        let textStyle = "text-green-400 font-semibold"; // Default Ongoing
        if (todo.status === 'completed') textStyle = "line-through text-gray-500 italic";
        if (todo.status === 'uncompleted') textStyle = "text-yellow-500 font-semibold";

        todoList.innerHTML += `
            <li class="grid grid-cols-4 gap-4 p-4 items-center hover:bg-white/5 transition-all">
                <div class="col-span-1">
                    <p class="${textStyle} truncate">${todo.task}</p>
                </div>
                <div class="text-xs text-gray-400">${todo.date}</div>
                <div>
                    <select onchange="changeStatus(${originalIndex}, this.value)" class="bg-[#1e293b] text-[10px] text-white border border-gray-700 rounded p-1 outline-none">
                        <option value="ongoing" ${todo.status === 'ongoing' ? 'selected' : ''}>Ongoing</option>
                        <option value="completed" ${todo.status === 'completed' ? 'selected' : ''}>Completed</option>
                        <option value="uncompleted" ${todo.status === 'uncompleted' ? 'selected' : ''}>Uncompleted</option>
                    </select>
                </div>
                <div class="text-right">
                    <button onclick="deleteTodo(${originalIndex})" class="text-red-400 hover:text-red-200 text-xs font-bold uppercase tracking-tighter transition-colors">
                        Delete
                    </button>
                </div>
            </li>
        `;
    });
}

function changeStatus(index, newStatus) {
    todos[index].status = newStatus;
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

function removeAllTodo() {
    if (todos.length > 0) {
        if (confirm("Clear all items from your Berries List?")) {
            todos = [];
            renderTodos();
        }
    }
}