import { satong } from './index';

async function getSatongList(data) {
  return satong.get(
    `${data.server}?type=${data.type}&filter=${data.inputData}&offset=0`,
  );
}
export { getSatongList };
