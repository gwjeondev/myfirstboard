import axios from "axios";

const postContainer = document.getElementById("PostContainer");
const postLikeBtn = document.getElementById("PostLike");
const postLikeShape = document.getElementById("PostLikeShape");
const postLikeNumber = document.getElementById("PostLikeNumber");
const postLikeLoginCheck = document.getElementById("postLikeLoginCheck");

const addLikeNumber = () => {
  const num = parseInt(PostLikeNumber.innerText, 10);
  postLikeNumber.innerText = num + 1;
  postLikeShape.innerHTML = '<i class="fas fa-heart"></i>';
};

const delLikeNumber = () => {
  const num = parseInt(PostLikeNumber.innerText, 10);
  postLikeNumber.innerText = num - 1;
  postLikeShape.innerHTML = '<i class="far fa-heart"></i>';
};

const addLike = async () => {
  const postId = window.location.href.split("/post/");
  const response = await axios({
    url: `/api/${postId[1]}/like`,
    method: "POST",
    data: {
      postId: postId[1]
    }
  });
  if (response.data.login === true) {
    response.data.index === -1 ? addLikeNumber() : delLikeNumber();
  } else {
    postLikeLoginCheck.classList.add("show");
  }
};
const init = () => {
  postLikeBtn.addEventListener("click", addLike);
};
if (postContainer) {
  init();
}
