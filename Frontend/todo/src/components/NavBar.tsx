import "bootstrap-icons/font/bootstrap-icons.css";
import NavElement from "./NavElement";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="h-full max-w-full">
      <div id="header" className="p-4 flex items-center justify-between">
        <div className="header--item rounded p-1 cursor-pointer">
          <div className="bg-purple-700 rounded-full inline-flex items-center justify-center w-8 h-8 text-white">
            L
          </div>
          <p className="ml-3 inline-flex items-center justify-center">
            Leem <i className="bi bi-chevron-compact-down ml-2"></i>
          </p>
        </div>

        <div>
          <button className="header--item rounded p-1 mr-2">
            <i className="bi bi-bell icon-size"></i>
          </button>
          <button className="header--item rounded p-1 ml-3">
            <i className="bi bi-layout-sidebar icon-size"></i>
          </button>
        </div>
      </div>
      <NavLink to="/todos/add-todo" end>
        {({ isActive }) => (
          <NavElement
            icon={
              <i className="bi bi-plus-circle-fill text-red-500 icon-size"></i>
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
            icon={<i className="bi bi-list-task text-red-500 icon-size"></i>}
            text="Todos"
            active={isActive}
          />
        )}
      </NavLink>

      <NavLink to="/todos/today" end>
        {({ isActive }) => (
          <NavElement
            icon={<i className="bi bi-calendar icon-size"></i>}
            text="Today"
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
