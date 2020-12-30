import React, {Component} from 'react';
import './App.css';
import fire from './firebase/fire';
import Login from'./Components/Login';
import Homepage from './Components/Homepage';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {}
    }
  }

  componentDidMount(){
    this.authListener();
  }
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if(user){
        this.setState({user});
      }else {
        this.setState({user: null});
      }
    });
  }

  render(){
    return (
      <div className="App"> 
      
        {this.state.user ? 
          <Homepage/>
          :
          <Login/>
        }
      </div>
    );
  }
}

export default App;
