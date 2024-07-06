import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TodoList from "./components/TodoList";
import NavBar from "./components/NavBar";
// import TodoDetail from "./components/TodoDetail";
import AddTodo from "./components/AddTodo";
import { useRef, useState } from "react";
import TodoDetail from "./components/TodoDetail";

const App = () => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleModal = (show: boolean) => {
    setIsOpen(show);
    show ? modalRef.current?.show() : modalRef.current?.close();
  };
  return (
    <section id="main-page">
      <BrowserRouter>
        <NavBar />
        <main className=" ml-96 mt-12">
          <Routes>
            <Route path="/" element={<Navigate to={"/todos"} />} />
            <Route
              path="/todos"
              element={<TodoList toggleModal={toggleModal} />}
            />
            <Route
              path="/todos/:id"
              element={<TodoDetail />}
            />
            <Route path="/todos/add-todo" element={<TodoDetail />} />
            <Route
              path="/todos/search"
              element={<h1 className="text-4xl font-bold mb-6">Search Todo</h1>}
            />
            <Route
              path="/todos/today"
              element={<h1 className="text-4xl font-bold mb-6">Today</h1>}
            />
            <Route
              path="/todos/upcoming"
              element={<h1 className="text-4xl font-bold mb-6">Upcoming</h1>}
            />
            <Route
              path="/todos/tags"
              element={<h1 className="text-4xl font-bold mb-6">Tags</h1>}
            />
          </Routes>
        </main>

        {isOpen && <div className="overlay"></div>}
        <dialog ref={modalRef} className="modal shadow-inner">
          <div className="flex flex-row">
            <span className=" text-xl font-semibold text-center flex-1">New Todo</span>
            <i onClick={() => toggleModal(false)} className="bi bi-x-circle-fill text-lg text-gray-400"></i>
          </div>
          <AddTodo />
        </dialog>
      </BrowserRouter>
    </section>
  );
};

export default App;
