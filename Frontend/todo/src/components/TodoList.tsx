import { useEffect, useState } from "react";
import TodoElement from "./TodoElement";
import { TodoData } from "../util/interface";
import { getTodos } from "../util/api";

interface Props {
  toggleModal: (show: boolean) => void;
}
const TodoList: React.FC<Props> = ({ toggleModal }) => {
  const [todos, setTodos] = useState<TodoData[]>([]);

  const getAllTodos = async () => {
    try {
      const { data } = await getTodos();
      setTodos(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-4xl font-bold">Todos</h1>
      {!todos && <h1>No todo element</h1>}
      {todos &&
        todos.map((todo, index) => {
          return <TodoElement key={index} data={todo} />;
        })}
      <button className="mt-3" onClick={() => toggleModal(true)}>
        <i className="text-xl text-gray-500 bi bi-plus-square-fill"></i>
        <span className="ml-2 ">Add Todo</span>
      </button>
    </div>
  );
};

export default TodoList;
