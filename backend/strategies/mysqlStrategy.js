// strategies/mysqlStrategy.js
const todoModel = require('../models/mysql/todo');

module.exports = {
    getTasks: async (db) => await todoModel.getAllTodos(db),
    
    createTask: async (db, task) => {
        const newTodoId = await todoModel.createTodo(db, task);
        return { id: newTodoId, task, completed: false };
    },
    
    completeTask: async (db, id) => {
        const affectedRows = await todoModel.updateTodo(db, id, true);
        return affectedRows > 0 ? { id, completed: true } : null;
    },
    
    activateTask: async (db, id) => {
        const affectedRows = await todoModel.updateTodo(db, id, false);
        return affectedRows > 0 ? { id, completed: false } : null;
    },
    
    deleteTask: async (db, id) => {
        const affectedRows = await todoModel.deleteTodo(db, id);
        return affectedRows > 0;
    }
};
