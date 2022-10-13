/** @format */

const express = require("express");
const app = express();
const PORT = 4000;

const axios = require("axios");
const awaitHandler = require("./utils/awaitHandler");

const { getUsers, getTasks } = require("./utils/fakeDatabase");

//Demo of how to use "awaitHandler" to handle multiple await calls in asyc function

//
app.get("/usersAndTasks", async (req, res) => {
  //requesting and handling error of first await call funtion error
  const { ok, error, result } = await awaitHandler(
    axios.get("http://127.0.0.1:4000/users")
  );
  console.log(ok);
  if (!ok) {
    return res.send({ message: "failed to fetch users" });
  }
  const users = result.data;

  //requesting and handling error of second await call funtion
  const response = await awaitHandler(axios.get("http://127.0.0.1:4000/tasks"));

  console.log(response.ok);
  if (!response.ok) {
    return res.send({ message: "failed to fetch tasks" });
  }
  const tasks = response.result.data;

  console.log(users);
  console.log(tasks);
  res.send("done");
});

//get all users
app.get("/users", (req, res) => {
  res.send(getUsers());
});

//get all users
app.get("/tasks", (req, res) => {
  res.send(getTasks());
});

app.listen(PORT, () => {
  console.log("server is running on Port " + PORT);
});
