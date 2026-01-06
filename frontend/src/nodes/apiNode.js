import React from 'react';
import { BaseNode } from './baseNode';
export const APINode = ({ id }) => (
  <BaseNode
    title="API"
    inputs={[{ id: `${id}-request` }]}             // Input handle for API request
    outputs={[{ id: `${id}-response` }]}
  >
    <input placeholder="API URL" />
  </BaseNode>
);
