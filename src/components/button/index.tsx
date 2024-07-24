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
      {dropdownOpen && (
        <div className="dropdown-content">
          {/* Dropdown options */}
          <button onClick={() => console.log('Option 1 clicked')}>
            Option 1
          </button>
          <button onClick={() => console.log('Option 2 clicked')}>
            Option 2
          </button>
          {/* Add more options as needed */}
        </div>
      )}
    </div>
  );
}

export default CustomUserButton;
