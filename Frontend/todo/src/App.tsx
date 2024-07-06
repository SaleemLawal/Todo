import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TodoList from "./components/TodoList";
import NavBar from "./components/NavBar";
import AddTodoModal from "./components/AddTodoModal";
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
        <main className="mt-12 ml-96">
          <Routes>
            <Route path="/" element={<Navigate to={"/todos"} />} />
            <Route
              path="/todos"
              element={<TodoList toggleModal={toggleModal} />}
            />
            <Route path="/todos/:id" element={<TodoDetail />} />
            <Route path="/todos/add-todo" element={<TodoDetail />} />
            <Route
              path="/todos/search"
              element={<h1 className="mb-6 text-4xl font-bold">Search Todo</h1>}
            />
            <Route
              path="/todos/today"
              element={<h1 className="mb-6 text-4xl font-bold">Today</h1>}
            />
            <Route
              path="/todos/upcoming"
              element={<h1 className="mb-6 text-4xl font-bold">Upcoming</h1>}
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
          <AddTodoModal toggleModal = {toggleModal}/>
        </dialog>
      </BrowserRouter>
    </section>
  );
};

export default App;
