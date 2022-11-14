import React, { Component } from 'react';
import { fetchImages } from 'helpers/pixabeyApi';
import SearchBar from './SearcBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from './LoadMore/LoadMore';
import { Loader } from './Loader/Loader';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    pixabeyImgs: [],
    query: '',
    page: 1,
    totalHits: 0,
    isLoading: false,
  };

  formSubmitHandler = query => {
    this.setState({ query, page: 1 });
  };
  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate(_, prevState) {
    const { pixabeyImgs, query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });
      fetchImages(query, page)
        .then(data => {
          this.setState(prev => ({
            pixabeyImgs:
              page === 1 ? data.hits : [...prev.pixabeyImgs, ...data.hits],

            totalHits:
              page === 1
                ? data.totalHits - data.hits.length
                : data.totalHits - [...prev.pixabeyImgs, ...data.hits].length,
          }));

          if (data.totalHits === 0) {
            this.notify();
            return;
          }
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
    if (pixabeyImgs === prevState.pixabeyImgs) {
      return;
    }

    // localStorage.setItem(IMAGE_KEY, JSON.stringify(pixabeyImgs));
  }
  notify = () => {
    toast.info('There are no results for your search', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  render() {
    const { pixabeyImgs } = this.state;

    return (
      <>
        <SearchBar onSubmit={this.formSubmitHandler} />
        <ImageGallery items={pixabeyImgs} />
        {!!this.state.totalHits &&
          (!this.state.isLoading ? (
            <LoadMore onLoadMore={this.handleLoadMore} />
          ) : (
            <Loader />
          ))}
        <ToastContainer />
      </>
    );
  }
}

export default App;
