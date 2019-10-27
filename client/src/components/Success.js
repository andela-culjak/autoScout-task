import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div>
      <h2>Success!</h2>

      <Link to="/" className="btn btn-light">
        {" "}
        Go back{" "}
      </Link>
    </div>
  );
};

export default Success;
