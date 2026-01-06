import React from 'react';
import { BaseNode } from './baseNode';

export const ConditionNode = ({ id }) => (
  <BaseNode
    title="Condition"
    inputs={[{ id: `${id}-value` }]}
    outputs={[                                  // Output handles for true and false branches
      { id: `${id}-true` },
      { id: `${id}-false` }
    ]}
  >
    <input placeholder="x > 10" />
  </BaseNode>
);
