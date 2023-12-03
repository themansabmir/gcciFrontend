import React, { useEffect, useRef, useState } from "react";

const SearchDropDown = ({ options, onSelect, searchKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = options.filter((option) =>
     String(option[searchKey]).toLowerCase().includes(term.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className='dropdown' ref={dropdownRef}>
      <div className='dropdown-toggle' onClick={handleToggle}>
        Toggle Dropdown
      </div>
      {isOpen && (
        <div className='dropdown-menu'>
          <input
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={handleSearch}
          />
          <ul>
            {filteredOptions.map((option) => (
              <li key={option} onClick={() => handleSelect(option)}>
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchDropDown;
