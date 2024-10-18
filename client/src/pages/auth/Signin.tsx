import React from "react";
import { Link } from "react-router-dom";

const Signin: React.FC = () => {
  return (
    <div>
      <Link to="/auth/signup">Signup</Link>
    </div>
  );
};

export default Signin;
