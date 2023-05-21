import React, { useRef, useState, useEffect } from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem.jsx';
import { Audio } from 'react-loader-spinner';
import PropTypes from 'prop-types';

export const ImageGallery = props => {
  const key = useRef('36365507-24ff3c73b2908c2f05119dccb');
  const prevProps = useRef({});

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAPI();
    prevProps.current = { page: props.page, searchWord: props.searchWord };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.page, props.searchWord]);

  const fetchAPI = async () => {
    if (
      prevProps.current.page !== props.page ||
      prevProps.current.searchWord !== props.searchWord
    ) {
      setLoading(true);

      await fetch(
        `https://pixabay.com/api/?q=${props.searchWord}&page=${props.page}&key=${key.current}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (!response.ok) {
            console.log(response);
            throw new Error(response.status);
          }
          return response.json();
        })
        .then(data => {
          return data.hits.map(obj => ({
            id: obj.id,
            webformatURL: obj.webformatURL,
            largeImageURL: obj.largeImageURL,
          }));
        })
        .then(newData => {
          const formatedData = props.page > 1 ? [...data, ...newData] : newData;
          setData(formatedData);
        })
        .catch(error => {
          console.log(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
      console.log('asdasd');
    }
    console.log('dsadsa');
  };

  return (
    <>
      {loading && (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Audio
            height="280"
            width="280"
            radius="29"
            color="green"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      )}
      {!loading && (
        <ul className={css.gallery}>
          <ImageGalleryItem data={data} scroll={props.scroll} />
        </ul>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  searchWord: PropTypes.string,
  page: PropTypes.number,
};
