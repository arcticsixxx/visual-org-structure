import React, { memo } from "react";

export const CustomRootTreeNode = memo(({ data }) => {
  const { label } = data;

  return (
    <div className="nodrag">
      <div>{label}</div>
    </div>
  );
});
