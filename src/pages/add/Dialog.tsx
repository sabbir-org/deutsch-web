import { useForm, useFieldArray } from "react-hook-form";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Plus } from "lucide-react";

function Dialog() {
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      id: "",
      title: "",
      subtitle: "",
      number: "",
      audio: "",
      convo: [{ name: "", text: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "convo",
  });

  const onSubmit = async (data) => {
    if (!data.id) return alert("ID is required");

    try {
      await setDoc(doc(db, "conversation", data.id), data);
      alert("Conversation added!");
      reset(); // clear form after success
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Upload failed.");
    }
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className={`text-lg font-medium text-emerald-700`}>Information</h2>
      <input
        {...register("id", { required: true })}
        placeholder="ID (e.g., 03_spektrum_a1)"
        className={`h-8 px-2 outline-none bg-gray-100 rounded block my-2`}
      />
      <input
        {...register("title")}
        placeholder="Title"
        className={`h-8 px-2 outline-none bg-gray-100 rounded block my-2`}
      />
      <input
        {...register("subtitle")}
        placeholder="Subtitle"
        className={`h-8 px-2 outline-none bg-gray-100 rounded block my-2`}
      />
      <input
        {...register("number")}
        placeholder="Number (e.g., 2a)"
        className={`h-8 px-2 outline-none bg-gray-100 rounded block my-2`}
      />
      <input
        {...register("audio")}
        placeholder="Audio URL"
        className={`h-8 px-2 outline-none bg-gray-100 rounded block my-2`}
      />

      <h2 className={`text-lg font-medium text-emerald-700`}>Dialogues</h2>
      {fields.map((field, index) => (
        <div key={field.id} className={`flex`}>
          <div>
            <input
              {...register(`convo.${index}.name`)}
              placeholder="Name"
              className={`h-8 px-2 outline-none bg-gray-100 rounded block my-2`}
            />
            <input
              {...register(`convo.${index}.text`)}
              placeholder="Text"
              className={`h-8 px-2 outline-none bg-gray-100 rounded block my-2`}
            />
          </div>
          {fields.length > 1 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className={`cursor-pointer`}
            >
              ❌
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ name: "", text: "" })}
        className={`bg-gray-100 w-8 h-8 flex justify-center items-center rounded-full cursor-pointer`}
      >
        <Plus className={`text-emerald-800`}></Plus>
      </button>

      <button
        type="submit"
        className={`bg-emerald-700 text-white px-4 rounded py-1 cursor-pointer hover:bg-emerald-800 mt-8`}
      >
        Submit
      </button>
    </form>
  );
}

export default Dialog;
