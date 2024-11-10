import { useParams, Link } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";
import { supabase } from "../supabase-client";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PostDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [upvotes, setUpvotes] = useState(null);
  const saveUpvotes = async () => {
    const { data, error } = await supabase
      .from("posts")
      .update({ upvotes: upvotes })
      .eq("id", id)
      .select();
  };
  const fetchPost = async id => {
    const { data, error } = await supabase
      .from("posts")
      .select()
      .eq("id", id)
      .single();

    if (error) throw error;

    setUpvotes(data.upvotes);
    return data;
  };

  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
  });

  if (isLoading) {
    return (
      <div className="pt-16">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) return <div>Error {error.message}</div>;

  const handleDelete = async e => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .delete()
        .eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error("error deleting post", error.message);
    }

    navigate("/");
  };

  const handleClick = () => {
    setUpvotes(prevUpvotes => prevUpvotes + 1);
    console.log(upvotes);
  };

  const formatDate = timestamp => {
    return formatDistanceToNow(parseISO(timestamp), {
      addSuffix: true,
    });
  };

  // useEffect(() => {
  //   console.log("upvotes from useEffect", upvotes);
  //   saveUpvotes();
  // }, [upvotes]);

  return (
    <section className="max-w-2xl mx-auto pt-8">
      <div className="bg-white p-8 rounded-lg flex flex-col gap-4 mb-8">
        <p className="font-extralight">{formatDate(post.created_at)}</p>
        <p className="font-bold text-xl">{post.title}</p>
        <p className="font-extralight">{post.content}</p>
        {post.image_url && (
          <img
            src={post.image_url}
            className="rounded-lg mb-4"
            alt="Post image"
          />
        )}
        <div className="flex justify-between items-center">
          <div className="flex gap-1.5 items-center">
            <button onClick={handleClick}>&uArr;</button>
            {<p className="font-extralight"> {upvotes || 0} upvotes</p>}
          </div>
          <div className="flex gap-4">
            <Link
              to={`edit`}
              className="px-4 py-2 bg-slate-600 text-white rounded-lg"
              state={post}
            >
              edit post
            </Link>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
              onClick={handleDelete}
            >
              delete post
            </button>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg grid gap-4">
        {post.comments !== null &&
          post.comments.map((comment, i) => <p key={i}>- {comment}</p>)}
        <input type="text" placeholder="Leave a comment..." className="p-2" />
      </div>
    </section>
  );
};

export { PostDetails };
