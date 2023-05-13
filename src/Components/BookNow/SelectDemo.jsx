
import { useState } from 'react';

const SelectDemo = () => {
    const [fruit, setFruit] = useState();
  return (
    <div>
        <select id="fruits" defaultValue="Select fruit"
              onChange={(e) => setFruit(e.target.value)}>
        <option value="Apple">Apple</option>
        <option value="Pear">Pear</option>
        <option value="Pineapple">Pineapple</option>
      </select>
      <h1>Selected Fruit: {fruit}</h1>
    </div>
  )
}

export default SelectDemo;