import React, { useCallback, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Account from '../helpers/Account';
import { socketDisconnect, socketInit } from '../store/actions/socket';
import { getProfileRequest } from '../store/actions/users';

function Wrapper(props) {
  const { children } = props;
  const token = useSelector((state) => state.users.token);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(socketInit(token));
      dispatch(getProfileRequest());
    } else {
      dispatch(socketDisconnect());
    }
  }, []);
  const handleLogout = useCallback(() => {
    Account.deleteInfo();
  }, []);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div id="messages">
      <div className="container-fluid">
        <div className="row">
          <nav className="menu">
            <ul className="items">
              <li className="item">
                <i className="fa logout" aria-hidden="true" onClick={handleLogout}>Logout</i>
              </li>
              <li className="item">
                <i className="fa fa-home" aria-hidden="true" />
              </li>
              <li className="item">
                <i className="fa fa-user" aria-hidden="true" />
              </li>
              <li className="item">
                <i className="fa fa-pencil" aria-hidden="true" />
              </li>
              <li className="item item-active">
                <i className="fa fa-commenting" aria-hidden="true" />
              </li>
              <li className="item">
                <i className="fa fa-file" aria-hidden="true" />
              </li>
              <li className="item">
                <i className="fa fa-cog" aria-hidden="true" />
              </li>
            </ul>
          </nav>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Wrapper;

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
