// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { MathNode } from './nodes/mathNode';
import { DelayNode } from './nodes/delayNode';
import { ConditionNode } from './nodes/conditionNode';
import { MergeNode } from './nodes/mergeNode';
import { APINode } from './nodes/apiNode';
import './ui.css';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };   /* hides the React Flow watermark */
const nodeTypes = {                             /* mapped five new nodetypes to the component */
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  customMath: MathNode,
  delay: DelayNode,
  condition: ConditionNode,
  merge: MergeNode,
  api: APINode,
};

const selector = (state) => ({                  /* selecting required state variables and functions from the store */
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect
});

export const PipelineUI = () => {                /* main UI component */
  const reactFlowWrapper = useRef(null);       /* reference to the React Flow wrapper div */
  const [reactFlowInstance, setReactFlowInstance] = useState(null);  /* state to hold the React Flow instance */
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);           /* using the selector to get state and functions from the store */

  const getInitNodeData = (nodeID, type) => { /* function to initialize node data based on its type */
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  }

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();  /* get the bounds of the React Flow wrapper */
      if (event?.dataTransfer?.getData('application/reactflow')) {                /* check if the dragged data is valid reactflow data */
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <>
      <div ref={reactFlowWrapper} style={{ width: '100wv', height: '70vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType='smoothstep'
        >
          <Background color="#aaa" gap={gridSize} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </>
  )
}
/*This file sets up a fully interactive drag-and-drop pipeline builder using React Flow and Zustand, supports custom node 
types,handles node creation via drag-and-drop, and manages global state efficiently while providing a polished UI with 
grid snapping, controls, and a minimap*/