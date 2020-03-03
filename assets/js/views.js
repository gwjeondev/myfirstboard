const postContainer = document.getElementById("PostContainer");

const views = () => {
  const postId = window.location.href.split("/post/");
  fetch(`/api/${postId[1]}/views`, {
    method: "POST"
  });
};

const init = () => {
  views();
};
if (postContainer) {
  init();
}
