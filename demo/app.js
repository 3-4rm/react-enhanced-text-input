import React from 'react';
import { render } from "react-dom";
import EnhancedTextInput from "./react-enhanced-text-input";
import Highlight from "react-highlight";
import 'bootstrap/scss/bootstrap.scss';
import './styles/app.scss';
import './styles/plates.scss';
import './styles/inputs.scss';
import "./styles/react-enhanced-text-input.scss";
import "./styles/default.scss";


class Root extends React.Component{
  constructor(props){
    super(props);
    this.state={
      placeholderText: '["Type", "something", "here"]',
      labelText: '["Your", "input", "is:"]',
      placeholder: ['Type', 'something', 'here'],
      label: ['Your', 'input', 'is:'],
      multiline: false,
      heightAutoGrow: false,
      activateOnFocus: false,
      value: "",
      style: "style-1"
    };

    this.setInputPropValue = this.setInputPropValue.bind(this);
    this.getRadioClassName = this.getRadioClassName.bind(this);
    this.onPlaceholderTextChange = this.onPlaceholderTextChange.bind(this);
    this.onLabelTextChange = this.onLabelTextChange.bind(this);
    this.onEnhancedInputChange = this.onEnhancedInputChange.bind(this);
  };

  sampleMethod (e){
    this.setState({prop: 'something'});
  };

  getRadioClassName(name, val){
    if(this.state[name] === val){
      return "checked"
    };
    return ""
  };

  setInputPropValue(name, val){
    let nextState = {};
    nextState[name] = val;
    this.setState(nextState);
  };

  onPlaceholderTextChange(e){
    this.setState({placeholderText: e.target.value})
    let nextPlaceholder;
    try{
      nextPlaceholder = JSON.parse(e.target.value)
    }catch(err){
      return;
    }
    if(Array.isArray(nextPlaceholder)){
      this.setState({placeholder: nextPlaceholder});
    }
  }

  onLabelTextChange(e){
    this.setState({labelText: e.target.value})
    let nextLabel;
    try{
      nextLabel = JSON.parse(e.target.value)
    }catch(err){
      return;
    }
    if(Array.isArray(nextLabel)){
      this.setState({label: nextLabel});
    }
  };

  onEnhancedInputChange(e){
    this.setState({value: e.target.value});

  }

