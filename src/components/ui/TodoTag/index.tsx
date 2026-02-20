import React from "react";

interface TodoTagProps {
  text?: string;
}

const TodoTag: React.FC<TodoTagProps> = ({ text = "Todo" }) => {
  return (
    <span className=" bg-yellow-300 text-red-600 px-3 h-5 rounded-md font-semibold text-xs items-center justify-center inline-flex">
      {text}
    </span>
  );
};

export default TodoTag;
