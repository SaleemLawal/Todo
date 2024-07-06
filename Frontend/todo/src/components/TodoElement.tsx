import React from "react";
import { Link } from "react-router-dom";
import { TodoData } from "../util/interface";

interface Props {
  data: TodoData;
}

const TodoElement: React.FC<Props> = ({ data }) => {
  const { id, name: title, description, priority, dueDate } = data;

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log("clicked todo with id", id);
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
      <div className="flex gap-4 items-start border-b-2 border-gray-200 p-2">
        <button
          className="border-2 border-gray-400 rounded-full w-6 h-6 mt-1"
          onClick={handleClick}
        ></button>
        <div className="flex-1">
          <p className="text-xl font-semibold">{title}</p>
          <p className="text-base text-gray-400 font-light">{description}</p>
          <div className="flex items-center mt-2">
            <p className="text-sm text-gray-500">
              {new Date(dueDate).toLocaleDateString()}
            </p>
            <span className="text-sm text-gray-500 mx-2">•</span>
            <p className={priorityClass}>{priority}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TodoElement;
