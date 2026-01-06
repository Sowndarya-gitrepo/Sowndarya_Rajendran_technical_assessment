// // inputNode.js
import { useState } from 'react';
import { BaseNode } from './baseNode';
import './baseNode.css';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(                   // State to hold the input name
    data?.inputName || id.replace('customInput-', 'input_')   // Default name if none provided
  );
  const [inputType, setInputType] = useState(                 // State to hold the input type
    data?.inputType || 'Text'                                 // Default type if none provided
  );

  return (
    <BaseNode                                                 // Using BaseNode component for consistent styling
      title="Input"
      outputs={[{ id: `${id}-value` }]}
    >
      <label>
        Name
        <input
          className='base-node__input'
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
        />
      </label>

      <label>
        Type
        <select
          className='base-node select'
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};


