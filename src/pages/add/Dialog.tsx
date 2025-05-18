import { useForm, useFieldArray } from "react-hook-form";
import { Minus, Plus } from "lucide-react";
import Preview from "../../components/Preview";
import { useState } from "react";
import type { Conversation } from "../../utils/type";
import TextArea from "../../components/TextArea";

function Dialog() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      subtitle: "",
      number: "",
      kapitel: "",
      audio: "",
      convo: [{ name: "", text: "" }],
    },
  });

  // preview modal states
  const [previewData, setPreviewData] = useState<Conversation | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "convo",
  });

  const onSubmit = async (data: any) => {
    setShowPreview(true);
    const teil = data.kapitel < 7 ? 1 : 2;

    const id = `${data.audio}_spektrum_a1_${teil}`;
    const audio = `https://www.schubert-verlag.de/spektrum/audio/${data.audio}_spektrum_a1-${teil}.mp3`;

    const finalData = {
      id: id,
      title: data.title,
      subtitle: data.subtitle,
      number: data.number,
      audio: audio,
      convo: data.convo,
    };

    setPreviewData(finalData);
    console.log(finalData);
  };

  return (
    <div>
      <form className={`w-[90%] md:w-[60%] lg:w-[500px] mx-auto space-y-2`}>
        <h2 className={`text-lg font-medium text-emerald-700`}>Information</h2>

        <input
          {...register("title")}
          placeholder="Title (eg. Sich vorstellen)"
          className={`h-9 w-full px-2 outline-none bg-gray-100 rounded block`}
        />
        <input
          {...register("subtitle")}
          placeholder="Subtitle (eg. Lesen und hören Sie)"
          className={`h-9 w-full px-2 outline-none bg-gray-100 rounded block`}
        />
        <input
          {...register("number")}
          placeholder="Numer (e.g., 2a)"
          className={`h-9 w-full px-2 outline-none bg-gray-100 rounded block`}
        />
        <input
          {...register("kapitel")}
          placeholder="Kapitel numer"
          className={`h-9 w-full px-2 outline-none bg-gray-100 rounded block`}
        />

        <input
          {...register("audio")}
          placeholder="Audio (number inside headphone sign)"
          className={`h-9 w-full px-2 outline-none bg-gray-100 rounded block`}
        />

        <h2 className={`text-lg font-medium text-emerald-700`}>Dialogues</h2>
        {fields.map((field, index) => (
          <div key={field.id} className={`flex items-center gap-x-2`}>
            <div className={`space-y-2 w-full`}>
              <input
                {...register(`convo.${index}.name`)}
                placeholder="Name"
                className={`h-9 w-full px-2 outline-none bg-gray-100 rounded block`}
              />
              <TextArea register={register} index={index}></TextArea>
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
          onClick={() => append({ name: "", text: "" })}
          className={`bg-gray-100 w-8 h-8 flex justify-center items-center rounded-full cursor-pointer`}
        >
          <Plus className={`text-emerald-800`}></Plus>
        </button>

        <button
          onClick={handleSubmit(onSubmit)}
          type="button"
          className={`bg-emerald-700 text-white px-4 rounded py-1 cursor-pointer hover:bg-emerald-800 mt-8`}
        >
          Vorschau
        </button>
      </form>

      {showPreview && <Preview previewData={previewData}></Preview>}
    </div>
  );
}

export default Dialog;
