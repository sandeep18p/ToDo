// JavaScript code for the functionality
let todoList = JSON.parse(localStorage.getItem('todoList')) || [];  

document.getElementById('addItemForm').addEventListener('submit', (event) => {
    event.preventDefault();
    let itemNameInput = document.getElementById('name').value.trim();
    let deadlineInput = document.getElementById('date').value;
    let prioritySelect = document.getElementById('priority').value;
     
    if (!itemNameInput || typeof itemNameInput !== 'string') {
        alert("Validation failed: Item Name must be a non-empty string.");
        return;
    }

    if (!deadlineInput || isNaN(Date.parse(deadlineInput))) {
        alert("Validation failed: Deadline must be a valid date.");
        return;
    }

    if (!['Low', 'Medium', 'High'].includes(prioritySelect)) {
        alert("Validation failed: Priority must be 'Low', 'Medium', or 'High'.");
        return;
    }

    const newItem = {
        name: itemNameInput,
        date: deadlineInput,
        priority: prioritySelect,
        completed: false
    };
    
    todoList.push(newItem);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    renderTodoList();
});


function toggleCompleted(index) {
    todoList[index].completed = !todoList[index].completed;
    localStorage.setItem('todoList', JSON.stringify(todoList));
    renderTodoList();
}

function deleteItem(index) {
    todoList.splice(index, 1);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    renderTodoList();
}

function renderTodoList(){
    const todaysTasks = document.getElementById('todaysTasks');
    const futureTasks = document.getElementById('futureTasks');
    const completedTasks = document.getElementById('completedTasks');

    todaysTasks.innerHTML = '';
    futureTasks.innerHTML = '';
    completedTasks.innerHTML = '';

    todoList.forEach((item,index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list');
        listItem.innerHTML = `
            <div class="start">${item.name}</div>
            <div class="start1">${item.date}</div>
            <div class="end2">Priority: ${item.priority}</div>
            <div class="end"><img src="c2.png" class="toggle-btn"><img src="d1.png" class="delete-btn"></div>
        `;   
        const deleteBtn = listItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {deleteItem(index)});
        const toggleBtn = listItem.querySelector('.toggle-btn');
        toggleBtn.addEventListener('click', () => {toggleCompleted(index)});

        if (item.completed) { 
            listItem.classList.add('completed');
            toggleBtn.style.display = 'none';
            deleteBtn.style.float = 'right';
            const deleteImg = listItem.querySelector('.delete-btn');
            deleteImg.setAttribute('src', 'd2.png');
            completedTasks.appendChild(listItem);
        } else {
            const currentDate = new Date();
            const itemDate = new Date(item.date);
            if (itemDate.toDateString() === currentDate.toDateString()) {
                listItem.classList.add('today');
                todaysTasks.appendChild(listItem);
            } else if (itemDate < currentDate) {
                listItem.classList.add('futurepast');
                futureTasks.appendChild(listItem);
            } else {
                futureTasks.appendChild(listItem);
            }
        }
        
    });
}

renderTodoList();
