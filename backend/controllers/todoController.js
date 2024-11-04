// controllers/todoController.js
const mongoStrategy = require('../strategies/mongoStrategy');
const mysqlStrategy = require('../strategies/mysqlStrategy');

// Dependiendo de la configuración, seleccionamos la estrategia de base de datos
const dbType = process.env.DB_TYPE || 'mongo'; // Selecciona la base de datos basada en la variable de entorno
const dbStrategy = dbType === 'mongo' ? mongoStrategy : mysqlStrategy;

exports.getTasks = async (req, res) => {
    try {
        const todos = dbType === 'mongo' ? await dbStrategy.getTasks() : await dbStrategy.getTasks(req.db);
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }
};

exports.createTask = async (req, res) => {
    const { task } = req.body;
    try {
        const newTodo = dbType === 'mongo' ? await dbStrategy.createTask(task) : await dbStrategy.createTask(req.db, task);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la tarea' });
    }
};

exports.completeTask = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTodo = dbType === 'mongo' ? await dbStrategy.completeTask(id) : await dbStrategy.completeTask(req.db, id);
        if (updatedTodo) {
            res.status(200).json(updatedTodo);
        } else {
            res.status(404).json({ message: 'Tarea no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la tarea' });
    }
};

exports.activateTask = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTodo = dbType === 'mongo' ? await dbStrategy.activateTask(id) : await dbStrategy.activateTask(req.db, id);
        if (updatedTodo) {
            res.status(200).json(updatedTodo);
        } else {
            res.status(404).json({ message: 'Tarea no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la tarea' });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const success = dbType === 'mongo' ? await dbStrategy.deleteTask(id) : await dbStrategy.deleteTask(req.db, id);
        if (success) {
            res.status(200).json({ message: 'Tarea eliminada' });
        } else {
            res.status(404).json({ message: 'Tarea no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la tarea' });
    }
};
