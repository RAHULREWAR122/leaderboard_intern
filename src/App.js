import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import NavBar from './Components/nav';
import LeaderBoard from './Components/leaderboard';
import { store } from './reducer/store';
import Footer from './Components/footer';


const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
         <NavBar/>  
         <LeaderBoard/>
         <Footer/>
      </div>
     </Provider>
  );
};

export default App;
