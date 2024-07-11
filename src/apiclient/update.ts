import { getSecurePostRequestOption } from "./utilities.ts";

async function addToWatchList(coinId: string) {
  const requestOptions = getSecurePostRequestOption({ coinId, type: "add" });
  const result = await fetch(
    `${process.env.BASE_URL}/update/watchlist`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((err) => {
      console.log(err);
      return { error: "something went wrong" };
    });
  return result;
}
async function removeFromWatchList(coinId: string) {
  const requestOptions = getSecurePostRequestOption({ coinId, type: "remove" });
  const result = await fetch(
    `${process.env.BASE_URL}/update/watchlist`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((err) => {
      console.log(err);
      return { error: "something went wrong" };
    });
  return result;
}

export { addToWatchList, removeFromWatchList };
