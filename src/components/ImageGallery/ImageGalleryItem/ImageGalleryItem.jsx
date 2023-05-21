import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import { Modal } from './Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    modalStatus: false,
    modalUrl: '',
  };
  scroll = 0;

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const scrollY = window.scrollY;

    this.scroll = scrollY;
  }

  componentDidUpdate() {
    const scrollToY = this.scroll;
    window.scrollTo(0, scrollToY);

  }

  hendelClick = evt => {
    evt.preventDefault();

    this.setState({
      modalStatus: true,
      modalUrl: evt.currentTarget.href,
    });
  };

  closeModal = () => {
    this.setState({ modalStatus: false, modalUrl: '' });
  };

  render() {
    return (
      <>
        {this.state.modalStatus && (
          <Modal url={this.state.modalUrl} closeFunc={this.closeModal} />
        )}
        {this.props.data?.map(obj => (
          <li key={obj.id} className={css.gallery_item}>
            <a
              href={obj.largeImageURL}
              onClick={this.hendelClick}
              className={css.image}
            >
              <img src={obj.webformatURL} alt={obj.id} className={css.image} />
            </a>
          </li>
        ))}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  data: PropTypes.array,
};
