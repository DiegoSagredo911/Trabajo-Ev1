const getAll = (req, res) => {
  res.send("Todos los recordatorios");
};
const getById = (req, res) => {
  const { id } = req.params;
  res.send(`id: ${id}`);
};

const create = (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).send("title and description es requerido");
  }
  res.status(201).send(` ${title} - ${description}`);
};

const update = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).send("title and description es requerido");
  }
  res.send(`reminder id: ${id} atributo ${title} - ${description}`);
};

const remove = (req, res) => {
  const { id } = req.params;
  res.send(`Reminder id: ${id} eliminado`);
};

module.exports = remindersController = {
  getAll,
  getById,
  create,
  update,
  remove,
};
