import React from 'react'

class FloatingPlaceholder extends React.Component{
  constructor(props) {
    super(props);
    this.state = this.createStateFromProps(props);
    this.createPlaceholderContent = this.createPlaceholderContent.bind(this);
  };

  createStateFromProps(props){
    return {
      display: (props.position==='label' ? props.label || props.placeholder : props.placeholder || props.label),
      displayExtra: (props.position === 'label' ? props.labelExtra || props.placeholderExtra: props.placeholderExtra || props.labelExtra),
      className: (props.position === 'label' ? 'fph fph-label' : 'fph')
    };
  };

  componentWillReceiveProps(props){
    this.setState(this.createStateFromProps(props));
  };

  forceUpOnce(){
    this.setState({className: 'fph-label'});
  }

  createPlaceholderContent(){
    const src = this.props.position === "label" ? this.props.label : this.props.placeholder;
    if(Array.isArray(src)){
      return src.map((item, index)=>(<span key={index}>{item}</span>))
    }else{
      return (<span>src</span>)
    }
  }

  render(){
    let floatingPlaceholder = (
        <div className={this.state.className} onClick={this.props.onClick}>
          {this.createPlaceholderContent()}
        </div>
        )
    return(
      floatingPlaceholder
    );
  };
};


class EnhancedTextInput extends React.Component{
  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      placeholderPos: "placeholder",
      value: props.value,
      placeholder: props.placeholder,
      label: props.label,
      placeholderExtra: props.placeholderExtra,
      labelExtra: props.labelExtra,
      status: props.status
    };

    this.createField = this.createField.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handlePlaceholderClick = this.handlePlaceholderClick.bind(this);
    this.adjustTextAreaHeight = this.adjustTextAreaHeight.bind(this);
    this.focus = this.focus.bind(this);
    this.getFloatingPlaceholderPosition = this.getFloatingPlaceholderPosition.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  };

  componentWillReceiveProps(props){
    if(props.value !== '') {
      this.setState({
        placeholderPos: props.value ? "label" : "placeholder",
        placeholder: props.placeholder,
        label: props.label,
        placeholderExtra: props.placeholderExtra,
        labelExtra: props.labelExtra,
        status: props.status,
        value: props.value
      });
    } else {
      this.setState({
        placeholderPos: props.value ? "label" : "placeholder",
        placeholder: props.placeholder,
        label: props.label,
        placeholderExtra: props.placeholderExtra,
        labelExtra: props.labelExtra,
        status: props.status,
        value: props.value
      });
    }

  }


  onChange(e){

    let maxLength = this.props.maxLength ? this.props.maxLength : 0;
    if(this.props.maxLength && e.target.value.length > maxLength){
      return;
    }

    var placeholderPos = e.target.value ? "label" : "placeholder";

    this.setState({
      value: e.target.value,
      placeholderPos: placeholderPos,
      status: ""
    })
    if(this.props.onChange){
      this.props.onChange(e);
    }
  };


  handlePlaceholderClick(){
    if (this.refs.field) this.refs.field.focus()
  };


  handleStatusClick(){
    if (this.refs.field) this.refs.field.focus()
  };


  handleInputBlur(){
    if(this.props.onBlur) {
      this.props.onBlur(this.state.value);
    }
  }

  adjustTextAreaHeight() {
    if(this.refs.field && this.props.multiline && this.props.heightAutoGrow){
      var textArea = this.refs.field;
      textArea.style.height = "1.5em";
      textArea.style.height = (textArea.scrollHeight + 4) + "px";
    }
  }

  componentDidUpdate(){
    if(this.props.multiline && this.props.heightAutoGrow){
      this.adjustTextAreaHeight();
    }
  };

  focus(){
    this.refs.field.focus();
  }

  componentDidMount(){
    if(this.props.multiline && this.props.heightAutoGrow){
      this.adjustTextAreaHeight();
    }
  };

  getFloatingPlaceholderPosition(){
   let output = (this.state.value || this.state.placeholderPos === "label" ? "label" : "placeholder");
   if(this.props.activateOnFocus && this.state.isFocused){
     output = "label"
   }
   return output;
  }

  onFocus(){
    this.setState({isFocused: true})
    if(this.props.onFocus){
      this.props.onFocus()
    }
  }

  onBlur(){
    this.setState({isFocused: false});
    if(this.props.onBlur){
      onBlurHandler();
    }
  }


  forceUpOnce(){
    if(this.refs.fph){
      this.refs.fph.forceUpOnce();
    }
  };


  createField(){

    const inputType = this.props.type || 'text';

    if(this.props.multiline){
      return (<textarea
              onKeyUp={this.adjustTextAreaHeight()}
              className="input"
              onChange={this.onChange}
              type={inputType}
              autoFocus={this.props.autoFocus}
              tabIndex={this.props.tabindex}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              value={this.state.value}
              autoComplete={this.props.autoComplete}
              ref="field"
              style={{resize: "none", height: "36px", overflow: 'auto'}}/>);
    }else{
      return (<input
                className="input"
                onChange={this.onChange}
                type={inputType}
                autoFocus={this.props.autoFocus}
                tabIndex={this.props.tabindex}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
                value={this.state.value}
                autoComplete={this.props.autoComplete}
                ref="field"
                style={{resize: "none", height: "36px"}}/>);
    }
  }

  render(){

    return(
      <div className={this.props.className}>
        <FloatingPlaceholder
          ref='fph'
          position={ this.getFloatingPlaceholderPosition() }
          placeholder={this.state.placeholder}
          label={this.state.label}
          onClick={this.handlePlaceholderClick} />

          {this.createField()}

      </div>
    );
  };
};

EnhancedTextInput.defaultProps = {
  value: "",
  placeholder:"",
  label:""
}

EnhancedTextInput.propTypes = {
  placeholderPos: React.PropTypes.oneOf(['label', 'placeholder']),
  type: React.PropTypes.oneOf(['text', 'password', 'email']),
  label: React.PropTypes.oneOfType([React.PropTypes.arrayOf(React.PropTypes.string), React.PropTypes.string]),
  placeholder: React.PropTypes.oneOfType([React.PropTypes.arrayOf(React.PropTypes.string), React.PropTypes.string]),
  onChange: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  value: React.PropTypes.string,
  maxLength: React.PropTypes.number
};

export default EnhancedTextInput;
