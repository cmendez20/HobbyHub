import { useParams, Link } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";
import { supabase } from "../supabase-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const updateUpvotes = async ({ id, newUpvotes }) => {
  const { data, error } = await supabase
    .from("posts")
    .update({ upvotes: newUpvotes })
    .eq("id", id)
    .select();
  if (error) throw error;
  return data;
};

const addComment = async ({ id, post, newComment }) => {
  const { data, error } = await supabase
    .from("posts")
    .update({
      comments: post.comments ? [...post.comments, newComment] : [newComment],
    })
    .eq("id", id)
    .select();
  if (error) throw error;
  return data;
};

const PostDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
  });

  const upvoteMutation = useMutation({
    mutationFn: updateUpvotes,
    onMutate: cache => {
      queryClient.setQueryData(["post", id], old => ({
        ...old,
        upvotes: cache.newUpvotes,
      }));
    },
    onSettled: () => {
      queryClient.invalidateQueries(["post", id]);
    },
  });

  const commentMutation = useMutation({
    mutationFn: addComment,
    onMutate: cache => {
      queryClient.setQueryData(["post", id], old => ({
        ...old,
        comments: [...old.comments, cache.newComment],
      }));
    },
    onSettled: () => {
      queryClient.invalidateQueries(["post", id]);
    },
  });

  const fetchPost = async id => {
    const { data, error } = await supabase
      .from("posts")
      .select()
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  };

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
    upvoteMutation.mutate({ id, newUpvotes: post.upvotes + 1 });
  };

  const formatDate = timestamp => {
    return formatDistanceToNow(parseISO(timestamp), {
      addSuffix: true,
    });
  };

  if (isLoading) {
    return (
      <div className="pt-16">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) return <div>Error {error.message}</div>;

  return (
    <section className="max-w-2xl mx-auto pt-8 px-2 lg:px-0">
      <div className="bg-white mb-4 p-8 rounded-lg flex flex-col gap-4 md:mb-8">
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
        <div className="flex-col gap-4 flex justify-between items-center sm:flex-row sm:gap-0">
          <div className="flex gap-1.5 items-center">
            <button onClick={handleClick}>&uArr;</button>
            {<p className="font-extralight"> {post.upvotes || 0} upvotes</p>}
          </div>
          <div className="flex gap-8">
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
        {post.comments &&
          post.comments.map((comment, i) => <p key={i}>- {comment}</p>)}
        <form
          className=""
          onSubmit={handleSubmit(data => {
            commentMutation.mutate({ id, post, newComment: data.comments });
            reset();
          })}
        >
          <input
            type="text"
            placeholder="Leave a comment..."
            className="p-2 w-full"
            {...register("comments")}
          />
        </form>
      </div>
    </section>
  );
};

export { PostDetails };
