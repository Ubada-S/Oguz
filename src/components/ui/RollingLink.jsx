import React from "react";
import { Link } from "react-router-dom";

const RollingLink = ({ to, label, count, className = "", ...props }) => {
  return (
    <Link to={to} className={`group ${className}`} {...props}>
      {/* The Rolling Text Logic */}
      <div className="roll-link">
        <span className="roll-text" data-hover={label}>
          {label}
        </span>
      </div>

      {/* Optional Count */}
      {count && <span className="opacity-60">[{count}]</span>}
    </Link>
  );
};

export default RollingLink;
