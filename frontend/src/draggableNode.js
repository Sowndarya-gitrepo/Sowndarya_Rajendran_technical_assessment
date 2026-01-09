// draggableNode.js
import './toolbar.css';
export const DraggableNode = ({ type, label }) => {           // type can be 'input', 'default', or 'output'
  const onDragStart = (event, nodeType) => {                  // function to handle drag start
    const appData = { nodeType }                              //prepare metadata for the dragged node as an object
    event.target.style.cursor = 'grabbing';                   //for better UX during drag
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));   //attach data to the drag event
    event.dataTransfer.effectAllowed = 'move';                //helps indicate the type of operation such as drag and drop
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}  // reset cursor on drag end
      style={{
        cursor: 'grab',
        minWidth: '80px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '8px',
        backgroundColor: '#1C2536',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
      draggable              //make the div draggable
    >
      <span style={{ color: '#fff' }}>{label}</span>
    </div>
  );
};


/*“This component represents a draggable node palette item. It uses the HTML5 drag-and-drop API to pass node metadata 
to React Flow, allowing the canvas to dynamically create nodes based on the dragged type.”*/
