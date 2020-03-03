import Post from "../models/Post";

export const like = async (req, res) => {
  const { postId } = req.body;
  try {
    if (!req.user) {
      throw Error();
    }
    const user = req.user;
    const post = await Post.findById(postId);
    const index = user.likes.indexOf(postId);
    if (index === -1) {
      user.likes.push(postId);
      post.likes += 1;
      user.save();
      post.save();
    } else {
      user.likes = user.likes.filter(i => i.toString() !== postId);
      post.likes -= 1;
      user.save();
      post.save();
    }
    res.send({
      index,
      login: true
    });
  } catch (error) {
    res.send({
      login: false
    });
  } finally {
    res.end();
  }
};
