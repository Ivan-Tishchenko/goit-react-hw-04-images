import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    searchWord: '',
    currentPage: 0,
    scroll: 0,
  };

  hendelSubmit = searchWord => {
    if (searchWord.length === 0) {
      alert('to searc foto need a word');
      return;
    }
    if (this.state.searchWord === searchWord) {
      return;
    }
    this.setState({
      searchWord,
      currentPage: 1,
    });
  };

  hendelClick = page => {
    this.setState({ currentPage: page });
  };

  render() {
    return (
      <>
        <Searchbar hendelSubmit={this.hendelSubmit} />
        <ImageGallery
          searchWord={this.state.searchWord.split(' ').join('+')}
          page={this.state.currentPage}
          scroll={this.state.scroll}
        />
        {this.state.currentPage > 0 && (
          <Button
            hendelClick={this.hendelClick}
            currentPage={this.state.currentPage}
          />
        )}
      </>
    );
  }
}
