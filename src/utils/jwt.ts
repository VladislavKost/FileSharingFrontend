import { getUnixTime } from "./date";

export interface IAuthTokenInfo {
  exp: number;
  iat: number;
  login: string;
}

const LIFE_TIME_TO_UPDATE_MULTIPLIER = 0.5;

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) {
    return true;
  }

  try {
    const tokenInfo = token.split(".")[1];
    const tokenInfoDecoded = window.atob(tokenInfo);
    const { exp, iat }: IAuthTokenInfo = JSON.parse(tokenInfoDecoded);
    console.log("exp", exp);
    console.log("iat", iat);
    console.log("minus", exp - iat);

    const tokenLeftTime = exp - getUnixTime();
    const minLifeTimeForUpdate = (exp - iat) * LIFE_TIME_TO_UPDATE_MULTIPLIER;
    console.log(tokenLeftTime < minLifeTimeForUpdate);
    console.log("tokenLeftTime", tokenLeftTime);
    console.log("minLifeTimeForUpdate", minLifeTimeForUpdate);
    return tokenLeftTime < minLifeTimeForUpdate;
  } catch (e) {
    console.error(e);
    return true;
  }
};
