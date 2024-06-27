import getBalance from '@/func/getBalance';

const Balance = async () => {
  const { balance } = await getBalance();

  return (
    <>
      <h4>Your Balance</h4>
      <h1>₺{balance ?? 0}</h1>
    </>
  );
};

export default Balance;
