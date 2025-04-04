const { randomUUID } = require("node:crypto");
const reminders = require("../db/remindersDB")

const getAll = (req, res) => {
  const {username} = req.header.user

  const remindersUser = reminders.filter(
    (u) => u.username === username
  );
  return res.json(remindersUser);
};
const getById = (req, res) => {
  const {username} = req.header.user
  const { id } = req.params;
  const remindersUser = reminders.find(
    (u) => u.username.toLowerCase() === username.toLowerCase() && u.id===id
  );
  return res.json(remindersUser);
};

const create = (req, res) => {
  const { content,important } = req.body;
  const {username} = req.header.user

  const ahora = new Date();
  
  if (!content || !important) {
    
    return res.status(400).send("content and important es requerido");
  }  

  const reminder =  {
    username:username,
    id:randomUUID(),
    content: content,
    createdAt: ahora,
    important: important
  }
  reminders.push(reminder);

  res.status(201).send(reminder);
};

const update = (req, res) => {
  const { id } = req.params;
  const { content, important } = req.body;
  const {username} = req.header.user

  if (!content || !important) {
    return res.status(400).send("content and important es requerido");
  }

  const remindersUser = reminders.find(
    (u) => u.username === username && u.id===id
  );
  remindersUser.content=content;
  remindersUser.important=important;

  return res.json(remindersUser)
};



const remove = (req, res) => {
  const { id } = req.params;
  const {username} = req.header.user

  const reminder = reminders.find((r) => r.id === id && r.username === username);
  
  res.status(204).send();
};

module.exports = remindersController = {
  getAll,
  getById,
  create,
  update,
  remove,
};
