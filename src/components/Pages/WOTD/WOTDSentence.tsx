import { Typography } from "../../Shared/Typography";

type WOTDSentenceProps = {
  sentence: string;
};

export const WOTDSentence = ({ sentence }: WOTDSentenceProps) => {
  return (
    <div className="mb-4">
      <Typography className="text-white/80">Example: {sentence}</Typography>
    </div>
  );
};
