import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { TodoData } from "../util/interface";
import { saveTodo } from "../util/api";

interface Props {
  data: TodoData;
}

const TodoElement: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  const { id, name: title, description, priority, dueDate } = data;

  const handleClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    const updatedTodoItem = {
      ...data,
      completed: true,
    };
    await saveTodo(updatedTodoItem);
    navigate(0);
  };
  let priorityClass = "text-sm text-gray-500 px-1 rounded ";
  if (priority === "LOW") {
    priorityClass += "bg-green-300";
  } else if (priority === "MEDIUM") {
    priorityClass += "bg-yellow-300";
  } else {
    priorityClass += "bg-red-300";
  }
  return (
    <Link to={`/todos/${id}`}>
      <div className="flex items-start gap-4 p-2 border-b-2 border-gray-200">
        <button
          className="w-6 h-6 mt-1 border-2 border-gray-400 rounded-full"
          onClick={handleClick}
        ></button>
        <div className="flex-1">
          <p className="text-xl font-semibold">{title}</p>
          <p className="text-base font-light text-gray-400">{description}</p>
          <div className="flex items-center mt-2">
            <p className="text-sm text-gray-500">
              {new Date(dueDate).toLocaleDateString()}
            </p>
            <span className="mx-2 text-sm text-gray-500">•</span>
            <p className={priorityClass}>{priority}</p>
          </div>
          {data.tags.length > 0 && (
            <p className="mt-1 ">
              <i className="mr-1 bi bi-tags"></i>
              {data.tags.map((tag, index) => (
                <span
                  key={tag}
                  className={`px-2 mr-2  rounded ${
                    index % 2 === 0 ? "bg-yellow-200" : "bg-teal-300"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default TodoElement;
