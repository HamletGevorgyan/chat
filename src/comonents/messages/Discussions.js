import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { listRequest } from '../../store/actions/users';

let timeout;

function Discussions() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(listRequest());
  }, []);

  const handleSearch = useCallback((ev) => {
    setSearch(ev.target.value);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch(listRequest({
        search,
      }));
    }, 500);
  }, [search]);

  const usersList = useSelector((state) => state.users.usersList);

  return (
    <section className="discussions">
      <div className="discussion search">
        <div className="searchbar">
          <i className="fa fa-search" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
          />
        </div>
      </div>

      {usersList.map((user) => (
        <NavLink to={`/messages/${user.id}`} className="discussion message-active" key={user.id}>
          <div
            className="photo"
            style={{ backgroundImage: `url(${user.avatar})` }}
          >
            <div className="online" />
          </div>
          <div className="desc-contact">
            <p className="name">{`${user.firstName} ${user.lastName}`}</p>
            <p className="message">9 pm at the bar if possible 😳</p>
          </div>
          <div className="timer">12 sec</div>
        </NavLink>
      ))}
    </section>
  );
}

export default Discussions;
