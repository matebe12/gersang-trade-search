import { trade } from './index';

async function searchTradeKeyword(data) {
  return await trade.get(`/search/${data.inputData}`);
}

async function searchTrade(data) {
  return await trade.get(`/${data.server}/${data.inputData}?type=${data.type}`);
}

export { searchTrade, searchTradeKeyword };
