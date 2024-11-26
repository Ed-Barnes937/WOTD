import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchWOTDQueryOptions, useWOTDChange } from "../../../api/fetchWOTD";
import { WOTD } from "./WOTD";
import { WOTDDefinition } from "./WOTDDefinition";
import { WOTDSentence } from "./WOTDSentence";
import clsx from "clsx";
import { Button } from "../../Button";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export const WOTDCard = () => {
  const { data } = useSuspenseQuery(fetchWOTDQueryOptions);
  const mutate = useWOTDChange();

  const [showDefinition, setShowDefinition] = useState(false);

  return (
    <div
      className={clsx([
        "relative flex flex-col justify-center items-center w-full max-w-md rounded-2xl shadow-2xl py-3 px-5 text-white hover:scale-105",
        data?.colour ?? "bg-pink-400",
        "transition-all duration-500 transform",
      ])}
    >
      <WOTD word={data.word} />
      <Button
        variant={"default"}
        size={"lg"}
        onClick={() => setShowDefinition((showing) => !showing)}
        className="mb-4"
      >
        {showDefinition ? "Hide Definition" : "Show Definition"}
      </Button>
      {showDefinition && (
        <div className="bg-white/20 rounded-xl p-4 text-center mb-4">
          <WOTDDefinition
            definition={data.meanings[0].definitions[0].definition}
            wordType={data.meanings[0].partOfSpeech}
          />
          <WOTDSentence sentence={`Sentence with ${data.word} in`} />
        </div>
      )}
      <Button
        variant={"ghost"}
        size={"lg"}
        onClick={() => mutate.mutateAsync()}
        className="self-end"
      >
        Nah! Give me another!
        <ArrowRight />
      </Button>
    </div>
  );
};
