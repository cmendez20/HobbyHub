import { useParams, Link } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";
import { supabase } from "../supabase-client";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const fetchPost = async id => {
  const { data, error } = await supabase
    .from("posts")
    .select()
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

const PostDetails = () => {
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

  const formatDate = timestamp => {
    return formatDistanceToNow(parseISO(timestamp), {
      addSuffix: true,
    });
  };

  return (
    <section className="max-w-5xl mx-auto pt-8">
      <div className="bg-white p-8 rounded-lg flex flex-col gap-4 mb-8">
        <p className="font-extralight">{formatDate(post.created_at)}</p>
        <p className="font-bold text-xl">{post.title}</p>
        <p className="font-extralight">{post.content}</p>
        {post.image_url && <img src={post.image_url} alt="Post image" />}
        <div className="flex justify-between items-center">
          <p className="font-extralight">{post.upvotes || 0} upvotes</p>
          <div className="flex gap-4">
            <Link
              to={`edit`}
              className="px-4 py-2 bg-slate-600 text-white rounded-lg"
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
