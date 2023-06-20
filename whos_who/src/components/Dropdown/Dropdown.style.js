import React from "react";
import styled from "styled-components";

export const StyledDropdownButton = styled.button`
  height: 40px;
  width: 30vw;
  background-color: white;
  color: black;
  border: 1px solid #2D46BA;
  border-radius: 12px;
  cursor: pointer;
`;

export const StyledDropdownTitle = styled.div``;

export const StyledDropdownMenu = styled.ul`
  position: absolute;
  list-style-type: none;
  margin: 35px 0;
  padding: 10;
  border: 1px solid gray;
  width: 100%;
  z-index: 200;
  max-height: 200px;
  overflow: auto;
`;

export const StyledDropdownMenuItem = styled.li`
  width: 100%;
  height: 100%;
  text-align: center;
  background: white;
  border: none;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e8f1d5;
  }
`;

export const StyledDropdownMenuButton = styled.div``;
