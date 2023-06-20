import React from "react";
import styled from "styled-components";

const Card = styled.div`
  height: ${({ h }) => h};
  width: ${({ w }) => w};
  background: ${({ bg }) => bg};
  border: ${({ b }) => b};
  border-radius: ${({ br }) => br};
  color: ${({ c }) => c};
  margin: ${({ m }) => m};
  display: flex;
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  align-items: ${({ ai }) => (ai ? ai : "center")};
  justify-content: ${({ jc }) => (jc ? jc : "center")};
`;

export default Card;
