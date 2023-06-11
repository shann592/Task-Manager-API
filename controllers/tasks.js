const Task = require("../models/Task");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, NotFoundError } = require("../errors");
exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ count: tasks.length, tasks });
};

exports.createTask = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const task = await Task.create(req.body);
  res.status(StatusCodes.CREATED).json(task);
};

exports.getTask = async (req, res) => {
  const {
    user: { userId },
    params: { id: taskId },
  } = req;
  const task = await Task.findOne({ _id: taskId, createdBy: userId });
  res.status(StatusCodes.OK).json({ task });
};

exports.updateTask = async (req, res) => {
  const {
    user: { userId },
    params: { id: taskId },
    body: { name, completed },
  } = req;
  if (!name || completed === undefined) {
    throw new BadRequest("Name and Completed field cannot be empty!");
  }
  const task = await Task.findOneAndUpdate(
    { _id: taskId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!task) {
    throw new NotFoundError(`No task with id ${taskId}`);
  }
  res.status(StatusCodes.OK).json({ task });
};

exports.deleteTask = async (req, res) => {
  const {
    user: { userId },
    params: { id: taskId },
  } = req;
  const task = await Task.findOneAndDelete({ _id: taskId, createdBy: userId });
  if (!task) {
    throw new NotFoundError(`No task found of id ${taskId}`);
  }
  res.status(StatusCodes.OK).json({ task });
};
