import styled from 'styled-components';

const Button = styled.button`
  background: #e9e9e9;
  font-size: 1em;
  margin: 1em;
  padding: 1em 1em;
  border: 2px solid #96dbfa;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  &:active {
    vertical-align: top;
    padding: 1.1em 1em 0.9em;
  }
`;

export default Button;
