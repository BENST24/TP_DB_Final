// strategies/mongoStrategy.js
const Todo = require('../models/mongo/todo');

module.exports = {
    getTasks: async () => await Todo.find(),
    createTask: async (task) => {
        const newTodo = new Todo({ task });
        await newTodo.save();
        return newTodo;
    },
    completeTask: async (id) => {
        return await Todo.findByIdAndUpdate(id, { completed: true }, { new: true });
    },
    activateTask: async (id) => {
        return await Todo.findByIdAndUpdate(id, { completed: false }, { new: true });
    },
    deleteTask: async (id) => {
        await Todo.findByIdAndDelete(id);
    }
};
