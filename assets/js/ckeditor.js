const MakeContainer = document.getElementById("MakeContainer");

const init = () => {
  const editor = CKEDITOR.replace("editor1");

  editor.on("required", function(evt) {
    alert("본문을 입력하세요.");
    evt.cancel();
  });
};
if (MakeContainer) {
  init();
}
