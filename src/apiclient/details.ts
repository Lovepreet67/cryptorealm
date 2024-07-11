import {
  getGetRequestOption,
  getSecurePostRequestOption,
} from "./utilities.ts";

async function userDetails() {
  const requestOptions = getSecurePostRequestOption(undefined);
  const result = await fetch(
    `${process.env.BASE_URL}/user/info`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => result);
  if (result.code) return result;
  return result["user"];
}

// creating functions for fetching the data related to coin
async function coinDetails(coinId: string) {
  const requestOptions = getGetRequestOption();
  const result = await fetch(
    `${process.env.BASE_URL}/details/test/coinDetail?coinId=${coinId}`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((err) => {
      console.log(err);
    });
  return result;
}

async function sevenDayCoinDetails(coinId: string) {
  const requestOptions = getGetRequestOption();
  const result = await fetch(
    `${process.env.BASE_URL}/details/test/sevenday?coinId=${coinId}`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((err) => {
      console.log(err);
    });
  return result;
}

async function oneDayCoinDetails(coinId: string) {
  const requestOptions = getGetRequestOption();
  const result = await fetch(
    `${process.env.BASE_URL}/details/test/oneday?coinId=${coinId}`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((err) => {
      console.log(err);
    });
  return result;
}
async function thirtyDayCoinDetails(coinId: string) {
  const requestOptions = getGetRequestOption();
  const result = await fetch(
    `${process.env.BASE_URL}/details/test/thirtyday?coinId=${coinId}`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((err) => {
      console.log(err);
    });
  return result;
}

const details = {
  userDetails,
  coinDetails,
  sevenDayCoinDetails,
  thirtyDayCoinDetails,
  oneDayCoinDetails,
};
export default details;
