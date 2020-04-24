import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  state = {
    text: '',
  };

  onChange = (e) => {
    // this.setState({ text: e.target.value });
    // Funciona corretamente, mas e se tivermos 200 inputs? Usaremos 200 funções?

    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.text === '') {
      this.props.setAlert('Please enter something', 'light');
    } else {
      this.props.searchUser(this.state.text);
      this.setState({ text: '' });
    }
  };

  render() {
    const { text } = this.state;
    const { clearUsers, showClear } = this.props;

    return (
      <div>
        <form onSubmit={this.onSubmit} className='form'>
          <input
            type='text'
            name='text'
            placeholder='Search Users...'
            value={text}
            onChange={this.onChange}
            // onChange={this.onChange.bind(this)} caso a funcão n seja do tipo arrow
            // onChange={(e) => this.onChange(e)}
          />
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          />
        </form>
        {showClear && (
          <button className='btn btn-light btn-block' onClick={clearUsers}>
            Clear
          </button>
        )}
      </div>
    );
  }
}

Search.propTypes = {
  searchUser: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
};

export default Search;
