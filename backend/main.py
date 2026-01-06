from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict
from collections import defaultdict, deque
from fastapi.middleware.cors import CORSMiddleware

# Initializes FastAPI application
app = FastAPI()

# Configures CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)
#health check endpoint
@app.get("/")
def read_root():
    return {"Ping": "Pong"}

# Pydantic models for request validation
# Edge model representing a connection between two nodes
class Edge(BaseModel):
    source: str
    target: str

#Describes the overall pipeline structure sent from the frontend
class Pipeline(BaseModel):
    nodes: List[Dict]
    edges: List[Edge]

# Function to check if the graph is a Directed Acyclic Graph (DAG)
def is_dag(nodes, edges) -> bool:
    graph = defaultdict(list)
#incoming edge count for each node
    indegree = {node["id"]: 0 for node in nodes}
# this loop builds the connection and track incoming edges
    for edge in edges:
        graph[edge.source].append(edge.target)
        indegree[edge.target] += 1
# starts with nodes having no incoming edges
    queue = deque([n for n in indegree if indegree[n] == 0])
    visited = 0
# processes nodes in topological order
    while queue:
        node = queue.popleft()
        visited += 1
        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)
# If all nodes are visited, it's a DAG
    return visited == len(nodes)

#receives pipeline data from frontend and analyzes it and sends back the analysis
@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    return {
        "num_nodes": len(pipeline.nodes),
        "num_edges": len(pipeline.edges),
        "is_dag": is_dag(pipeline.nodes, pipeline.edges),
    }
