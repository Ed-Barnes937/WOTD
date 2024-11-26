import {
    queryOptions,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { dummyWords } from "../components/Pages/WOTD/dummyWords";

const randNum = () => {
    const numWords = 12;
    return Math.floor(Math.random() * numWords);
};

export const fetchWOTD = () => {
    const word = dummyWords[randNum()];
    const colour = randNum();
    return fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
        .then((res) => res.json())
        .then((data) => {
            return {
                word: word,
                meanings: data[0].meanings,
                colour: colour > 6 ? "bg-pink-500" : "bg-teal-500",
            };
        });
};

const WOTDQueryKeys = {
    wotd: "wotd",
};

export const fetchWOTDQueryOptions = queryOptions({
    queryKey: [WOTDQueryKeys.wotd],
    queryFn: fetchWOTD,
});

export const useWOTDChange = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: fetchWOTD,
        onSuccess: (data) => {
            queryClient.setQueryData([WOTDQueryKeys.wotd], data);
        },
    });
};
