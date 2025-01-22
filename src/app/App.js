import React, { useState } from "react";
import {
  Background,
  ReactFlow,
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
  Controls,
  ControlButton,
  MagicWand,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { CustomTreeNode } from "../components/custom-tree-node";
import { CustomRootTreeNode } from "../components/custom-root-tree-node";
import { initialTree, treeRootId } from "../mock/initialElements";
import { layoutElements } from "../mock/layoutElements";

const nodeTypes = {
  custom: CustomTreeNode,
  customRoot: CustomRootTreeNode,
};

const { nodes: layoutedNodes, edges: layoutedEdges } = layoutElements(
  initialTree,
  treeRootId,
  "LR"
);

const LayoutFlow = () => {
  const [nodes, setNodes] = useNodesState(layoutedNodes);
  const [edges, setEdges] = useEdgesState(layoutedEdges);
  const [currentRoot, setCurrentRoot] = useState(initialTree[treeRootId]);

  const onNodeClick = (e, node) => {
    if (node.data?.isButton) {
      const nodeParent = Object.values(initialTree).filter(
        (node) => node?.children && node.children.includes(currentRoot?.id)
      )[0];

      if (!nodeParent) {
        return;
      }

      const { nodes: updatedNodes, edges: updatedEdges } = layoutElements(
        initialTree,
        nodeParent.id,
        "LR"
      );

      if (nodeParent.data?.isRoot) {
        restoreTree();
      } else {
        setCurrentRoot(nodeParent);
        setNodes(updatedNodes);
        setEdges(updatedEdges);
      }
      return;
    }

    if (node.data?.isRoot) {
      return;
    }

    const { nodes: updatedNodes, edges: updatedEdges } = layoutElements(
      initialTree,
      node.data.id,
      "LR"
    );

    setCurrentRoot(node);
    setNodes(updatedNodes);
    setEdges(updatedEdges);
  };

  const restoreTree = () => {
    setCurrentRoot(initialTree[treeRootId]);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={onNodeClick}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        nodeTypes={nodeTypes}
        style={{ backgroundColor: "#F7F9FB" }}
      >
        <Panel position="top-left">
          <button onClick={restoreTree}>Вернуться в начало</button>
        </Panel>
        {currentRoot?.data?.info && (
          <Panel position="top-right">
            <div
              style={{
                width: "30vw",
                height: "90vh",
                background: "white",
                borderRadius: "6px",
                padding: "10px",
              }}
            >
              <h2>{currentRoot?.data?.info.title}</h2>
              <p>{currentRoot?.data?.info.subtitle}</p>
              <p>{currentRoot?.data?.info.text}</p>
            </div>
          </Panel>
        )}
        <Background />
      </ReactFlow>
    </div>
  );
};

export default LayoutFlow;
