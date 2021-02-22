import React, { useState } from "react";
import MenuItem from "./MenuItem";

export function Submenu({ items, className, style, menuItems }) {
  const [hover, setHover] = useState("");

  return (
    <div
      className={`sub-menu ${className || ""}`}
      onMouseLeave={() => setHover("")}
      {...{ style }}
    >
      <div>
        {items.map((item, index) => (
          <MenuItem
            key={item.id}
            {...{ menuItems, index, item, hover, setHover }}
          />
        ))}
      </div>
    </div>
  );
}

export default Submenu;
