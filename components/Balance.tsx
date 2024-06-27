import getBalance from '@/func/getBalance';

import { addComma } from '@/util/addComma';

const Balance = async () => {
  const { balance } = await getBalance();

  return (
    <>
      <h4>Your Balance</h4>
      <h1>₺{addComma(balance ?? 0)}</h1>
    </>
  );
};

export default Balance;