  render(){
    return(
      <div>

        <div className="plate-0">
        <h3>A Demo Page for react-enhanced-text-input</h3>
        <div>
          This demo is interactive, please use inputs below.
        </div>
        </div>
        <div className="plate-1">
          <EnhancedTextInput  activateOnFocus={this.state.activateOnFocus}
                              autoFocus={true}
                              multiline={this.state.multiline}
                              heightAutoGrow={this.state.heightAutoGrow}
                              className={this.state.style}
                              placeholder={this.state.placeholder}
                              onChange={this.onEnhancedInputChange}
                              value={this.state.value}
                              label={this.state.label} />
        </div>


        <div className="plate-5">
          <h4>Choose the style:</h4>
          <div>
            <span className={"radio-1 " + this.getRadioClassName("style", "style-1")} onClick={this.setInputPropValue.bind(null, "style", "style-1")}>
              <span className="input-icon"></span>
              <span>Style 1</span>
            </span>
            <span className={"radio-1 " + this.getRadioClassName("style", "style-2")} onClick={this.setInputPropValue.bind(null, "style", "style-2")}>
              <span className="input-icon"></span>
              <span>Style 2</span>
            </span>
          </div>
        </div>


        <div className="plate-2">
          <h4>Modify props:</h4>
          <table className="props-table-interactive">
          <tbody>
            <tr>
              <td>placeholder: </td>
              <td><input onChange={this.onPlaceholderTextChange} type="text" value={this.state.placeholderText} /></td>
            </tr>
            <tr>
              <td>label:</td>
              <td><input onChange={this.onLabelTextChange} type="text" value={this.state.labelText} /></td>
            </tr>
            <tr>
              <td>activateOnFocus: </td>
              <td>
              <span className={"radio-1 " + this.getRadioClassName("activateOnFocus", true)} onClick={this.setInputPropValue.bind(null, "activateOnFocus", true)}>
                <span className="input-icon"></span>
                <span>true</span>
              </span>
              <span className={"radio-1 " + this.getRadioClassName("activateOnFocus", false)} onClick={this.setInputPropValue.bind(null, "activateOnFocus", false)}>
                <span className="input-icon"></span>
                <span>false (default)</span>
              </span>
              </td>
            </tr>
            <tr>
              <td>multiline: </td>
              <td>
                <span className={"radio-1 " + this.getRadioClassName("multiline", true)} onClick={this.setInputPropValue.bind(null, "multiline", true)}>
                  <span className="input-icon"></span>
                  <span>true</span>
                </span>
                <span className={"radio-1 " + this.getRadioClassName("multiline", false)} onClick={this.setInputPropValue.bind(null, "multiline", false)}>
                  <span className="input-icon"></span>
                  <span>false (default)</span>
                </span>
              </td>
            </tr>
            <tr>
              <td>heightAutoGrow: </td>
              <td>
                <span className={"radio-1 " + this.getRadioClassName("heightAutoGrow", true)} onClick={this.setInputPropValue.bind(null, "heightAutoGrow", true)}>
                  <span className="input-icon"></span>
                  <span>true</span>
                </span>
                <span className={"radio-1 " + this.getRadioClassName("heightAutoGrow", false)} onClick={this.setInputPropValue.bind(null, "heightAutoGrow", false)}>
                  <span className="input-icon"></span>
                  <span>false (default)</span>
                </span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>



        <div className="plate-3">
          <div className="plate-4">
            <h4>Usage:</h4>
            <div>
              ...npm is on the way...
            </div>
            <div>
              From dist folder, copy react-enhanced-text-input.js  to your project.<br/>
              Create stylesheet as in react-enhanced-text-input.scss or use as sample.<br/>
              To run demo locally, see <a href="https://github.com/3-4rm/react-enhanced-text-input">readme</a><br/>
              The entire list of props see below example.
            </div>
          </div>
<Highlight>{`
//some JavaScript code sample...
import EnhancedTextInput from './react-enhanced-text-input'

//  ...

// Somewhere in render method:
//...
  <EnhancedTextInput  value=""
                      className="myTextInput"
                      multiline={true}
                      heightAutoGrow={true}
                      placeholder={['Type', 'something', 'here']}
                      label="Your input is:"
                      onChange={()=>{/*...*/}}
                      activateOnFocus={true} />
//...
`}</Highlight>
        </div>
        <div className="plate-6">
          <h4>List of props:</h4>
          <table className="props-table">
            <tbody>
              <tr>
                <td>autofocus </td>
                <td>Some description goes here</td>
              </tr>
              <tr>
                <td>placeholder </td>
                <td>Some description goes here</td>
              </tr>
              <tr>
                <td>value: </td>
                <td>Some description goes here</td>
              </tr>
              <tr>
                <td>placeholder: </td>
                <td>Some description goes here</td>
              </tr>
              <tr>
                <td>label: </td>
                <td>Some description goes here</td>
              </tr>
              <tr>
                <td>multiline: </td>
                <td>Some description goes here</td>
              </tr>
              <tr>
                <td>heightAutoGrow: </td>
                <td>Some description goes here</td>
              </tr>
              <tr>
                <td>activateOnFocus: </td>
                <td>Some description goes here</td>
              </tr>
              <tr>
                <td>onChange: </td>
                <td>Some description goes here</td>
              </tr>
              <tr>
                <td>type: </td>
                <td>Some description goes here</td>
              </tr>
              <tr>
                <td>maxLength: </td>
                <td>Some description goes here</td>
              </tr>
              <tr>
                <td>onBlur: </td>
                <td>Some description goes here</td>
              </tr>
              <tr>
                <td>onFocus: </td>
                <td>Some description goes here</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

render(<Root/>, document.getElementById("appcontainer"));
