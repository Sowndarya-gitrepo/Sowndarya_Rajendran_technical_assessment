
import { BaseNode } from './baseNode';

export const MathNode = ({ id }) => (
  <BaseNode
    title="Math"
    inputs={[{ id: `${id}-a` }, { id: `${id}-b` }]}  // Input handles for two numbers
    outputs={[{ id: `${id}-result` }]}              // Output handle for the result
  >
    <select>
      <option>Add</option>
      <option>Multiply</option>
    </select>
  </BaseNode>
);
