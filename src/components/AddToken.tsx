import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useEffect } from 'react';
import {useForm} from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

interface Props {
  addToken: Function;
}

const AddToken = (props: Props) => {
  const { chainId } = useWeb3React<Web3Provider>();

  const {register, handleSubmit, setValue} = useForm();

  useEffect(() => {
    setValue("chainId", `${chainId}`);
    setValue("id", `${uuidv4()}`);
  });

  // TODO: Warn about supported networks?

  return (
    
    <form onSubmit={handleSubmit(data => props.addToken(data))} className="wallet-info">
      <h2>
        Add new token
      </h2>
      <p> Token Address <input {...register("address")} placeholder='Token Address'/> </p>
      <p> Token Name <input placeholder='Token Name' {...register("name")} /> </p>
      <input type="hidden" {...register("chainId")} />
      <input type="hidden" {...register("id")} />
      <button>Add Token</button>
    </form>
  );
};

export default AddToken;
