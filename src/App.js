import React from "react";

const API = "23033623-b70795456acd26c564a94f9ff";
const URL = "https://pixabay.com/api";

class App extends React.Component {
  state = {
    images: null,
  };
  componentDidMount() {
    fetch(
      `${URL}/?q=nature&page=1&key=${API}&image_type=photo&orientation=horizontal&per_page=3`
    )
      .then((res) => res.json())
      .then((images) => this.setState({ images: images.hits }));
  }

  render() {
    const { images } = this.state;
    return (
      <div>
        {this.state.images && (
          <ul>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => {
              return (
                <li>
                  <img
                    width="200"
                    height="200"
                    src={webformatURL}
                    alt={tags}
                    data-large={largeImageURL}
                    id={id}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default App;
