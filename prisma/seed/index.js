const { users } = require("./userSeed");

try {
  users();
  console.log("El seed funcionó impecablemente :)");
} catch (error) {
  console.log("Hubo un error en el seed :(");
}
