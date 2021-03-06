const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "Aplicacion BACK-END Conaffex" });
});

// Declaramos la ruta para las API de los colaboradores
require("./app/routes/colaborador.routes.js")(app);

// Declaramos la ruta para las API de las fincas
require("./app/routes/finca.routes.js")(app);

// Declaramos la ruta para las API de los usuarios
require("./app/routes/usuario.routes.js")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});