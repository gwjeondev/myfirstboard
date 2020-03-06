import axios from "axios";

const CommentContainer = document.getElementById("CommentContainer");
const CommentForm = document.getElementById("CommentAdd");
const CommentInput = document.getElementById("CommentInput");
const CommentDelBtn = document.querySelectorAll(".comment__delete");
const CommentReply = document.querySelectorAll(".comment__reply");
const CommentArea = document.getElementById("CommentArea");
const CommentNumber = document.getElementById("CommentNumber");

const insertAfter = (referenceNode, newNode) => {
  console.log(referenceNode, newNode);
  if (!!referenceNode.nextSibling) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  } else {
    referenceNode.parentNode.appendChild(newNode);
  }
}

const addSendReply = async e => {
  e.preventDefault();
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
  console.log(replyForm);
  if (response.status === 200) {
    replyForm.firstChild.value = '';
    CommentArea.removeChild(replyForm.parentNode);
    addComment(text, response, "reply" , parentId);
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
  const inner = parent.lastChild;
  const title = inner.firstChild;
  const text = inner.lastChild;
  const btn = title.lastChild;
  text.className = "text-delete";
  btn.innerHTML = "";
  text.innerText = "삭제 된 댓글 입니다.";
  const nextElement = parent.nextElementSibling;
  if(nextElement && nextElement.className === "reply-form") {
    CommentArea.removeChild(nextElement);
  }
  delCommentNumber();
};

const delSendComment = async e => {
  const postId = window.location.href.split("/post/");
  const parent = e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
  const response = await axios({
    url: `/api/${postId[1]}/comment-delete`,
    method: "POST",
    data: {
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

const addComment = (text, res, type, prev) => {
  const cmt = type === "comment" ? "comment" : "reply";
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
  cmList.className = `${cmt}__list`;
  cmList.id = res.data._id;
  cmInner.className = `${cmt}__inner`;
  cmTitle.className = `${cmt}__title`;
  cmCreator.className = `${cmt}__creator`;
  cmBtn.className = `${cmt}__btn`;
  cmBtnReply.className = `${cmt}__reply`;
  cmBtnDelete.className = `${cmt}__delete`;
  cmContent.className = `${cmt}__text`;
  cmCreatorName.innerText = res.data.creator.name;
  cmCreatorTime.innerText = res.data.createTime;
  cmBtnReply.innerHTML = `<i class="fas fa-reply-all"></i>`;
  cmBtnDelete.innerHTML = `<i class="fas fa-trash-alt"></i>`;
  cmText.innerText = res.data.text;
  cmCreator.appendChild(cmCreatorName);
  cmCreator.appendChild(cmCreatorTime);
  cmBtn.appendChild(cmBtnReply);
  cmBtn.appendChild(cmBtnDelete);
  cmBtnDelete.addEventListener("click", delSendComment);
  cmBtnReply.addEventListener("click", addReply);
  cmTitle.appendChild(cmCreator);
  cmTitle.appendChild(cmBtn);
  cmInner.appendChild(cmTitle);
  cmInner.appendChild(cmContent);
  if(cmt === "reply") {
    const arrow = document.createElement("div");
    const author = document.createElement("span");
    const replyShape = document.createElement("span");
    author.innerText = res.data.parent.creator.name;
    replyShape.innerHTML = '<i class="fas fa-reply"></i>';
    cmContent.appendChild(author);
    cmContent.appendChild(replyShape);
    cmContent.appendChild(cmText);
    const prevElement = document.getElementById(prev);
    arrow.className = "arrow";
    cmList.appendChild(arrow);
    cmList.appendChild(cmInner);
    insertAfter(prevElement, cmList);
  } else {
    cmContent.appendChild(cmText);
    cmList.appendChild(cmInner);
    CommentArea.appendChild(cmList);
  }
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
    addComment(text, response, "comment");
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
