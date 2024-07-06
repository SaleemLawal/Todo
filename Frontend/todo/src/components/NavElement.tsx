import React from "react";

interface Props {
  icon: React.ReactElement;
  text: string;
  active?: boolean;
}

const NavElement: React.FC<Props> = ({ icon, text, active }) => {
  return (
    <div className={`flex items-center space-x-3 pr-4 my-2 nav--element rounded-lg mx-5 ${active ? 'active' : ''}`}>
      <div className="icon-size">{icon}</div>
      <span className={text === 'Add Task' ? " text-orange-600 font-bold" : ''}>{text}</span>
    </div>
  );
};

export default NavElement;
