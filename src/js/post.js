import { savePost, getPostList } from '../api/post.js';

export default function Post() {
  this.posts = [];
  this.nextId = 0; // 시퀀스번호
  this.postIdx;

  this.init = () => {
    this.initData();
    this.initEventListeners();
  };

  /**
   * 게시글을 추가하는 addPost() 함수
   * @param {Event} e - 이벤트 객체
   */
  this.addPost = (e) => {
    e.preventDefault();

    const titleEl = document.querySelector('#input-title');
    const usernameEl = document.querySelector('#input-username');
    const contentEl = document.querySelector('#input-content');

    const idx = this.posts.length;

    const data = {
      idx: this.nextId++,
      title: titleEl.value,
      username: usernameEl.value,
      content: contentEl.value,
    };

    if (!this.isPostFormValidate(data)) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    this.posts.unshift(data);
    savePost(this.posts);

    titleEl.value = '';
    usernameEl.value = '';
    contentEl.value = '';

    this.render();
  };

  /**
   * 게시글 데이터를 저장소로부터 가져와 렌더링해주는 initData() 함수
   */
  this.initData = () => {
    this.posts = getPostList() || [];
    this.render();
  };

  /**
   * 게시글 목록을 화면에 출력하는 render() 함수
   */
  this.render = () => {
    if (this.posts.length === 0) {
      return;
    }
    const postEls = this.posts
      .map(({ idx, title, username, content }) => {
        return `<li class="list-group-item d-flex justify-content-between align-items-start"  data-id="${idx}">
                  <div class="w-10 fw-bold">${idx}</div>
                  <div class="w-10 fw-bold">${title}</div>
                  <div style="width: 50%">${content}</div>
                  <div>${username}</div>
              </li>`;
      })
      .join('');
    document.querySelector('#post-list').innerHTML = postEls;
  };

  /**
   * 게시글 상세 정보를 보여주는 getDetailPost() 함수
   * @param {Event} e - 이벤트 객체
   */
  this.getDetailPost = (e) => {
    const listItem = e.target.closest('.list-group-item');

    const id = parseInt(listItem.getAttribute('data-id'), 10); //idx

    const post = this.posts.find((p) => p.idx === id);
    this.postIdx = this.posts.findIndex((p) => p.idx === id);

    const noEl = document.querySelector('#detail-post-no');
    const titleEl = document.querySelector('#post-title');
    const usernameEl = document.querySelector('#post-username');
    const contentEl = document.querySelector('#post-content');

    noEl.className = 'd-inline';
    noEl.setAttribute('data-id', id);
    noEl.innerText = `${post.idx}번`;
    titleEl.value = post.title;
    usernameEl.value = post.username;
    contentEl.value = post.content;

    titleEl.disabled = true;
    usernameEl.disabled = true;
    contentEl.disabled = true;
  };

  /**
   * 게시글 상세 정보를 수정하는 updatePost() 함수
   * @param {Event} e - 이벤트 객체
   */
  this.updatePost = (e) => {
    e.preventDefault();

    const noEl = document.querySelector('#detail-post-no');
    const titleEl = document.querySelector('#post-title');
    const usernameEl = document.querySelector('#post-username');
    const contentEl = document.querySelector('#post-content');

    const id = this.posts.findIndex((p) => p.idx === parseInt(this.postIdx));

    // disabled = true : 수정 가능하게 변경
    // disabled = false : 입력된 값 수정
    if (titleEl.disabled) {
      titleEl.disabled = false;
      usernameEl.disabled = false;
      contentEl.disabled = false;
    } else {
      if (
        !this.isPostFormValidate({
          title: titleEl.value,
          username: usernameEl.value,
          content: contentEl.value,
        })
      ) {
        alert('모든 항목을 입력해주세요.');
        return;
      }

      // 게시글 정보 갱신하기
      this.posts[id] = {
        idx: this.postIdx,
        title: titleEl.value,
        username: usernameEl.value,
        content: contentEl.value,
      };

      // 입력값 활성 상태 true로 변경하기
      titleEl.disabled = true;
      usernameEl.disabled = true;
      contentEl.disabled = true;

      // 게시글 목록 업데이트
      savePost(this.posts);
      this.render();

      alert('수정 완료되었습니다.');
    }
  };

  /**
   * 게시글를 삭제하는 deletePost() 함수
   * @param {Event} e - 이벤트 객체
   */
  this.deletePost = (e) => {
    e.preventDefault();

    if (confirm('정말 삭제하시겠습니뀨?')) {
      const postIdx = parseInt(
        document.querySelector('#detail-post-no').getAttribute('data-id')
      );

      const copiedPosts = [...this.posts];

      const selectedPostIdx = copiedPosts.findIndex(
        (post) => post.idx === postIdx
      );
      copiedPosts.splice(selectedPostIdx, 1);

      savePost(copiedPosts);
      this.initData();
    } else {
      return;
    }
  };

  /**
   * 게시판 관련 이벤트를 초기화하는 initEventListeners() 함수
   */
  this.initEventListeners = () => {
    document.querySelector('#add-btn').addEventListener('click', this.addPost);
    document
      .querySelector('#post-list')
      .addEventListener('click', this.getDetailPost);
    document
      .querySelector('#edit-btn')
      .addEventListener('click', this.updatePost);

    document
      .querySelector('#delete-btn')
      .addEventListener('click', this.deletePost);
  };

  /**
   * 게시판 폼 입력값 유효성 검사하는 isPostFormValidate() 함수
   * @param {string} title - 글 제목
   * @param {string} username - 작성자명
   * @param {string} content - 글 내용
   */
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

  this.sum = (a, b) => {
    return a + b;
  };
}
