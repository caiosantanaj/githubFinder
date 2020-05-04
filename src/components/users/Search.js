import React, { useState, useContext } from 'react';

import AlertContext from '../../context/alert/alertContext';
import GithubContext from '../../context/github/githubContext';

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const { clearUsers, searchUser, users } = githubContext;
  const { setAlert } = alertContext;

  const [text, setText] = useState('');

  const onChange = (e) => {
    // this.setState({ text: e.target.value });
    // Funciona corretamente, mas e se tivermos 200 inputs? Usaremos 200 funções?

    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (text === '') {
      setAlert('Please enter something', 'light');
    } else {
      searchUser(text);
      setText('');
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={text}
          onChange={onChange}
          // onChange={this.onChange.bind(this)} caso a funcão n seja do tipo arrow
          // onChange={(e) => this.onChange(e)}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {users.length > 0 && (
        <button className='btn btn-light btn-block' onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
