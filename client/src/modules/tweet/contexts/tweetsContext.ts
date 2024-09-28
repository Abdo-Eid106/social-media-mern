import { createContext } from "react";

interface ITweetContext {
  refetchTweets: () => void;
}

export const TweetsContext = createContext({} as ITweetContext);
