import { UserButton } from '@clerk/nextjs';
import React, { useState } from 'react';

function CustomUserButton() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      {/* Your custom content or link */}
      <div onClick={toggleDropdown}>
        <UserButton />
      </div>
    </div>
  );
}

export default CustomUserButton;
