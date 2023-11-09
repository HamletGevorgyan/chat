import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function LogoutWrapper(props) {
  const { children } = props;
  const token = useSelector((state) => state.users.token);
  if (token) {
    return <Navigate to="/messages" replace />;
  }
  return (// eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {children}
    </>
  );
}

export default LogoutWrapper;

LogoutWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
