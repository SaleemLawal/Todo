import { useContext, useEffect, useState } from "react";
import TodoElement from "./TodoElement";
import { TodoData } from "../util/interface";
import { ApiContext } from "../App";

interface Props {
  toggleModal?: (show: boolean) => void;
  dataType?: "all" | "upcoming" | "due";
  todoItem?: TodoData[];
}

const TodoList: React.FC<Props> = ({
  toggleModal = () => {},
  dataType,
  todoItem,
}) => {
  const apiContext = useContext(ApiContext);
  const [todos, setTodos] = useState<TodoData[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      if (!apiContext) return;

      let data = [] as TodoData[];
      if (todoItem) {
        setTodos(todoItem);
        return;
      } else if (dataType === "all") {
        data = await apiContext.getAllTodos();
      } else if (dataType === "upcoming") {
        data = await apiContext.upcomingTodos();
      } else if (dataType === "due") {
        data = await apiContext.dueTodos();
      }
      setTodos(data);
    };
    fetchTodos();
  }, [apiContext, dataType, todoItem]);

  let headerElement;
  if (dataType === "all") {
    headerElement = <h1 className="mb-6 text-4xl font-bold">Todos</h1>;
  } else if (dataType === "upcoming") {
    headerElement = <h1 className="mb-6 text-4xl font-bold">Upcoming</h1>;
  } else if (dataType === "due") {
    headerElement = <h1 className="mb-6 text-4xl font-bold">Due</h1>;
  }

  return (
    <div>
      {headerElement}
      {!todos.length && <h1>No todo element</h1>}
      {todos.length > 0 &&
        todos.map((todo, index) => {
          return !todo.completed && <TodoElement key={index} data={todo} />;
        })}
      {dataType === "all" && (
        <button className="mt-3" onClick={() => toggleModal(true)}>
          <i className="text-xl text-gray-500 bi bi-plus-square-fill"></i>
          <span className="ml-2 ">Add Todo</span>
        </button>
      )}
    </div>
  );
};

export default TodoList;
