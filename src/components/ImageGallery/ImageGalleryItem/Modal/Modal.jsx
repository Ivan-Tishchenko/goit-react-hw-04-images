import css from './Modal.module.css';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = props => {
  const handleKeyDown = event => {
    if (event.keyCode === 27) {
      props.closeFunc();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={css.overlay} onClick={props.closeFunc}>
      <img className={css.modal} src={props.url} alt="modalpicture" />
    </div>
  );
};

Modal.propTypes = {
  url: PropTypes.string,
  closeFunc: PropTypes.func,
};
