
import { useState } from 'react';
import styled from 'styled-components';

//npm install styled-components
// Styled components for the button, unordered list, and list item
const Button = styled.button`
  cursor: pointer;
  border: 1px solid #2e63de;
  padding: 8px;
  min-width: 64px;

  background: transparent;

  transition: all 0.1s ease-in;

  &:hover {
    background: #e3234d;
    color: #ffffff;
  }
`;

const UnorderedList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
`;

function Approach4() {
  const [fruits, setFruits] = useState([
    { id: '1', name: 'Apple', isFavorite: false },
    { id: '2', name: 'Peach', isFavorite: true },
    { id: '3', name: 'Strawberry', isFavorite: false },
  ]);

  const handleClick = (item) => {
    setFruits(
      fruits.map((fruit) =>
        fruit.id === item.id
          ? { ...fruit, isFavorite: !fruit.isFavorite }
          : fruit
      )
    );
  };

  return (
    <div>
      <h3>Styled Components Example</h3>
      <Basket items={fruits} onClick={handleClick} />
    </div>
  );
}

function Basket({ items, onClick }) {
  return (
      <UnorderedList>
      {items.map((item) => (
        <ListItem key={item.id}>
          {item.name}
          {/* Button component from styled-components*/}
          <Button type="button" onClick={() => onClick(item)}>
            {item.isFavorite ? 'Unlike' : 'Like'}
          </Button>
        </ListItem>
      ))}
    </UnorderedList>
  );
}

export default Approach4;
