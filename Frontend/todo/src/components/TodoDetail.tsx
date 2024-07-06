import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTodoById } from "../util/api";
import AddTodoModal from "./AddTodoModal";
import { TodoData } from "../util/interface";

const TodoDetail: React.FC = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState<TodoData>({
    name: "",
    description: "",
    status: "PENDING",
    priority: "LOW",
    dueDate: "",
    tags: [],
    completed: false,
  })

  const getTodo = useCallback(async () => {
    if (id){
      try {
        const {data} = await getTodoById(id)
        const formattedDate = data.dueDate ? new Date(data.dueDate).toISOString().split('T')[0] : "";
        setTodo({
          ...data, dueDate: formattedDate
        })
      } catch (error) {
        console.log(error)
      }
    }
  }, [id])
  
  useEffect(() => {
    getTodo()
  }, [getTodo]);
  
  return (
    
    <>
      <p className="mb-6 text-4xl font-bold">{id ? `Edit Todo (${id})` : "Add Todo"}</p>
      <AddTodoModal data = {todo}/>
    </>
  );
};

export default TodoDetail;
