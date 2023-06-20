import React from "react";
import { useState } from "react";
import {
  StyledDropdownButton,
  StyledDropdownTitle,
  StyledDropdownMenu,
  StyledDropdownMenuItem,
} from "./Dropdown.style";

const DropDown = ({ selected, setSelected, menu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleisOpen = () => setIsOpen(!isOpen);

  return (
    <div className="dropdown">
      <StyledDropdownButton onClick={handleisOpen}>
        <StyledDropdownTitle
          className="is-family-code has-text-weight-bold"
          value={selected}
        >
          {selected}
          <span className="fas fa--caret-down" />
        </StyledDropdownTitle>
      </StyledDropdownButton>
      {isOpen ? (
        <StyledDropdownMenu>
          {menu.map((item, idx) => (
            <StyledDropdownMenuItem
              key={item}
              onClick={() => {
                handleisOpen();
                setSelected(item);
              }}
            >
              {item}
            </StyledDropdownMenuItem>
          ))}
        </StyledDropdownMenu>
      ) : null}
    </div>
  );
};

export default DropDown;
