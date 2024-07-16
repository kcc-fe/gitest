import store from '../utils/store.js';

// 서버와의 통신 대체
export const savePost = (data) => {
  store.setLocalStorage(data);
};

export const getPostList = () => {
  return store.getLocalStorage();
};
