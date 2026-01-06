import React from 'react';
import { BaseNode } from './baseNode';
export const MergeNode = ({ id }) => (
  <BaseNode
    title="Merge"
    inputs={[                               // Input handles for two inputs
      { id: `${id}-input1` },
      { id: `${id}-input2` }
    ]}
    outputs={[{ id: `${id}-merged` }]}      // Output handle for merged output
  >
    <span>Merge Inputs</span>
  </BaseNode>
);
