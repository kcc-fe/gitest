const store = {
  /**
   * 로컬 스토리지에 존재하는 데이터를 가져오는 getLocalStorage() 함수
   * @returns {string} posts - 게시판 데이터
   */
  getLocalStorage: () => {
    return JSON.parse(localStorage.getItem('data'));
  },

  /**
   * 로컬 스토리지에 데이터를 저장하는 setLocalStorage() 함수
   * @param {Object} data - 게시판 데이터
   */
  setLocalStorage: (data) => {
    localStorage.setItem('data', JSON.stringify(data));
  },
};

export default store;
