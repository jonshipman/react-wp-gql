import React, { useState } from "react";
import { useMenu } from "../hooks";
import MenuItem from "./MenuItem";

export function Menu({ className, location = "HEADER_MENU" }) {
  const [hover, setHover] = useState("");
  const { menuItems } = useMenu({ location });

  const id = location.toLowerCase().replace(/_/g, "-") + "-menu";

  return (
    <div {...{ className }}>
      <div
        {...{ id }}
        className="menu-wrapper"
        onMouseLeave={() => setHover("")}
      >
        {menuItems.map((item, index) => (
          <MenuItem
            key={item.id}
            {...{ menuItems, index, hover, setHover, item }}
          />
        ))}
      </div>
    </div>
  );
}

export default Menu;
