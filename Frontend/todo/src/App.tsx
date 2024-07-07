import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TodoList from "./components/TodoList";
import NavBar from "./components/NavBar";
import AddTodoModal from "./components/AddTodoModal";
import { createContext, useRef, useState } from "react";
import TodoDetail from "./components/TodoDetail";
import { getTodos, getUpcomingTodos } from "./util/api";
import { ApiContextType } from "./util/interface";

export const ApiContext = createContext<ApiContextType | null>(null);

const App = () => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleModal = (show: boolean) => {
    setIsOpen(show);
    show ? modalRef.current?.show() : modalRef.current?.close();
  };

  const getAllTodos = async () => {
    try {
      const { data } = await getTodos();
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const upcomingTodos = async () => {
    try {
      const { data } = await getUpcomingTodos();
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return (
    <ApiContext.Provider value={{ getAllTodos, upcomingTodos }}>
      <section id="main-page">
        <BrowserRouter>
          <NavBar />
          <main className="mt-12 ml-96">
            <Routes>
              <Route path="/" element={<Navigate to={"/todos"} />} />
              <Route
                path="/todos"
                element={<TodoList toggleModal={toggleModal} dataType="all" />}
              />
              <Route path="/todos/:id" element={<TodoDetail />} />
              <Route path="/todos/add-todo" element={<TodoDetail />} />
              <Route
                path="/todos/search"
                element={
                  <h1 className="mb-6 text-4xl font-bold">Search Todo</h1>
                }
              />
              <Route
                path="/todos/due"
                element={<h1 className="mb-6 text-4xl font-bold">Due</h1>}
              />
              <Route
                path="/todos/upcoming"
                element={
                  <TodoList toggleModal={toggleModal} dataType="upcoming" />
                }
              />
              <Route
                path="/todos/tags"
                element={<h1 className="mb-6 text-4xl font-bold">Tags</h1>}
              />
            </Routes>
          </main>

          {isOpen && <div className="overlay"></div>}
          <dialog ref={modalRef} className="shadow-inner modal">
            <div className="flex flex-row">
              <span className="flex-1 text-xl font-semibold text-center ">
                New Todo
              </span>
              <i
                onClick={() => toggleModal(false)}
                className="text-lg text-gray-400 bi bi-x-circle-fill"
              ></i>
            </div>
            <AddTodoModal toggleModal={toggleModal} />
          </dialog>
        </BrowserRouter>
      </section>
    </ApiContext.Provider>
  );
};

export default App;
