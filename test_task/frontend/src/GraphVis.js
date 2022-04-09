import Graph from "react-graph-vis"
import { v4 as uuidv4 } from 'uuid'

function GraphVis (props)  {
  const graph = {
    nodes: [
      { id: 0, label: "[1,2]", title: "node 1 tootip text" },
      { id: 2, label: "[2,3]", title: "node 2 tootip text" },
      { id: 3, label: "Node 3", title: "node 3 tootip text" },
      { id: 4, label: "Node 4", title: "node 4 tootip text" },
      { id: 5, label: "Node 5", title: "node 5 tootip text" }
    ],
    edges: [
      { from: 0, to: 2 },
      { from: 0, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 }
    ]
  }

  const options =  {
        layout: {
           randomSeed: 10
        },
        edges: {
          color: "#000000",
          scaling: {
            label: {
              enabled: true,
            }
          },
          font: {
            align: 'top'
          },
          smooth: {
            enabled:true,
            type:'diagonalCross',
            roundness: 0.3
          },
          physics:false,
          length: 100
        },
        nodes: {
          color: "#ffffff",
          borderWidth: 2,
          shape: "circle",
          widthConstraint: {
            minimum: 50,
            maximum: 50
          },
          font: {
            size: 10
          }
        },
        physics: {
          enabled: true,
          repulsion: {
            nodeDistance: 0,
            springConstant: 0
          },
          solver: 'repulsion'
        },
        interaction: { 
          multiselect: true, 
          dragView: true,
          dragNodes: true
        }
      }

    return (
      <div id="graph" style={{ height: "80vh" }}>
        <Graph
          key={uuidv4()}
          graph={props.graph}
          options={options}
        />
        
      </div>
    );
  
}

export default GraphVis;
