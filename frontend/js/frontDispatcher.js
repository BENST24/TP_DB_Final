import { getTodos, addTodo } from './api.js';
import { displayTodos } from './render.js';

document.addEventListener('DOMContentLoaded', async () => {
    await loadTodos();
    
    document.getElementById('todoForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const taskInput = document.getElementById('taskInput');
        if (taskInput.value.trim()) {
            await addTodo(taskInput.value.trim());
            taskInput.value = '';
            await loadTodos();
        }
    });
});

async function loadTodos() {
    const todos = await getTodos();
    displayTodos(todos);
}

window.filterTodos = async (filter) => {
    const todos = await getTodos();
    let filteredTodos;
    if (filter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    } else if (filter === 'pending') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else {
        filteredTodos = todos;
    }
    displayTodos(filteredTodos);
};
