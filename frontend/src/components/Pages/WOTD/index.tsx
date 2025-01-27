import { useQuery } from "@tanstack/react-query";
import { fetchWOTDFromDbQueryOptions } from "../../../api/fetchWOTD";
import { WOTD } from "./WOTD";
import { WOTDDefinition } from "./WOTDDefinition";
import { WOTDSentence } from "./WOTDSentence";
import clsx from "clsx";
import { Button } from "../../Shared/Button";
import { useState } from "react";
// import { ArrowRight } from "lucide-react";
import type { Database } from "../../../services/supabase/types";
import { WOTDLevelColorMap } from "../Home/LevelCard";

interface WOTDCardProps {
  level: Database["public"]["Enums"]["difficulty_level"];
}

export const WOTDCard = ({ level }: WOTDCardProps) => {
  const response = useQuery(fetchWOTDFromDbQueryOptions);

  const [showDefinition, setShowDefinition] = useState(true);
  const todaysWords = response.data?.data;

  const wordData = todaysWords?.filter((word) => word.difficulty === level);

  return (
    <div
      className={clsx([
        "relative flex flex-col justify-center items-center w-full max-w-md rounded-2xl shadow-2xl py-3 px-5 text-white hover:scale-105",
        WOTDLevelColorMap[level],
        "transition-all duration-500 transform",
      ])}
    >
      {response.isPending && <p>Loading...</p>}
      {response.isError && <p>Error: {response.error.message}</p>}
      {response.isSuccess && wordData && (
        <>
          <WOTD word={wordData[0]?.word} />
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
                definition={wordData[0]?.definition}
                wordType={"noun"}
              />
              <WOTDSentence sentence={wordData[0]?.example_sentence} />
            </div>
          )}
          {/* <Button
            variant={"ghost"}
            size={"lg"}
            onClick={() => mutate.mutateAsync()}
            className="self-end"
          >
            Nah! Give me another!
            <ArrowRight />
          </Button> */}
        </>
      )}
    </div>
  );
};
