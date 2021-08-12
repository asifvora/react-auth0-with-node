import React from "react";

interface IProps {
  handleClick: () => void;
  children: any;
}

function Button({ handleClick, children }: IProps) {
  console.log("Rendering button - ", children);
  return <button onClick={handleClick}>{children}</button>;
}

export default React.memo(Button);
