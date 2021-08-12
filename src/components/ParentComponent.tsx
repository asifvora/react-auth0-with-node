import React, { useState, useCallback } from "react";
import Count from "./Count";
import Title from "./Title";

export const ParentComponent = () => {
  const [age, setAge] = useState(25);
  const [salary, setSalary] = useState(50000);

//   const incrementAge = () => {
//   	setAge(age + 1)
//   }

//   const incrementSalary = () => {
//   	setSalary(salary + 1000)
//   }

  const incrementAge = useCallback(() => {
    setAge(age + 1);
  }, [age]);

  const incrementSalary = useCallback(() => {
    setSalary(salary + 1000);
  }, [salary]);

  return (
    <>
      <Title />
      <Count text="Age" count={age} handleClick={incrementAge}>
        Increment Age
      </Count>
      <Count text="Salary" count={salary} handleClick={incrementSalary}>
        Increment Salary
      </Count>
    </>
  );
};
