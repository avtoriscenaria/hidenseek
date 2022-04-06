import React from "react";
import { Paper as PaperLib } from "@material-ui/core";

interface IPaper {
  children?: React.FC | any[];
  className?: string;
  style?: any;
}

const Paper: React.FC<IPaper> = ({ children, className, style }) => {
  return (
    <PaperLib className={className} style={style}>
      {children}
    </PaperLib>
  );
};

export default Paper;
