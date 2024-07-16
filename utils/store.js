const store = {
  getLocalStorage: () => {
    return JSON.parse(localStorage.getItem('posts'));
  },
  setLocalStorage: (post) => {
    localStorage.setItem('posts', JSON.stringify(post));
  },
};

export default store;
