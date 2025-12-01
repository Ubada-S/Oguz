import React from "react";
import { useState } from "react";

const Header2 = () => {
  return (
    <div className="min-h-screen flex-center bg-neutral-900 py-12">
      <FlyoutLink href="#" flyoutContent>
        Pricing
      </FlyoutLink>
    </div>
  );
};

const FlyoutLink = ({ children, href, flyoutContent }) => {
  const [open, setOpen] = useState(false);
  const showFlyout = open && flyoutContent;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative w-fit h-fit"
    >
      <a href={href} className="relative text-white">
        {children}
        {/* TODO: Render underline animation thingy */}
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute bg-red-500 -bottom-2 -left-2 -right-2 h-1 origin-left rounded-full transition-transform duration-300 ease-out"
        />
      </a>
      {/* TODO: Render flyout content */}
    </div>
  );
};

export default Header2;
