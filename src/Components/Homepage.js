import React, { Component } from 'react';
import fire from '../firebase/fire';

class Homepage extends Component {
    constructor(props){
        super(props);
        this.logout=this.logout.bind(this);
    }

    logout(){
        fire.auth().signOut();
    }

    render(){
        return(
            <div className="App">
                <div>Home Page</div>
                <button onClick={this.logout}>Log Out</button>
            </div>
        );
    }
}

export default Homepage;