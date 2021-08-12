import React from "react";
import Button from './Button'

interface IProps {
  text: any;
  count: any;
  handleClick: () => void;
  children: any;
}

function Count({ text, count, handleClick, children }: IProps) {
  console.log(`Rendering ${text}`);
  return (
    <div>
    <div>
      {text} - {count}
    </div>
    <Button handleClick={handleClick}>{children}</Button>
    </div>
  );
}

export default React.memo(Count);
