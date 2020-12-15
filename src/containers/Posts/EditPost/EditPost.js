import React, { Component } from 'react';
import styles from './EditPost.module.css';
import Spinner from '../../../components/UI/Spinner/loader';

import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

import {checkValidity, updateObject} from '../../../shared/utils';
import Input from '../../../components/UI/Input/Input';

class EditPost extends Component {
  state = {
    controls: {
      author: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Enter Your name'
        },
        value: '',
        label: 'Your Name',
        validation: {
          required: true,
          minLength: 2
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        label: 'E-mail',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      title: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'title of the story'
        },
        value: '',
        label: 'Your Title',
        validation: {
          required: true,
          minLength: 10
        },
        valid: false,
        touched: false
      },
      text: {
        elementType: 'textarea',
        elementConfig: {
          type: 'text',
          placeholder: 'type your story..'
        },
        value: '',
        label: 'Your Text',
        validation: {
          required: true,
          minLength: 10
        },
        valid: false,
        touched: false
      },
      category: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'cat-1', displayValue: 'Cat-1'},
            {value: 'cat-2', displayValue: 'Cat-2'}
          ]
        },
        value: 'cat-1',
        label: 'Choose category',
        validation: {},
        valid: true
      }
    },
    formIsValid: false
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(this.state.controls[inputIdentifier],{
      value: event.target.value,
      valid: checkValidity(event.target.value, this.state.controls[inputIdentifier].validation),
      touched: true
    });
    const updatedOrderForm = updateObject(this.state.controls, {
      [inputIdentifier]: updatedFormElement
    });
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({controls: updatedOrderForm, formIsValid: formIsValid});
    console.log(this.state.controls);
    console.log(this.state.formIsValid);
    console.log(event.target.value);
  };

  submitHandler = ( event ) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.controls) {
      formData[formElementIdentifier] = this.state.controls[formElementIdentifier].value;
    }
    if(this.state.formIsValid){
      this.props.onEditPosts(this.props.match.params.id, formData);
    }
  };

  goBackHandler = () => {
    this.props.history.goBack();
  };

  componentDidMount(){
    this.setState((state, props) => ({
      ...state,
      controls: {
        ...state.controls,
        author: {
          ...state.controls.author,
          value: props.fullPost.author,
          valid: true
        },
        email: {
          ...state.controls.email,
          value: props.fullPost.email,
          valid: true
        },
        title: {
          ...state.controls.title,
          value: props.fullPost.title,
          valid: true
        },
        text: {
          ...state.controls.text,
          value: props.fullPost.text,
          valid: true
        },
        category: {
          ...state.controls.category,
          value: props.fullPost.category,
          valid: true
        }
      },
      formIsValid: true
    }));
  };

  componentWillUnmount(){
    this.props.onSlapEdit();
  };

  render() {
    let editRedirection = null;
    if(this.props.statusCode === 200){
      editRedirection = <Redirect to={'/posts/'+this.props.match.params.id}/>
    }
    const formElementsArray = [];
    for ( let key in this.state.controls ) {
      formElementsArray.push( {
        id: key,
        config: this.state.controls[key]
      } );
    }
    let form = formElementsArray.map( formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        label={formElement.config.label}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        blured={( event ) => this.inputChangedHandler( event, formElement.id )}
        changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
    ) );
    return (
      <div className={styles.EditPost}>
        {editRedirection}
        <button className={styles.BtnGoBack} onClick={this.goBackHandler}>go back</button>
        <h1>Edit Post</h1>
        {this.props.loading ? <Spinner/> : null}
        <form onSubmit={this.submitHandler} className={styles.Form}>
          {form}
          <button className={styles.Edit} type="submit" disabled={!this.state.formIsValid}>edit post</button>
        </form>
      </div>
    );
  }
}

const mapStateToPrors = state => {
  return{
    fullPost: state.fullPost.fullPost,
    statusCode: state.editPost.editStatus,
    loading: state.editPost.loading,
    error: state.editPost.error
  }
};
const mapDispatchToProps = dispatch => {
  return{
    onSlapEdit: () => dispatch(actions.slapStatusEdit()),
    onEditPosts: (id, postData) => dispatch(actions.editPost(id, postData))
  }
};

export default connect(mapStateToPrors, mapDispatchToProps)(EditPost);