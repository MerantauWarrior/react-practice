import React, { Component } from 'react';
import styles from './NewPost.module.css';
import Spinner from '../../../components/UI/Spinner/loader';

import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

import {checkValidity, updateObject} from '../../../shared/utils';
import Input from '../../../components/UI/Input/Input';

class NewPost extends Component {
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

  componentWillUnmount(){
    this.props.onSlapStatusNew();
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
  };

  submitHandler = ( event ) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.controls) {
      formData[formElementIdentifier] = this.state.controls[formElementIdentifier].value;
    }
    if(this.state.formIsValid){
      this.props.onNewPosts(formData);
    }
  };

  render() {
    let addRedirection = null;
    if(this.props.statusCode === 200){
      addRedirection = <Redirect to='/posts'/>
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
      <div className={styles.NewPost}>
        {addRedirection}
        <h1>Create New Post</h1>
        {this.props.loading ? <Spinner/> : null}
        <form onSubmit={this.submitHandler} className={styles.Form}>
          {form}
          <button className={styles.Add} type="submit" disabled={!this.state.formIsValid}>create post</button>
        </form>
      </div>
    );
  }
}

const mapStateToPrors = state => {
  return{
    statusCode: state.newPost.addStatus,
    loading: state.newPost.loading,
    error: state.newPost.error
  }
};
const mapDispatchToProps = dispatch => {
  return{
    onSlapStatusNew: () => dispatch(actions.slapStatusNew()),
    onNewPosts: (postData) => dispatch(actions.newPosts(postData))
  }
};

export default connect(mapStateToPrors, mapDispatchToProps)(NewPost);