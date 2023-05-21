import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

export const App = props => {
  const [searchWord, setSearchWord] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [scroll, setScroll] = useState(0);

  const hendelSubmit = newSearchWord => {
    if (newSearchWord.length === 0) {
      alert('to searc foto need a word');
      return;
    }
    if (searchWord === newSearchWord) {
      return;
    }
    setSearchWord(newSearchWord);
    setCurrentPage(1);
  };

  const hendelClick = page => {
    setCurrentPage(page);
    setScroll(window.scrollY);
  };

  return (
    <>
      <Searchbar hendelSubmit={hendelSubmit} />
      <ImageGallery
        searchWord={searchWord.split(' ').join('+')}
        page={currentPage}
        scroll={scroll}
      />
      {currentPage > 0 && (
        <Button hendelClick={hendelClick} currentPage={currentPage} />
      )}
    </>
  );
};
