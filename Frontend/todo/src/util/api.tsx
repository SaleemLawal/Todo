import axios from "axios";
import { TodoData } from "./interface";

const BASE_PATH = "http://localhost:8080/todos";

export async function saveTodo(todo: TodoData) {
  return await axios.post(BASE_PATH, todo);
}

export async function getTodos() {
  return await axios.get(BASE_PATH);
}

export async function getTodoById(id: string) {
  return await axios.get(`${BASE_PATH}/${id}`);
}

export async function deleteTodoById(id: number) {
  return await axios.delete(BASE_PATH, {
    params: {
      id: id,
    },
  });
}

export async function getUpcomingTodos() {
  return await axios.get(`${BASE_PATH}/non-expired`);
}

export async function getDueTodos() {
  return await axios.get(`${BASE_PATH}/overdue`);
}

export async function getTodoByTag(tag: string) {
  return await axios.get(`${BASE_PATH}/tag/${tag}`);
}
