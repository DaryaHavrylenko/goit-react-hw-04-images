import React, { useState, useEffect } from 'react';
import { fetchImages } from 'helpers/pixabeyApi';
import SearchBar from './SearcBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from './LoadMore/LoadMore';
import { Loader } from './Loader/Loader';
import { ToastContainer } from 'react-toastify';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Idle, Rejected, ResolvedNoData } from './Notification/Notification';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState('1');
  const [pixabeyImgs, setpixabeyImgs] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  // const [tags, setTags] = useState(null);
  // const [largeImageURL, setLargeImageURL] = useState(null);
  const [totalHits, setTotalHits] = useState(0);

  const formSubmitHandler = query => {
    setQuery(query);
    setPage(1);
    setStatus('pending');
  };
  const handleLoadMore = () => {
    setPage(prevState => prevState.page + 1);
  };

  useEffect(() => {
    if (query) {
      async function fetchData() {
        try {
          const pixabeyImgs = await fetchImages(query, page);
          if (pixabeyImgs) {
            setpixabeyImgs(prevState =>
              page === 1
                ? pixabeyImgs.hits
                : [...prevState, ...pixabeyImgs.hits]
            );
            setTotalHits(
              page === 1
                ? pixabeyImgs.totalHits - pixabeyImgs.hits.length
                : pixabeyImgs.totalHits -
                    [...pixabeyImgs, ...pixabeyImgs.hits].length
            );
            setStatus('resolved');
          }
        } catch (error) {
          setError(error);
          setStatus('rejected');
        } finally {
          setStatus('resolved');
        }
      }
      fetchData();
    }
  }, [page, query]);

  // componentDidUpdate(_, prevState) {
  //   const { pixabeyImgs, query, page } = this.state;

  //   if (prevState.query !== query || prevState.page !== page) {
  //     this.setState({ isLoading: true });
  //     fetchImages(query, page)
  //       .then(data => {
  //         this.setState(prev => ({
  //           pixabeyImgs:
  //             page === 1 ? data.hits : [...prev.pixabeyImgs, ...data.hits],

  //           totalHits:
  //             page === 1
  //               ? data.totalHits - data.hits.length
  //               : data.totalHits - [...prev.pixabeyImgs, ...data.hits].length,
  //         }));

  //         if (data.totalHits === 0) {
  //           this.notify();
  //           return;
  //         }
  //       })
  //       .finally(() => {
  //         this.setState({ isLoading: false });
  //       });
  //   }
  //   if (pixabeyImgs === prevState.pixabeyImgs) {
  //     return;
  //   }

  // // localStorage.setItem(IMAGE_KEY, JSON.stringify(pixabeyImgs));
  // }
  // const notify = () => {
  //   toast.info('There are no results for your search', {
  //     position: toast.POSITION.TOP_RIGHT,
  //   });
  // };

  return (
    <>
      <SearchBar onSubmit={formSubmitHandler} />
      {status === 'idle' && <Idle />}
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <Rejected error={error} />}
      {status === 'resolved' && pixabeyImgs.length === 0 && (
        <ResolvedNoData query={query} />
      )}
      {status === 'resolved' && pixabeyImgs.length > 0 && (
        <>
          <ImageGallery items={pixabeyImgs} />
        </>
      )}
      {!!totalHits && <LoadMore onLoadMore={handleLoadMore} />}
      <ToastContainer />
    </>
  );
}
