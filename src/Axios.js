import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPostsStatus,
  getPostsError,
  selectAllPosts,
  fetchPosts,
} from "./store/slices/RequestSlice";

function App() {
  const dispatch = useDispatch();

  const post = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const postError = useSelector(getPostsError);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;
  if (postStatus === "loading") {
    content = <h2 className="text-slate-400 text-2xl font-bold">Loading...</h2>;
  } else if (postStatus === "success") {
    const renderedPosts = post.map((post, index) => (
      <div key={index} className="w-1/2 bg-white shadow-md rounded-lg p-4">
        <h1 className="w-fit px-3 py-1 mb-2 border rounded-md text-2xl text-cyan-100 font-bold bg-slate-600">{post.id}</h1>
        <img src={post.image} alt={post.title} className="w-full aspect-auto" />
        <h2 className="text-xl font-bold">{post.date}</h2>
        <p className="text-slate-400">{post.description}</p>
      </div>
    ));
    content = renderedPosts;
  } else if (postStatus === "failed") {
    content = (
      <h2 className="text-slate-400 text-2xl font-bold">{postError}</h2>
    );
  }

  return (
    <div className="w-screen h-screen bg-gray-100 flex flex-col items-center justify-center gap-3">
      {content}
      <p className="text-"></p>
    </div>
  );
}

export default App;
