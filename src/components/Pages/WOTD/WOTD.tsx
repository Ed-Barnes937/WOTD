type WOTDProps = {
  word: string;
};
export const WOTD = ({ word }: WOTDProps) => {
  return (
    <div className="bg-white/20 rounded-xl p-6 text-center mb-4">
      <p className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
        {/* {isError && 'Oops, something went wrong! How about "rambunctious"'} */}
        {word}
      </p>
    </div>
  );
};
