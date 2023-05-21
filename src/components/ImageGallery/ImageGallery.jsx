import { Component } from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem.jsx';
import { Audio } from 'react-loader-spinner';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  key = '36365507-24ff3c73b2908c2f05119dccb';

  state = {
    data: [],
    loading: false,
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (
      prevProps.page !== this.props.page ||
      prevProps.searchWord !== this.props.searchWord
    ) {
      this.setState({ loading: true });

      fetch(
        `https://pixabay.com/api/?q=${this.props.searchWord}&page=${this.props.page}&key=${this.key}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (!response.ok) {
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
        .then(data => {
          const formatedData =
            this.props.page > 1 ? [...this.state.data, ...data] : data;
          this.setState({ data: formatedData });
        })
        .catch(error => {
          console.log(error.message);
        })
        .finally(() => {
          this.setState({
            loading: false,
          });
        });
    }
  };

  render() {
    return (
      <>
        {this.state.loading && (
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
        {!this.state.loading && (
          <ul className={css.gallery}>
            <ImageGalleryItem
              data={this.state.data}
              scroll={this.props.scroll}
            />
          </ul>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchWord: PropTypes.string,
  page: PropTypes.number,
};
