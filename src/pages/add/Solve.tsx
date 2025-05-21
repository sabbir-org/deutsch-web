import { Minus, Plus } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

type formDataProps = {
  kapitelId: string;

  aufgabe: string;
  task: {
    bold: string;
    text: string;
  }[];
};

const Solve = () => {
  const { register, control, handleSubmit, setValue, getValues, reset } =
    useForm<formDataProps>({
      defaultValues: {
        kapitelId: "5",
        aufgabe: "",
        task: [{ bold: "", text: "" }],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "task",
  });

  const onSubmit = async (data: any) => {
    console.log(data);

    fetch("http://localhost:3000/api/add-aufgabe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kapitelId: "kapitel" + data.kapitelId,
        aufgabe: {
          aufgabe: data.aufgabe,
          task: data.task,
        },
      }),
    }).then(() => reset());
  };

  return (
    <div>
      <form className={`w-[90%] md:w-[60%] lg:w-[500px] mx-auto space-y-2`}>
        <h2 className={`text-lg font-medium text-emerald-700`}>Information</h2>

        <input
          {...register("kapitelId")}
          placeholder="kapitel number"
          className={`h-9 w-full px-2 outline-none bg-gray-100 rounded block`}
        />
        <input
          {...register("aufgabe")}
          placeholder="aufgabe"
          className={`h-9 w-full px-2 outline-none bg-gray-100 rounded block`}
        />

        {fields.map((field, index) => (
          <div key={field.id} className={`flex items-center gap-x-2`}>
            <div className={`space-y-2 w-full`}>
              <input
                {...register(`task.${index}.bold`)}
                placeholder="title if any"
                className={`h-9 w-full px-2 outline-none bg-gray-100 rounded block`}
              />

              <textarea
                {...register(`task.${index}.text`)}
                className={`bg-gray-100 rounded w-full h-20 outline-none p-2`}
              ></textarea>
            </div>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className={`cursor-pointer bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full`}
              >
                <Minus className={`text-emerald-800`} />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ bold: "", text: "" })}
          className={`bg-gray-100 w-8 h-8 flex justify-center items-center rounded-full cursor-pointer`}
        >
          <Plus className={`text-emerald-800`}></Plus>
        </button>

        <button
          onClick={handleSubmit(onSubmit)}
          type="button"
          className={`bg-emerald-700 text-white px-4 rounded py-1 cursor-pointer hover:bg-emerald-800 mt-8`}
        >
          Add
        </button>
      </form>
    </div>
  );
};
export default Solve;
