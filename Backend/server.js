const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors')
const mongoose = require("mongoose");
const userRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const { verifyToken } = require("./middlewares/auth");

app.use(express.json({ limit: "50mb" }));
mongoose.connect(
  "mongodb+srv://suyash:Suyash1234@cluster0.uybxf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(cors())

app.use("/auth", userRoutes);
app.use("/post", verifyToken, postRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
