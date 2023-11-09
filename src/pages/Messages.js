import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Wrapper from '../comonents/Wrapper';
import Discussions from '../comonents/messages/Discussions';
import MainChatSide from '../comonents/messages/MainChatSide';
import { getMessagesList } from '../store/actions/messages';
import { getSingleUserRequest } from '../store/actions/users';

function Messages() {
  const { friendId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!friendId) {
      return;
    }
    dispatch(getMessagesList({
      friendId,
    }));
    dispatch(getSingleUserRequest({
      userId: friendId,
    }));
  }, [friendId]);
  return (
    <Wrapper>
      {/* <div className="online"></div> */}
      <Discussions />
      <MainChatSide friendId={friendId} />
    </Wrapper>
  );
}

export default Messages;
