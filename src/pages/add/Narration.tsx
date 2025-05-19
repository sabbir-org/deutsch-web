import { useForm, useFieldArray } from "react-hook-form";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useUploadStore } from "../../store/uploadStore";
import type { TNarrationData } from "../../utils/type";
import TextArea from "../../components/TextArea";

const umlauts = ["ü", "Ü", "ö", "Ö", "ä", "Ä", "ß"];

type formDataProps = {
  title: string;
  subtitle: string;
  number: string;
  kapitel: string;
  audio: string;
  customAudio: string;
  content: {
    title: string;
    text: string;
  }[];
};

function Narration() {
  const { register, control, handleSubmit, setValue, getValues } =
    useForm<formDataProps>({
      defaultValues: {
        title: "",
        subtitle: "",
        number: "",
        kapitel: "",
        audio: "",
        customAudio: "",
        content: [{ title: "", text: "" }],
      },
    });

  const [focusIndex, setFocusIndex] = useState(0);

  const handleInsertText = (text: string) => {
    const current = getValues(`content.${focusIndex}.text`) || "";
    const updated = current + text;
    setValue(`content.${focusIndex}.text`, updated, { shouldDirty: true });
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "content",
  });

  const { updatePreviewData, openPreview } = useUploadStore();

  const onSubmit = async (data: any) => {
    const teil = data.kapitel < 7 ? 1 : 2;

    const id = `${data.audio}_spektrum_a1_${teil}`;
    const audio = `https://www.schubert-verlag.de/spektrum/audio/${data.audio}_spektrum_a1-${teil}.mp3`;

    const finalData: TNarrationData = {
      id: id,
      title: data.title,
      subtitle: data.subtitle,
      number: data.number,
      audio: data.customAudio || audio,
      type: "narration",
      content: data.content,
    };
    updatePreviewData(finalData);
    openPreview();
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

        <div className={`flex items-center gap-x-2`}>
          <input
            {...register("audio")}
            placeholder="Audio (number from book)"
            className={`h-9 w-full px-2 outline-none bg-gray-100 rounded block`}
          />
          or
          <input
            {...register("customAudio")}
            placeholder="Custom audio link"
            className={`h-9 w-full px-2 outline-none bg-gray-100 rounded block`}
          />
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className={`flex items-center gap-x-2`}>
            <div className={`space-y-2 w-full`}>
              <TextArea
                register={register}
                index={index}
                setFocusIndex={setFocusIndex}
              ></TextArea>
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

        <div className={`flex gap-x-2 mt-2`}>
          {umlauts.map((item) => (
            <button
              key={item}
              type="button"
              className={`bg-gray-100 h-6 w-6 rounded cursor-pointer`}
              onClick={() => handleInsertText(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => append({ title: "", text: "" })}
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
    </div>
  );
}

export default Narration;
