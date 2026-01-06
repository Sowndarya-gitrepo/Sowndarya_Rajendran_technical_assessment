// toolbar.js

import { DraggableNode } from './draggableNode';
import './toolbar.css';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            {/* added a className for toolbar */}
            <div className='toolbar'
                style={{ marginTop: '10px', justifyContent: 'center', display: 'flex', flexWrap: 'wrap', gap: '10px' }}
            > 
            {/* Added more node types to the toolbar */}
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='customMath' label='Math' />           
                <DraggableNode type='delay' label='Delay' />
                <DraggableNode type='condition' label='Condition' />
                <DraggableNode type='merge' label='Merge' />
                <DraggableNode type='api' label='API' />
            </div>
        </div>
    );
};
