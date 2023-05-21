import React, { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = props => {
  const [searchWord, setSearchWord] = useState('');

  const hendelInput = ({ target: { value } }) => {
    setSearchWord(value);
  };

  const hendelSubmit = evt => {
    evt.preventDefault();

    props.hendelSubmit(searchWord.trim());

    evt.currentTarget.reset();
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={hendelSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.button_label}>Search</span>
        </button>
        <input
          className={css.input}
          onInput={hendelInput}
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  handleSubmit: PropTypes.func,
};
