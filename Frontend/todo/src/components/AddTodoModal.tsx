import React, { useEffect, useState } from "react";
import { TodoData } from "../util/interface";
import { saveTodo, deleteTodoById } from "../util/api";
import {useNavigate } from "react-router-dom";

interface Props{
  data? : TodoData
  toggleModal? : (show: boolean) => void;
}
const AddTodoModal: React.FC<Props> = ({data, toggleModal = () => {}}) => {
  const navigate = useNavigate();

  const [todoItem, setTodoItem] = useState<TodoData>({
    name: "",
    description: "",
    status: "PENDING",
    priority: "LOW",
    dueDate: "",
    tags: [],
    completed: false,
  });

  useEffect(() => {
    if (data) {
      setTodoItem(data);
    }
  }, [data]);
  
  const [newTag, setNewTag] = useState<string>("");

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { value, name } = event.target;

    setTodoItem({
      ...todoItem,
      [name]: value,
    });
  };

  const handleAddTag = () => {
    if (newTag && !todoItem.tags.includes(newTag)) {
      setTodoItem((prevState) => ({
        ...prevState,
        tags: [...prevState.tags, newTag],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTodoItem((prevState) => ({
      ...prevState,
      tags: prevState.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedTodoItem = {
      ...todoItem,
      dueDate: new Date(todoItem.dueDate).toISOString(),
    };
    setTodoItem(updatedTodoItem);
    await saveTodo(updatedTodoItem);
    if (toggleModal){
      toggleModal(false)
    }
    navigate("/todos")
  };

  const handleDelete = async () => {
    if(data && data.id){
      await deleteTodoById(data.id)
      navigate("/todos")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl p-4">
      <div className="flex flex-wrap -mx-2">
        <div className="w-full px-2 mb-6 md:w-1/2">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            onChange={handleChange}
            value={todoItem.name}
            name="name"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="w-full px-2 mb-6 md:w-1/2">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            onChange={handleChange}
            value={todoItem.status}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In-progress</option>
          </select>
        </div>
        <div className="w-full px-2 mb-6 md:w-1/2">
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <select
            name="priority"
            onChange={handleChange}
            value={todoItem.priority}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        <div className="w-full px-2 mb-6 md:w-1/2">
          <label className="block text-sm font-medium text-gray-700">Due Date</label>
          <input
            type="date"
            onChange={handleChange}
            value={todoItem.dueDate}
            name="dueDate"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="w-full px-2 mb-6 md:w-1/2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            onChange={handleChange}
            value={todoItem.description}
            name="description"
            required
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <div className="w-full px-2 mb-6 md:w-1/2">
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          <div className="flex items-center">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button type="button" onClick={handleAddTag} className="ml-2">
              <i className="text-lg text-green-500 bi bi-plus-circle-fill"></i>
            </button>
          </div>
          <div className="mt-2">
            {todoItem.tags.map((tag, index) => (
              <span key={tag} className={`inline-block p-1 bg-gray-200 rounded mr-2 ${index !== 0 ? 'ml-2' : ''}`}>
                {tag}{" "}
                <button type="button" onClick={() => handleRemoveTag(tag)}>
                  <i className="text-red-400 bi bi-x-circle-fill"></i>
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button type="submit" className="px-2 text-white rounded bg-sky-600">
          Save
        </button>
        <button
          type="button"
          className="px-2 text-white bg-red-400 rounded"
          onClick={data ? handleDelete : () => toggleModal(false)}
        >
          {data ? "Delete" : "Cancel"}
        </button>
      </div>
    </form>
  );
  
};

export default AddTodoModal;
