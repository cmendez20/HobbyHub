import { useForm } from "react-hook-form";
import { supabase } from "../supabase-client";
import { useNavigate, Form } from "react-router-dom";

const CreatePost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto pt-16">
      <Form
        className="grid gap-8"
        onSubmit={handleSubmit(async formData => {
          try {
            console.log(formData);
            const { data, error } = await supabase
              .from("posts")
              .insert({ ...formData, comments: [] })
              .select();
            reset();
            navigate("/");
            if (error) throw error;
          } catch (err) {
            console.error("error saving post:", err.message);
          }
        })}
      >
        <input
          type="text"
          {...register("title", { required: "Please enter a title." })}
          // name="title"
          placeholder="Title"
          className="px-4 py-2 rounded-lg"
        />
        {errors.title && (
          <p className="text-red-600  px-1">{errors.title?.message}</p>
        )}
        <textarea
          // name="content"
          {...register("content")}
          id="content"
          placeholder="Content (Optional)"
          className="px-4 py-2 rounded-lg min-h-48"
        ></textarea>
        <input
          type="text"
          {...register("image_url")}
          // name="imageURL"
          placeholder="Image URL (Optional)"
          className="px-4 py-2 rounded-lg"
        />
        <button
          type="submit"
          className="px-5 py-2.5 bg-slate-600 text-white justify-self-start rounded-lg transition-colors hover:bg-slate-800"
        >
          Create post
        </button>
      </Form>
    </div>
  );
};

export { CreatePost };
