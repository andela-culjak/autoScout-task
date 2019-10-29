const express = require("express");

const app = express();

//Init middleware (body parser, nesting not allowed)
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API running"));

//Define route
app.use("/api/users", require("./routes/api/users"));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
