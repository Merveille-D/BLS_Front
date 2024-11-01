"use client";
import * as React from "react";
import GenericTreeSelect from "rc-tree-select";
function SelectTree(props) {
  return <GenericTreeSelect {...props} />;
}
SelectTree.displayName = "SelectTree";
export { SelectTree };
