import { deleteTodo, updateTodo } from './api.js';

export function displayTodos(todos) {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.className = 'w3-display-container';
        listItem.innerHTML = `
            <span class="${todo.completed ? 'completed' : ''}">${todo.task}</span>
        `;
        
        const completeButton = document.createElement('button');
        completeButton.className = 'w3-button w3-small w3-blue w3-right';
        completeButton.innerText = 'Completar';
        completeButton.onclick = async () => {
            await updateTodo(todo.id, { completed: !todo.completed });
            getTodos(); // Recarga la lista de tareas
        };

        const deleteButton = document.createElement('button');
        deleteButton.className = 'w3-button w3-small w3-red w3-right';
        deleteButton.innerText = 'Eliminar';
        deleteButton.onclick = async () => {
            if (confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
                await deleteTodo(todo.id);
                getTodos();
            }
        };

        listItem.appendChild(completeButton);
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
    });
}
