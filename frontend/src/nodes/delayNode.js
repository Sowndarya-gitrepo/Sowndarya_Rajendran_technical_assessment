import React from 'react';
import { BaseNode } from './baseNode';
import { useState } from 'react';

export const DelayNode = ({ id, data }) => {
  const [currText, setCurrText] = useState( // State to hold the delay time text
    data.text || 'enter delay time in ms'
  );

  return (
    <BaseNode
      title="Delay"
      inputs={[{ id: `${id}-input` }]}
      outputs={[{ id: `${id}-output` }]}
    >
      <label>Delay (ms)
        <input
          className='base-node__input'
          type="number"
          placeholder="Delay (ms)"
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
        />
      </label>
    </BaseNode>
  )
};



