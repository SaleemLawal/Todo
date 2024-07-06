import axios from "axios";
import { TodoData } from "./interface";

const BASE_PATH = "http://localhost:8080/todos";

export async function saveTodo(todo: TodoData) {
  return await axios.post(BASE_PATH, todo);
}

export async function getTodos() {
  return await axios.get(BASE_PATH);
}
