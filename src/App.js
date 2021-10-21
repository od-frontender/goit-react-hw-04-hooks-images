import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import ImageGallery from './components/ImageGallery';
import Searchbar from './components/Searchbar';
import api from './services/api';
import ErrorMessage from './components/ErrorMessage';
import Button from './components/Button';
import Modal from './components/Modal';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [total, setTotal] = useState(null);
  const [largeURL, setLargeURL] = useState('');
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    async function renderImages(searchQuery, page) {
      await api.fetchImage(searchQuery, page).then(({ hits, total }) => {
        if (page === 1) {
          setImages([...hits]);
        } else {
          setImages(prevImgame => [...prevImgame, ...hits]);
        }
        setTotal(total);
        setStatus('resolved');
        if (!total) {
          setError('No results found');
          setStatus('rejected');
        } else {
          setError(null);
        }
      });
    }
    setStatus('pending');
    renderImages(searchQuery, page);
  }, [searchQuery, page]);

  useEffect(() => {
    if (page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  });

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
  };
  const handleIncrement = () => {
    setPage(prevPage => prevPage + 1);
  };
  const toggleModal = url => {
    setShowModal(!showModal);
    setLargeURL(url);
  };

  return (
    <>
      <div className="App">
        <Searchbar onSubmit={handleFormSubmit} />

        {status === 'rejected' && <ErrorMessage message={error} />}

        <ImageGallery images={images} openModal={toggleModal} />

        {status === 'pending' && (
          <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
        )}

        {total > 12 && status === 'resolved' && (
          <Button onClick={handleIncrement} />
        )}

        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeURL} alt="" />
          </Modal>
        )}
      </div>
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
