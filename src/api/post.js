import store from '../utils/store.js';

/**
 * 서버에 데이터 저장을 요청하는 savePost() 함수
 * @param {Object} data - 추가할 게시판 데이터
 */
export const savePost = (data) => {
  store.setLocalStorage(data);
};

/**
 * 서버로부터 데이터를 가져오는 getPostList() 함수
 * @returns {Object} data - 게시판 데이터
 */
export const getPostList = () => {
  return store.getLocalStorage();
};
