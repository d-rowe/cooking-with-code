const path = require("path");
// Dependencies
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");

// Set up
const connectDB = require("./config/db");
dotenv.config({ path: "./config/config.env" });
connectDB(process.env.MONGO_URI);

// Routes
const recipes = require("./routes/recipes");
const shoppingList = require("./routes/ShoppingList");
const settings = require("./routes/Settings");

// APP
const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Direct Routes
app.use("/api/v1/recipes", recipes);
app.use("/api/v1/shoppingList", shoppingList);
app.use("/api/v1/settings", settings);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "client", "build", "index.html")));
}

// Set server listening port
const PORT = process.env.PORT || 50001;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
