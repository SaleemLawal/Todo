import React, { useState } from "react";
import { TodoData } from "../util/interface";
import { saveTodo } from "../util/api";

const AddTodo: React.FC = () => {
  const [todoItem, setTodoItem] = useState<TodoData>({
    name: "",
    description: "",
    status: "PENDING",
    priority: "LOW",
    dueDate: "",
    tags: [],
    completed: false,
  });
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
  };

  return (
    <form onSubmit={handleSubmit} className=" flex flex-col">
      <div className="flex flex-wrap -mx-2">
        <div className="input--element md:w-1/2">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            onChange={handleChange}
            value={todoItem.name}
            name="name"
            required
          />
        </div>

        <div className="input--element md:w-1/2 ">
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            onChange={handleChange}
            value={todoItem.status}
            // defaultValue={todoItem.status}
          >
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In-progress</option>
          </select>
        </div>
        <div className="input--element md:w-1/2 ">
          <label className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            name="priority"
            onChange={handleChange}
            value={todoItem.priority}
            // defaultValue={todoItem.priority}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        <div className="input--element md:w-1/2 ">
          <label className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            onChange={handleChange}
            value={todoItem.dueDate}
            name="dueDate"
            required
          />
        </div>
        <div className="input--element md:w-1/2 ">
          <label className="block text-sm font-sm text-gray-700">
            Description
          </label>
          <textarea
            onChange={handleChange}
            value={todoItem.description}
            name="description"
            required
          ></textarea>
        </div>
        <div className="input--element md:w-1/2 ">
          <label className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag"
          />
          <button type="button" onClick={handleAddTag} className="ml-3">
            <i className="bi bi-plus-circle-fill text-lg text-green-500 "></i>
          </button>
          <div>
            {todoItem.tags.map((tag, index) => (
              <span key={tag} className={index !== 0 ? "ml-2" : ""}>
                {tag}{" "}
                <button type="button" onClick={() => handleRemoveTag(tag)}>
                  <i className="bi bi-x-circle-fill text-red-400"></i>
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* <div>
          <span>Completed</span>
          <input onChange={handleChange} value={}  name="" required/>
        </div> */}
      <div>
        <button type="submit" className="px-2 rounded bg-sky-600 text-white">
          Save
        </button>
        <button
          type="button"
          className="float-right bg-red-400 px-2 rounded text-white"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddTodo;
