import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
// import moment from 'moment';
import PropTypes from 'prop-types';
import { getMessagesList, sendMessage } from '../../store/actions/messages';
import { getProfileRequest } from '../../store/actions/users';

function MainChatSide(props) {
  const ref = useRef();
  const { friendId = 1 } = props;
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(getProfileRequest());
    dispatch(getMessagesList());
  }, []);

  const handleSend = useCallback(() => {
    if (!message) {
      return;
    }
    dispatch(sendMessage(
      { text: message, friendId },
    ));
    setMessage('');
  }, [message, friendId]);

  const singleUser = useSelector((state) => state.users.singleUser);
  const messagesList = useSelector((state) => state.messages.messagesList);
  const profile = useSelector((state) => state.users.profile);

  useEffect(() => {
    console.log(ref.current.scrollTo);
    ref.current.scrollTo({
      bottom: ref.current.scrollHeight,
    });
  }, [messagesList]);
  return (
    <section className="chat">
      {!_.isEmpty(singleUser) ? (
        <div className="header-chat">
          <img src={`${singleUser.avatar}`} alt="" className="photo" width={50} style={{ borderRadius: 50 }} />
          <p className="name">{`${singleUser.firstName} ${singleUser.lastName}`}</p>
          <i className="icon clickable fa fa-ellipsis-h right" aria-hidden="true" />
        </div>
      ) : null}
      <div className="messages-chat" ref={ref}>
        {messagesList.map((m) => (
          m.from !== profile.id ? (
            <React.Fragment key={m.id}>
              <div className="message">
                <div
                  className="photo"
                  style={{ backgroundImage: `url(${singleUser.avatar})` }}
                >
                  <div className="online" />
                </div>
                <p className="text">
                  {' '}
                  {m.text}
                  {' '}
                </p>
              </div>
              <p className="time"> 14h58</p>
            </React.Fragment>
          ) : (
            <React.Fragment key={m.id}>
              <div className="message text-only">
                <div className="response">
                  <p className="text">
                    {' '}
                    {m.text}
                  </p>
                </div>
              </div>
            </React.Fragment>
          )
        ))}

        {/*    <div className="message text-only"> */}
        {/*        <div className="response"> */}
        {/*            <p className="text"> Hey Megan ! It's been a while 😃</p> */}
        {/*        </div> */}
        {/*    </div> */}
        {/*    <div className="message text-only"> */}
        {/*        <div className="response"> */}
        {/*            <p className="text"> When can we meet ?</p> */}
        {/*        </div> */}
        {/*    </div> */}
        {/*    <p className="response-time time"> 15h04</p> */}
        {/*    <div className="message"> */}
        {/*        <div className="photo" */}
        {/*             style={{backgroundImage: 'url(https://i.pinimg.com/originals/a9/26/52/a926525d966c9479c18d3b4f8e64b434.jpg'}}> */}
        {/*            <div className="online"></div> */}
        {/*        </div> */}
        {/*        <p className="text"> 9 pm at the bar if possible 😳</p> */}
        {/*    </div> */}
        {/* </div> */}
        <div className="footer-chat">
          <i
            className="icon fa fa-smile-o clickable"
            style={{ fontSize: '25pt' }}
            aria-hidden="true"
          />
          <textarea
            value={message}
            onChange={(ev) => setMessage(ev.target.value)}
            style={{ resize: 'none' }}
            type="text"
            className="write-message"
            placeholder="Type your message here"
          />
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button type="submit" disabled={!message} onClick={handleSend}>
            <i className="icon send fa fa-paper-plane-o clickable" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default MainChatSide;

MainChatSide.propTypes = {
  friendId: PropTypes.number,
};
MainChatSide.defaultProps = {
  friendId: 0,
};
