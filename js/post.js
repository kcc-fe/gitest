import { savePost, getPostList } from '../api/post.js';

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

    // 상태값 저장
    this.posts.unshift(data);
    savePost(this.posts);

    // 빈 값으로 초기화
    titleEl.value = '';
    usernameEl.value = '';
    contentEl.value = '';

    this.render();
  };

  // 게시판 상태 초기화
  this.initData = () => {
    this.posts = getPostList() || [];
    this.render();
  };

  // 게시글 목록 렌더링
  this.render = () => {
    if (this.posts.length === 0) {
      return;
    }
    const postEls = this.posts
      .map(({ title, username, content }) => {
        return `<li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="w-10 fw-bold">${title}</div>
                  <div style="width: 50%">${content}</div>
                  <div>${username}</div>
              </li>`;
      })
      .join('');
    document.querySelector('#post-list').innerHTML = postEls;
  };

  /**
   * 1. 배열 posts 인덱스로 제어
   * 2. 리스트의 내용을 인덱스에 맞는걸 post-detail 요소에 넣어줌
   */
  this.detail = ()=>{
    
    document.querySelectorAll('#post-list .list-group-item').forEach((item, index) => {
      item.addEventListener('click', () => {
        // 1. 배열 post 접근
        // 클릭된 항목의 데이터 가져오기
        const post = this.posts[index];
  
        // 폼 입력 필드 선택
        const titleEl = document.querySelector('#post-title');
        const usernameEl = document.querySelector('#post-username');
        const contentEl = document.querySelector('#post-content');
  
        // 입력 필드에 데이터 설정
        titleEl.value = post.title;
        usernameEl.value = post.username;
        contentEl.value = post.content;
      });
    });

  }

  // 게시판 이벤트 초기화
  this.initEventListeners = () => {
    document.querySelector('#add-btn').addEventListener('click', this.addPost);
    document.querySelector('#post-list').addEventListener('click', this.detail)
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
}
