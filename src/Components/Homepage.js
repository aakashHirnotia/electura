import React, { Component } from 'react';
import fire from '../firebase/fire';

class Homepage extends Component {
    constructor(props){
        super(props);
        this.state = {
            files : null,
            listFiles: [] //already uploaded files
        }
        this.logout=this.logout.bind(this);
    }

    logout(){
        fire.auth().signOut();
    }

    async componentDidMount(){

        //fetching already uploaded files.
        const storageRef = fire.storage().ref();
        var listRef = storageRef.child('/');
        const listFiles = [];
        await listRef.listAll().then(function(res) {
            res.items.forEach(function(fileRef){
                console.log("File: ", fileRef.toString().substring(31));
                listFiles.push({
                    fileName: fileRef.toString().substring(31)   
                });
            });
        }).catch(function(error) {
            console.log(error);
        });
        this.setState({listFiles:listFiles});
        console.log(this.state.listFiles.length);
    }

    onFileChange = (files) => {
        this.setState({files:files});
    }

    onClick = async () => {
        if(!this.state.files){
            alert("DANGER: Choose file");
            window.location.reload();
        }
        const file = this.state.files[0];
        const storageRef = fire.storage().ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file).then(() => {
            console.log("Uploaded file", file.name);
            alert("Success: File Uploaded");
            window.location.reload();
        });
    }

    render(){
        return(
            <div style={{textAlign:'center',maxWidth:"50%",margin:"50px auto ",borderStyle:"dotted"}}>
                <h1><strong style={{color:'red',}}>Home Page</strong></h1>
                <button onClick={this.logout}>Log Out</button>
                <br></br><br></br>
                
                <div>
                    <input type="file" id="file" onChange={(e)=> {this.onFileChange(e.target.files)}} style={{display:"none"}}/>
                    <label htmlFor="file" style={{cursor:"pointer"}}>
                        <span className="fa fa-upload" style={{fontSize:"30px",color:"red",marginLeft:"0px"}}></span>
                    </label>
                </div>
                <button onClick={this.onClick}>Upload</button>
                <br></br><br></br>
                <div className="orelement" style={{marginLeft:"28%"}}>
                    <div className="hrline"></div>
                    <div className="login-statement4"><b>Files</b></div>
                    <div className="hrline"></div>
                </div>
                <div>
                    {(this.state.listFiles).map(item => (
                        <div key={item.fileName} style={{color:"white",margin:"10px"}}>{item.fileName}</div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Homepage;