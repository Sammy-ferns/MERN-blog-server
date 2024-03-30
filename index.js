const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const upload = require("express-fileupload");
const path = require("path");

const app = express();

app.use(
  cors({
    credentials: true,
    // origin: "https://mern-blog-client-kohl.vercel.app",
    origin: "http://localhost:3000",
  })
);
// app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(upload());
// app.use("/uploads", express.static(__dirname + "uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Routes

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

//Error Middleware

app.use(notFound);
app.use(errorHandler);

connect(process.env.MONGO_URI)
  .then(
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    })
  )
  .catch((error) => console.log(error));
