import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="success">
      <h2 id="success-msg" className="medium text-primary">
        Your application has been saved.
      </h2>

      <Link to="/">
        <button className="btn btn-primary">Go back</button>
      </Link>
    </div>
  );
};

export default Success;
