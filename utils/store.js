const store = {
  getLocalStorage: () => {
    return JSON.parse(localStorage.getItem('data'));
  },
  setLocalStorage: (data) => {
    localStorage.setItem('data', JSON.stringify(data));
  },
};

export default store;
