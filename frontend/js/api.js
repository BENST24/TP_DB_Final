const apiURL = 'http://localhost:3000';

export async function getTodos() {
    const response = await fetch(`${apiURL}/todos`);
    return await response.json();
}

export async function addTodo(task) {
    const response = await fetch(`${apiURL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task, completed: false })
    });
    return await response.json();
}

export async function updateTodo(id, updatedData) {
    await fetch(`${apiURL}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    });
}

export async function deleteTodo(id) {
    await fetch(`${apiURL}/todos/${id}`, { method: 'DELETE' });
}
