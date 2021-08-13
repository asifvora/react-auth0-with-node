import React from "react";
const { forwardRef, useRef, useState, useImperativeHandle } = React;

// We need to wrap component in `forwardRef` in order to gain
// access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function component.
const Child = forwardRef((props, ref) => {
const [state, setState] = useState(0);

  const getAlert = () => {
    alert("getAlert from Child");
    setState(state => state + 1)
  };

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  useImperativeHandle(ref, () => ({
    getAlert,
  }));

  return (
    <>
      <h1>Hi {state}</h1>
      <button onClick={() => getAlert()}>Click Child</button>
      <br />
    </>
  );
});

export const Parent = () => {
  // In order to gain access to the child component instance,
  // you need to assign it to a `ref`, so we call `useRef()` to get one
  const childRef = useRef<any>();

  return (
    <div>
      <Child ref={childRef} />
      <button onClick={() => childRef.current.getAlert()}>Click Parent</button>
    </div>
  );
};
