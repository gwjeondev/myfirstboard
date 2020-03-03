import axios from "axios";

const CommentContainer = document.getElementById("CommentContainer");
const CommentForm = document.getElementById("CommentAdd");
const CommentInput = document.getElementById("CommentInput");
const CommentDelBtn = document.querySelectorAll(".comment__delete");
const CommentReply = document.querySelectorAll(".comment__reply");
const CommentArea = document.getElementById("CommentArea");
const CommentNumber = document.getElementById("CommentNumber");

function insertAfter(referenceNode, newNode) {
  if (!!referenceNode.nextSibling) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  } else {
    referenceNode.parentNode.appendChild(newNode);
  }
}

const addSendReply = async e => {
  e.preventDefault();
  console.log("리플 추가 AJAX 전송 전");
  const replyForm = e.target;
  const parentId = replyForm.parentNode.previousElementSibling.id;
  const postId = window.location.href.split("/post/");
  const text = replyForm.firstChild.value;
  const response = await axios({
    url: `/api/${postId[1]}/reply`,
    method: "POST",
    data: {
      parentId,
      text
    }
  });
  console.log(response);
  if (response.status === 200) {
  }
};
const replyForm = id => {
  const replyContainer = document.createElement("div");
  const arrow = document.createElement("div");
  const replyAddForm = document.createElement("form");
  const replyTextArea = document.createElement("textarea");
  const replySubmit = document.createElement("input");
  replyContainer.className = `reply-form`;
  arrow.className = "arrow";
  // replyContainer.id = `reply-${id}`;
  replyTextArea.placeholder = "답글 입력";
  replySubmit.type = "submit";
  replySubmit.value = "등록";
  replyContainer.appendChild(arrow);
  replyContainer.appendChild(replyAddForm);
  replyAddForm.appendChild(replyTextArea);
  replyAddForm.appendChild(replySubmit);
  replyAddForm.addEventListener("submit", addSendReply);
  return replyContainer;
};

const addReply = e => {
  const parent = e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
  console.log(parent);
  const nextElement = parent.nextElementSibling;
  if(!nextElement) {
    // 다음 요소가 없을 때
    insertAfter(parent, replyForm());
  } else if(nextElement.className === "reply-form") {
    // 다음 요소가 reply Form 일 때
    CommentArea.removeChild(nextElement);
  } else if(nextElement.className === "comment__list" || nextElement.className === "reply__list" ) {
    // 다음 요소가 Comment 일 때
    insertAfter(parent, replyForm());
  }
};
const delCommentNumber = () => {
  CommentNumber.innerText = parseInt(CommentNumber.innerText, 10) - 1;
};
const delComment = parent => {
  const nextElement = parent.nextElementSibling;
  if(nextElement && nextElement.className === "reply-form") {
    CommentArea.removeChild(nextElement);
  }
  CommentArea.removeChild(parent);
  delCommentNumber();
};
const delSendComment = async e => {
  const postId = window.location.href.split("/post/");
  const parent = e.target.parentNode.parentNode.parentNode.parentNode;
  const response = await axios({
    url: `/api/${postId[1]}/comment-delete`,
    method: "POST",
    data: {
      postId: postId[1],
      commentId: parent.id
    }
  });
  if (response.status === 200) {
    delComment(parent);
  }
};
const addCommentNumber = () => {
  CommentNumber.innerText = parseInt(CommentNumber.innerText, 10) + 1;
};
const addComment = (text, response) => {
  const cmList = document.createElement("li");
  const cmInner = document.createElement("div");
  const cmTitle = document.createElement("div");
  const cmCreator = document.createElement("div");
  const cmCreatorName = document.createElement("span");
  const cmCreatorTime = document.createElement("span");
  const cmBtn = document.createElement("div");
  const cmBtnReply = document.createElement("span");
  const cmBtnDelete = document.createElement("span");
  const cmContent = document.createElement("div");
  const cmText = document.createElement("span");
  cmList.className = "comment__list";
  cmList.id = response.data._id;
  cmTitle.className = "comment__title";
  cmCreator.className = "comment__creator";
  cmBtn.className = "comment__btn";
  cmBtnReply.className = "comment__reply";
  cmBtnDelete.className = "comment__delete";
  cmContent.className = "comment__text";
  cmCreatorName.innerText = response.data.creator.name;
  cmCreatorTime.innerText = response.data.createTime;
  cmBtnReply.innerHTML = `<i class="fas fa-reply-all"></i>`;
  cmBtnDelete.innerHTML = `<i class="fas fa-trash-alt"></i>`;
  cmText.innerText = response.data.text;
  cmCreator.appendChild(cmCreatorName);
  cmCreator.appendChild(cmCreatorTime);
  cmBtn.appendChild(cmBtnReply);
  cmBtn.appendChild(cmBtnDelete);
  cmContent.appendChild(cmText);
  cmTitle.appendChild(cmCreator);
  cmTitle.appendChild(cmBtn);
  cmInner.appendChild(cmTitle);
  cmInner.appendChild(cmContent);
  cmList.appendChild(cmInner);
  CommentArea.prepend(cmList);
  cmBtnDelete.addEventListener("click", delSendComment);
  cmBtnReply.addEventListener("click", addReply);
  addCommentNumber();
};

const addSendComment = async e => {
  e.preventDefault();
  const text = CommentInput.value;
  const postId = window.location.href.split("/post/");
  const response = await axios({
    url: `/api/${postId[1]}/comment`,
    method: "POST",
    data: {
      postId: postId[1],
      text
    }
  });
  if (response.status === 200) {
    CommentInput.value = "";
    addComment(text, response);
  }
};

const init = () => {
  CommentForm.addEventListener("submit", addSendComment);
  CommentReply.forEach(element => {
    element.addEventListener("click", addReply);
  });
  CommentDelBtn.forEach(element => {
    element.addEventListener("click", delSendComment);
  });
};
if (CommentContainer) {
  init();
}
