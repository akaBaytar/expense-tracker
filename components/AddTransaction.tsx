'use client';
import { Fragment, useRef } from 'react';
import { toast } from 'react-toastify';

import addTransaction from '@/func/addTransaction';

const AddTransaction = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const clientAction = async (formData: FormData) => {
    const { error } = await addTransaction(formData);

    if (error) {
      toast.error(error);
    } else {
      toast.success('Transaction added your account.');
      formRef.current?.reset();
    }
  };

  return (
    <Fragment>
      <h3>Add Transaction</h3>
      <form action={clientAction} ref={formRef}>
        <div className='form-control'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Transaction name'
            autoComplete='off'
          />
        </div>
        <div className='form-control'>
          <label htmlFor='amount'>Amount</label>
          <input
            type='number'
            name='amount'
            id='amount'
            step='0.01'
            placeholder='Negative value for expenses'
          />
        </div>
        <button className='button'>Add Transaction</button>
      </form>
    </Fragment>
  );
};

export default AddTransaction;
