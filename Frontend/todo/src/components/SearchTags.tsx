import { useState } from "react";
import { getTodoByTag } from "../util/api";
import TodoList from "./TodoList";
import { TodoData } from "../util/interface";

const SearchTags = () => {
  const [tag, setTag] = useState<string>("");
  const [data, setData] = useState<TodoData[]>([]);
  const handleSubmit = async () => {
    const { data } = await getTodoByTag(tag);
    setData(data);
    setTag("");
  };
  return (
    <>
      <h1 className="mb-6 text-4xl font-bold">Tags</h1>
      <div className="mb-4">
        <label>Search by Tag</label>
        <input
          value={tag}
          className="w-1/3 ml-3"
          onChange={(e) => {
            setTag(e.target.value);
          }}
        />
        <button
          type="button"
          className="px-2 ml-2 bg-blue-400 rounded hover:shadow-inner"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <TodoList todoItem={data} />
    </>
  );
};

export default SearchTags;
