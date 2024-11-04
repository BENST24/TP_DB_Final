// models/mysql/todo.js

// Crear la tabla todos si no existe
async function createTodosTable(db) {
    const query = `
    CREATE TABLE IF NOT EXISTS todos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        task VARCHAR(255) NOT NULL,
        completed BOOLEAN DEFAULT FALSE
    )
    `;
    await db.query(query);
}

// Obtener todas las tareas
async function getAllTodos(db) {
    const [rows] = await db.query('SELECT * FROM todos');
    return rows;
}

// Modelo para crear una nueva tarea
async function createTodo(db, task) {
    const query = 'INSERT INTO todos (task, completed) VALUES (?, ?)';
    const [result] = await db.query(query, [task, false]);
    return result.insertId;
}

// Actualizar el estado de una tarea
async function updateTodo(db, id, completed) {
    const [result] = await db.query('UPDATE todos SET completed = ? WHERE id = ?', [completed, id]);
    return result.affectedRows;
}

// Eliminar una tarea
async function deleteTodo(db, id) {
    const [result] = await db.query('DELETE FROM todos WHERE id = ?', [id]);
    return result.affectedRows;
}

// Exportamos las funciones
module.exports = {
    createTodosTable,
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo
};