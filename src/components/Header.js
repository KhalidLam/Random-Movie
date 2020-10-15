import React from "react";
import { Link } from "react-router-dom";

const Header = ({ handleSuggBtn }) => {
  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>RandMovie</Link>
      </div>
      <div className='buttons'>
        <button className='btn btn-green' onClick={handleSuggBtn}>
          Suggest Me Movie
        </button>
        <button className='btn btn-grey'>
          <Link to='/filter'>Filters</Link>
        </button>
      </div>
    </header>
  );
};

export default Header;
