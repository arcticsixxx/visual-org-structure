import React from "react";
import { ReactFlow, Background } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "Локация" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "Подразделение" } },
  { id: "3", position: { x: 0, y: 200 }, data: { label: "Отдел" } },
  { id: "4", position: { x: 0, y: 300 }, data: { label: "Группа" } },
  { id: "5", position: { x: 0, y: 400 }, data: { label: "Сотрудник" } },
];
const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e4-5", source: "4", target: "5" },
];

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow nodes={initialNodes} edges={initialEdges}>
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
