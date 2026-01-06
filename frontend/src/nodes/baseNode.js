import { Handle, Position } from 'reactflow';
import './baseNode.css';
export const BaseNode = ({
  title,
  inputs = [],
  outputs = [],
  children,
  width = 200,
  height = 80,
}) => {
  return (
    <div className='base-node'>
      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={input.id}
          style={{
            top: `${((index + 1) * 100) / (inputs.length + 1)}%`,
          }}
        />
      ))}

      {/* Node Title */}
      <div className="base-node__title">
        <span >{title}</span>
      </div>

      {/* Node Content */}
      <div className="base-node__content" >
        {children}
      </div>

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={output.id}
        style={{ top: `${((index + 1) * 100) / (outputs.length + 1)}%` }}
        />
      ))}
    </div>
  );
};
