import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import WebcamCapture from './WebcamCapture';
import Preview from './Preview';
import Chats from './Chats';
import ChatView from './ChatView';
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, login, logout } from './features/appSlice';
import { auth } from './firebase';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid
        }))
      }
      else {
        dispatch(logout())
      }
    })
  }, [])

  return (
    <div className="app">
      <Router>
        {!user ? (<Login />) :
          (<>
            <img src='https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg' alt='' className='app__logo' />
            <div className='app__body'>
              <div className='app__bodyBackground'>
                <Switch>
                  <Route exact path="/">
                    <WebcamCapture />
                  </Route>
                  <Route path='/preview'>
                    <Preview />
                  </Route>
                  <Route path='/chats/view'>
                    <ChatView />
                  </Route>
                  <Route path='/chats'>
                    <Chats />
                  </Route>
                  <Redirect to='/' />
                </Switch>
              </div>
            </div>
          </>
          )
        }

      </Router >
    </div >
  );
}

export default App;
