import "bootstrap-icons/font/bootstrap-icons.css";
import NavElement from "./NavElement";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="h-full max-w-full">
      <div id="header" className="flex items-center justify-between p-4">
        <div className="p-1 rounded cursor-pointer header--item">
          <div className="inline-flex items-center justify-center w-8 h-8 text-white bg-purple-700 rounded-full">
            L
          </div>
          <p className="inline-flex items-center justify-center ml-3">
            Leem <i className="ml-2 bi bi-chevron-compact-down"></i>
          </p>
        </div>

        <div>
          <button className="p-1 mr-2 rounded header--item">
            <i className="bi bi-bell icon-size"></i>
          </button>
          <button className="p-1 ml-3 rounded header--item">
            <i className="bi bi-layout-sidebar icon-size"></i>
          </button>
        </div>
      </div>
      <NavLink to="/todos/add-todo" end>
        {({ isActive }) => (
          <NavElement
            icon={
              <i className="text-red-500 bi bi-plus-circle-fill icon-size"></i>
            }
            text="Add Task"
            active={isActive}
          />
        )}
      </NavLink>
      <NavLink to="/todos/search" end>
        {({ isActive }) => (
          <NavElement
            icon={<i className="bi bi-search icon-size"></i>}
            text="Search"
            active={isActive}
          />
        )}
      </NavLink>

      <NavLink to="/todos" end>
        {({ isActive }) => (
          <NavElement
            icon={<i className="text-red-500 bi bi-list-task icon-size"></i>}
            text="Todos"
            active={isActive}
          />
        )}
      </NavLink>

      <NavLink to="/todos/upcoming" end>
        {({ isActive }) => (
          <NavElement
            icon={<i className="bi bi-calendar2-day icon-size"></i>}
            text="Upcoming"
            active={isActive}
          />
        )}
      </NavLink>

      <NavLink to="/todos/due" end>
        {({ isActive }) => (
          <NavElement
            icon={<i className="bi bi-calendar icon-size"></i>}
            text="Due"
            active={isActive}
          />
        )}
      </NavLink>

      <NavLink to="/todos/tags" end>
        {({ isActive }) => (
          <NavElement
            icon={<i className="bi bi-bookmark-check-fill icon-size"></i>}
            text="Tags"
            active={isActive}
          />
        )}
      </NavLink>
    </nav>
  );
};

export default NavBar;
