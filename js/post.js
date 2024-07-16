import { savePost } from '../api/post.js';

export default function Post() {
  this.posts = [];

  this.init = () => {
    this.initData();
    this.initEventListeners();
  };

  this.addPost = (e) => {
    e.preventDefault();

    const titleEl = document.querySelector('#input-title');
    const usernameEl = document.querySelector('#input-username');
    const contentEl = document.querySelector('#input-content');

    const data = {
      title: titleEl.value,
      username: usernameEl.value,
      content: contentEl.value,
    };

    // 폼 유효성 검사
    if (!this.isPostFormValidate(data)) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    document
      .querySelector('#post-list')
      .insertAdjacentHTML('afterbegin', this.postItemTemplate(data));

    // 로컬 스토리지 저장
    savePost(data);

    // 빈 값으로 초기화
    titleEl.value = '';
    usernameEl.value = '';
    contentEl.value = '';
  };

  // 게시판 상태 초기화
  this.initData = () => {
    // store불러오기
  };

  // 게시판 이벤트 초기화
  this.initEventListeners = () => {
    document.querySelector('#add-btn').addEventListener('click', this.addPost);
  };

  // 유효성 판별
  this.isPostFormValidate = ({ title, username, content }) => {
    if (
      title.trim() === '' ||
      username.trim() === '' ||
      content.trim() === ''
    ) {
      return false;
    }
    return true;
  };

  // 게시글 항목 생성
  this.postItemTemplate = ({ title, username, content }) => {
    return `<li
  class="list-group-item d-flex justify-content-between align-items-start"
  >
  <div class="w-10 fw-bold">${title}</div>
  <div style="width: 50%">${content}</div>
  <div>${username}</div>
  </li>`;
  };
}
