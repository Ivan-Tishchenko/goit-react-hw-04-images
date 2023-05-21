import React, { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    searchWord: '',
  };

  hendelInput = ({ target: { value } }) => {
    this.setState({ searchWord: value });
  };

  hendelSubmit = evt => {
    evt.preventDefault();

    this.props.hendelSubmit(this.state.searchWord.trim());

    evt.currentTarget.reset();
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.hendelSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.button_label}>Search</span>
          </button>

          <input
            className={css.input}
            onInput={this.hendelInput}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  handleSubmit: PropTypes.func,
};
