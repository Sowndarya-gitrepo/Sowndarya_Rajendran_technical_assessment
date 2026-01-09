import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;

/*“This is the main application component that integrates the toolbar, pipeline UI, and submit button components 
to create the overall user interface for building and submitting pipelines.”*/
