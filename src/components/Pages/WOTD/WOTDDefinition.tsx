import { Typography } from "../../Shared/Typography";

type WordDefinitionProps = {
  wordType: string;
  definition: string;
};

export const WOTDDefinition = ({
  definition,
  wordType,
}: WordDefinitionProps) => {
  return (
    <div className="mb-4">
      <Typography variant={"h3"} className="mt-0">
        {wordType}
      </Typography>{" "}
      <Typography>{definition}</Typography>
    </div>
  );
};
