import React, { Component } from 'react';
import ReactDom from 'react-dom';
import zxcvbn from 'zxcvbn';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
     this.state = {
       score: '',
    resultStrength: '',
    val: '' 
   }
   this.handleEvent = this.handleEvent.bind(this);
  }
  handleEvent(e) {

    let strength = {
  0: "Worst",
  1: "Bad",
  2: "Weak",
  3: "Good",
  4: "Strong"
}
    const password = ReactDom.findDOMNode(this.refs.password);
    const meter = ReactDom.findDOMNode(this.refs.passwordStrengthMeter);

    let val = password.value;
    let res=zxcvbn(val);
    //let score = 0;
    console.log("zxcvbn object: ",res);
    let score = res.score;
    console.log("scoreeee: ",score);
     if(val!==""){
    this.setState({
     resultStrength: strength[res.score],
     score,
     val
    });
  }
  else{
      this.setState({resultStrength : ''});
  }
  }


  render() {
    const {resultStrength, score,val } = this.state;
    console.log("length",val.length);
    console.log("resultStrength",resultStrength);
    console.log("score",score);
    const styleClasses= val.length > 0 ? `is-strength-${score}` : '';
    
    return (
      <div className="App">
        <input type="password" onChange={this.handleEvent} name="password" id="password" ref="password"/>
        
        {/* <meter max="5" refs="passwordStrengthMeter" id="password-strength-meter"></meter> */}
        <p>
          {resultStrength && "strength: "}
        <strong className={styleClasses}>{resultStrength}</strong>
        </p>
      </div>
    );
  }
}

export default App;