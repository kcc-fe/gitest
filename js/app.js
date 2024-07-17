import Post from '../js/post.js';

function App() {
  this.init = () => {
    const post = new Post();
    post.init();
  };
}

const app = new App();
app.init();
