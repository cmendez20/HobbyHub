import { useForm } from 'react-hook-form';

const CreatePost = () => {
  return (
    <div className="max-w-2xl mx-auto pt-16">
      <form className="grid gap-8">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="px-4 py-2 rounded-lg"
        />
        <textarea
          name="content"
          id="content"
          placeholder="Content (Optional)"
          className="px-4 py-2 rounded-lg min-h-48"
        ></textarea>
        <input
          type="text"
          name="imageURL"
          placeholder="Image URL (Optional)"
          className="px-4 py-2 rounded-lg"
        />
        <button
          type="submit"
          className="px-5 py-2.5 bg-slate-600 text-white justify-self-start rounded-lg transition-colors hover:bg-slate-800"
        >
          Create post
        </button>
      </form>
    </div>
  );
};

export { CreatePost };
