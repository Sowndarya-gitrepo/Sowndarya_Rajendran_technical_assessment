//outputNode.js
import { useState } from 'react';
import { BaseNode } from './baseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(
    data?.outputType || 'Text'
  );

  return (
    <BaseNode
      title="Output"
      inputs={[{ id: `${id}-value` }]}
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
          className='base-node__select'
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};




