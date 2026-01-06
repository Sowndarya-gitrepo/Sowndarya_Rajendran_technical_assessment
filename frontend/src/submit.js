// submit.js
import './submit.css';
import { useStore } from './store';

export const SubmitButton = () => {
    const nodes = useStore(state => state.nodes);          // Get nodes from the store
    const edges = useStore(state => state.edges);          // Get edges from the store

    // Function to handle submission
    const handleSubmit = async () => {                    
        try {         
            // Send POST request to backend with nodes and edges to analyze the pipeline                                     
            const res = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });
            //converts backend end response to json
            const data = await res.json();
            console.log(data);

            alert(
                `Pipeline Analysis \n\n` +
                `Nodes: ${data.num_nodes}\n` +
                `Edges: ${data.num_edges}\n` +
                `Is DAG: ${data.is_dag ? 'Yes ✅' : 'No ❌'}`
            );
        } catch (err) {
            alert('Backend connection failed');
            console.error(err);
        }
    };

    return (
        <div className="btn-wrapper">
            <button type="button" className="submit-btn" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
};

