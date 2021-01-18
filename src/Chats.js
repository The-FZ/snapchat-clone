import React, { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import './Chats.css';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { db, auth } from './firebase';
import Chat from './Chat';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from './features/appSlice';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useHistory } from 'react-router-dom';
import { resetCameraImage } from './features/cameraSlice';

function Chats() {

  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))));
  }, []);

  const takeSnap = () => {
    dispatch(resetCameraImage());
    history.push('/');
  }

  return (
    <div className='chats'>
      <div className='chats__header'>
        <Avatar src={user.profilePic} className='chats__avatar' onClick={() => auth.signOut()} />
        <div className='chats__search'>
          <SearchIcon className='search__icon' />
          <input type='text' placeholder='Friends' />
        </div>
        <ChatBubbleIcon className='chats__chatIcon' />
      </div>

      <div className='chats__posts'>
        {
          posts.map(({ id, data: { profilePic, username, timestamp, imageUrl, read } }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              timestamp={timestamp}
              profilePic={profilePic}
              imageUrl={imageUrl}
              read={read}
            />
          ))
        }
      </div>

      <RadioButtonUncheckedIcon
        onClick={takeSnap}
        className='chats__takePicIcon'
        fontSize='large' />

    </div>
  )
}

export default Chats;
