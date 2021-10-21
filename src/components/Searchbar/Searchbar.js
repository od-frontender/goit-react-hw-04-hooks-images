import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';
import { toast } from 'react-toastify';

function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (imageName.trim() === '') {
      toast.error('Please, enter picture name');
      return;
    }
    onSubmit(imageName);
    setImageName('');
  };

  const handleNameChange = event => {
    setImageName(event.currentTarget.value.toLowerCase());
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchForm_button}>
          <span className={s.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={s.SearchForm_input}
          type="text"
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
          onChange={handleNameChange}
          value={imageName}
        />
      </form>
    </header>
  );
}
export default Searchbar;
