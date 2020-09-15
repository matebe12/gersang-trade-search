import { trade } from './index';

async function getTradeKeyword(data) {
  return await trade.get(`/search/${data.inputData}`);
}

async function getTradeList(data) {
  try {
    if (data.type == 1) {
      return await trade.get(
        `/${data.server}/${data.inputData}?type=${data.type}`,
      );
    } else if (data.type == 2) {
      let userTrade = {};
      userTrade.item = await trade.get(
        `/${data.server}/${data.inputData}?type=${data.type}`,
      );
      userTrade.merc = await trade.get(
        `/merc/${data.server}/${data.inputData}?type=${data.type}`,
      );
      console.log(userTrade);
      return userTrade;
    } else {
      return await trade.get(
        `/merc/${data.server}/${data.inputData}?type=${data.type}`,
      );
    }
  } catch (error) {
    alert(error);
  }
}
async function getTradeListAvg(data) {
  return await trade.get(
    `/v2/${data.server}/${data.inputData}?type=${data.type}`,
  );
}

export { getTradeList, getTradeKeyword, getTradeListAvg };
