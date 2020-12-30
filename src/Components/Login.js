import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import logo from '../images/logo.png';
import fire from '../firebase/fire';
import * as EmailValidator from "email-validator";

const intialState = {
    username: "",
    usernameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
    status: false,
    loginError: ""
  };

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = intialState;

		this.onChange = this.onChange.bind(this);
        this.login = this.login.bind(this) ;
        this.loginForm = this.loginForm.bind(this) ;
        this.signupForm = this.signupForm.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }
    signupForm(){
        this.setState({status: true,usernameError: "",passwordError: "",emailError: "",loginError:"",username:"",password:"",email:""});
    }
    loginForm(){
        this.setState({status: false,usernameError: "",passwordError: "",emailError: "",loginError:"",username:"",password:"",email:""});
    }

    validateLogin = (error) => {
        let loginError = "";
        let passwordError = "";
        let emailError = "";
        if (!this.state.password) {
          passwordError = "Password can't be empty";
        }
        if (!this.state.email) {
          emailError = "Email can't be empty";
        }
        else if(!EmailValidator.validate(this.state.email)) {
          emailError = "Invalid email";
        }  
        if (error.code==="auth/user-not-found") {
            loginError= "Invalid User ID or Password."
        }    
        if (
          passwordError ||
          emailError ||
          loginError
        ) {
          this.setState({
            passwordError,
            emailError,
            loginError
          });
          return false;
        }
        return true;
      };
    validate = () => {
        let usernameError = "";
        let passwordError = "";
        let emailError = "";
        if (!this.state.username) {
          usernameError = "User Name can't be empty";
        }
        if (!this.state.password) {
          passwordError = "Password can't be empty";
        }
        if (!this.state.email) {
          emailError = "Email can't be empty";
        }
        else if(!EmailValidator.validate(this.state.email)) {
          emailError = "Invalid email";
        }  
        if (
          usernameError ||
          passwordError ||
          emailError 
        ) {
          this.setState({
            usernameError,
            passwordError,
            emailError
          });
          return false;
        }
        return true;
      };

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
    }
    
    login(e){
        e.preventDefault();
        // const isValid = this.validate();
        // if(isValid){ 
            fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u) => {
            }).catch((error) => {
                if(!error.a){
                    this.validateLogin(error);
                    console.log(error);
                }
            });
        // }
    }

    registerUser(e){
        e.preventDefault();
        const isValid = this.validate();
        if(isValid){
            fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
            .catch((error) =>{
                console.log(error);
            })
        }
    }

	render() {
		
		return (
            !this.state.status 
            ?
            <div className="login_outer">
                <div className="login-card">
                    <div className="login-box">
                        <form>
                            <div className="row">
                                <div className="col-sm-12 text-center"><img src={logo} alt="logo" className="login-image" style={{marginLeft:'72px'}}/></div>
                            </div>
                            <div>
                                <div className="login-statement">Welcome! Please login to your account</div>
                                <div className="form-group">
                                    <TextField id="email"  label="User ID" value={this.state.email} onChange={this.onChange} name="email" autoComplete="off" />
                                    <div style={{ fontSize: 10, color: "red" }}>
                                        {this.state.emailError}
                                    </div>
                                </div>
                                <br></br>
                                <div className="form-group">
                                    <TextField id="passwrod" type="password" label="Password" value={this.state.password} onChange={this.onChange}	name="password"  autoComplete="off" />
                                    <div style={{ fontSize: 10, color: "red" }}>
                                        {this.state.passwordError}
                                    </div>
                                </div>
                                <div style={{ fontSize: 20, color: "red",textAlign: 'center' }}>
                                    {this.state.loginError}
                                </div>
                                <div className="row pt-5 pb-5">
                                    <div className="col-sm-12 text-center">
                                        <input type="submit" value="Login" onClick={this.login} className="login-submit"/>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="signup">
                        <div className="signUpInner">
                            <div className="login-statement2" >Don't have an account</div>
                            <strong className="login-statement3" onClick={this.signupForm}>SIGN UP here</strong>
                            <div className="orelement">
                                <div className="hrline"></div>
                                <div className="login-statement4"><b>OR</b></div>
                                <div className="hrline"></div>
                            </div>
                            <div className="login-options">
                                <i className="fa fa-facebook icon2"></i>
                                <i className="fa fa-twitter icon2"></i>
                                <i className="fa fa-google icon2"></i>   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className="registerOuter">
                <div className="register">
                    <form>
                        <img src={logo} alt="logo" className="login-image"/>
                        <div className="login-statement">Please complete to create your account</div>

                        <div className="form-group">
                            <TextField id="username" type="text" label="User Name" value={this.state.username} onChange={this.onChange}	name="username"  autoComplete="off" />
                            <div style={{ fontSize: 10, color: "red", textAlign:'left'}}>
                                {this.state.usernameError}
                            </div>
                        </div>
                
                        <div className="form-group">
                            <TextField id="email" type="text" label="Enter your email" value={this.state.email} onChange={this.onChange}	name="email"  autoComplete="off" />
                            <div style={{ fontSize: 10, color: "red", textAlign:'left' }}>
                                {this.state.emailError}
                            </div>
                        </div>

                        <div className="form-group">
                            <TextField id="password" type="password" label="Password" value={this.state.password} onChange={this.onChange}	name="password"  autoComplete="off" />
                            <div style={{ fontSize: 10, color: "red", textAlign:'left' }}>
                                {this.state.passwordError}
                            </div>
                        </div>

                        <div className="row pt-3 pb-3">
                            <div className="col-sm-12">
                                <input type="submit" value="Register" onClick={this.registerUser} className="login-submit"/>
                            </div>
                        </div>
                    </form>
                    <div className="row pt-2 pb-2">
                        <div className="col-sm-12">
                            <div className="register-element2" >Already have an account  <span className="login-statement3" style={{cursor:'pointer'}} onClick={this.loginForm}>  Login Here</span> </div>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}

export default Login;
