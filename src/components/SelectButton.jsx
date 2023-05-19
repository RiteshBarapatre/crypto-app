import React from 'react'

const SelectButton = ({ children, selected, onClick }) => {

  return (
    <span
      onClick={onClick}
      className="selectButton"
      style={{
        backgroundColor: selected ? "gold" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
        cursor: "pointer"
      }}
    >
      {children}
    </span>
  );
};

export default SelectButton;
