import { trade } from './index';

async function getTradeKeyword(data) {
  return await trade.get(`/search/${data.inputData}`);
}

async function getTradeList(data) {
  return data.type == 1
    ? await trade.get(`/${data.server}/${data.inputData}?type=${data.type}`)
    : await trade.get(
        `/merc/${data.server}/${data.inputData}?type=${data.type}`,
      );
}
async function getTradeListAvg(data) {
  return await trade.get(
    `/v2/${data.server}/${data.inputData}?type=${data.type}`,
  );
}

export { getTradeList, getTradeKeyword, getTradeListAvg };
