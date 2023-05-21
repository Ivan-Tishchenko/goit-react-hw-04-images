import React, { useEffect, useState } from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import { Modal } from './Modal/Modal';

export const ImageGalleryItem = props => {
  const [modalStatus, setModalStatus] = useState(false);
  const [modalUrl, setModalUrl] = useState('');

  useEffect(() => {
    window.scrollTo(0, props.scroll);
  }, [props.scroll]);

  const hendelClick = evt => {
    evt.preventDefault();

    setModalStatus(true);
    setModalUrl(evt.currentTarget.href);
  };

  const closeModal = () => {
    setModalStatus(false);
    setModalUrl('');
  };

  return (
    <>
      {modalStatus && <Modal url={modalUrl} closeFunc={closeModal} />}
      {props.data?.map(obj => (
        <li key={obj.id} className={css.gallery_item}>
          <a
            href={obj.largeImageURL}
            onClick={hendelClick}
            className={css.image}
          >
            <img src={obj.webformatURL} alt={obj.id} className={css.image} />
          </a>
        </li>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  data: PropTypes.array,
};
