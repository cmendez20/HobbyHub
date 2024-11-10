import { useLocation, useParams, Form, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { supabase } from "../supabase-client";
import { useEffect } from "react";

const EditPost = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const { id } = useParams();
  let { state } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    const { spData, error } = await supabase
      .from("posts")
      .update(data)
      .eq("id", id)
      .select();

    navigate(`../posts/${id}`);
  };

  return (
    <div className="max-w-2xl mx-auto pt-16">
      <Form className="grid gap-8" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: "Please enter a title." })}
          defaultValue={state.title}
          className={`px-4 py-2 rounded-lg ${errors.title && `-mb-6`}`}
        />
        {errors.title && (
          <p className="text-red-600  px-1">{errors.title?.message}</p>
        )}
        <textarea
          // name="content"
          id="content"
          placeholder="Content (Optional)"
          className="px-4 py-2 rounded-lg min-h-48"
          {...register("content")}
          defaultValue={state.content}
        ></textarea>
        <input
          type="text"
          // name="imageURL"
          placeholder="Image URL (Optional)"
          className="px-4 py-2 rounded-lg"
          {...register("image_url")}
          defaultValue={state.image_url}
        />
        <button
          type="submit"
          className="px-5 py-2.5 bg-slate-600 text-white justify-self-start rounded-lg transition-colors hover:bg-slate-800"
        >
          Update post
        </button>
      </Form>
    </div>
  );
};

export { EditPost };
