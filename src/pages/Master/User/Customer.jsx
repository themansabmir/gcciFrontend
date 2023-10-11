import React from 'react'
import { Link } from 'react-router-dom'

const Customer = () => {
  return (
    <div>
      <Link to={'/masters/createcustomer'}>
        <h1>Create Customer</h1>
      </Link>
    </div>
  );
}

export default Customer