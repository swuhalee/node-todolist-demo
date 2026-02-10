const Task = require("../model/Task");

const taskController = {};

taskController.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const { userId } = req;
        const newTask = new Task({ title, description, author: userId, completed: false, createdAt: new Date() });
        
        await newTask.save();

        res.status(200).json({ status: "ok", data: newTask });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error });
    }
};

taskController.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({}).populate("author").select('-__v');
        res.status(200).json({ status: "ok", data: tasks });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error });
    }
};

taskController.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, { title, description, completed }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ status: "fail", message: "Task not found" });
        }
        res.status(200).json({ status: "ok", data: updatedTask });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error });
    }
};

taskController.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ status: "fail", message: "Task not found" });
        }
        res.status(200).json({ status: "ok", data: deletedTask });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error });
    }
};

module.exports = taskController;