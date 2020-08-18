import React from "react";

const Header = ({ handleSuggBtn }) => {
  return (
    <header className='header'>
      <div className='logo'>RandMovie</div>
      <div className='buttons'>
        <button className='btn btn-green' onClick={handleSuggBtn}>
          Suggest Me Movie
        </button>
        <button className='btn btn-grey'>Filters</button>
      </div>
    </header>
  );
};

export default Header;
