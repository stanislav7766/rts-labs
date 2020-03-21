import React from 'react';
import {Link} from 'react-router-dom';

const ButtonGroup = () => (
  <div className="mt-4 text-center mx-auto">
    <div className="btn-group">
      <Link className="btn btn-info" to="/">
        home
      </Link>
      <Link className="btn btn-info" to="/lab11">
        lab 1.1
      </Link>
      <Link className="btn btn-info" to="/lab12">
        lab 1.2
      </Link>
      <Link className="btn btn-info" to="/lab21">
        lab 2.1
      </Link>
      <Link className="btn btn-info" to="/lab22">
        lab 2.2
      </Link>
    </div>
  </div>
);
export default ButtonGroup;
