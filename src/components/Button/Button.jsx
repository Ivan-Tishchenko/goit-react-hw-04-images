import React from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = props => {
  return (
    <button
      className={css.button}
      onClick={() => props.hendelClick(props.currentPage + 1)}
    >
      Load more
    </button>
  );
};

Button.propTypes = {
  currentPage: PropTypes.number,
  hendelClick: PropTypes.func,
};
