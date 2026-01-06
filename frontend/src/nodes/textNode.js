// textNode.js
import { useEffect, useMemo, useRef, useState } from 'react';
import { BaseNode } from './baseNode';
import './baseNode.css';

/**
 * Extract valid JS variable names inside {{ }}
 */
const extractVariables = (text) => {
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;         /* regex finds whether it is a valid JS variable name */
  const vars = new Set();                                            /* use Set to avoid duplicates */
  let match;

  while ((match = regex.exec(text)) !== null) {                     /* loops through all matches and collects variable names */
    vars.add(match[1]);
  }

  return Array.from(vars);                                          /* returns array of unique variables */
};

export const TextNode = ({ id, data }) => {                         /*receives node id and node data as props*/
  const [text, setText] = useState(data?.text || '');               /* state to hold the text content */
  const textareaRef = useRef(null);                                 /* ref to access the textarea DOM element */

  /**
   * Auto resize textarea (height + width) - Runs on text change
   */
  useEffect(() => {
    if (!textareaRef.current) return;

    const el = textareaRef.current;

    el.style.height = 'auto';
    el.style.width = '200px';

    el.style.height = `${el.scrollHeight}px`;
    el.style.width = `${Math.max(200, el.scrollWidth)}px`;
  }, [text]);

  /**
   * Parse variables from text
   */
  const variables = useMemo(() => extractVariables(text), [text]);

  /**
   * Convert variables to input handles
   */
  const inputHandles = variables.map((v) => ({
    id: `${id}-var-${v}`,
    label: v,
  }));

  return (
    <BaseNode
      title="Text"
      inputs={inputHandles}
      outputs={[{ id: `${id}-output` }]}
    >
      {/* For Auto Resizing Textarea */}
      <textarea
        className='text_area'
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type text here... Use {{variable}}"
      />
    </BaseNode>
  );
};


