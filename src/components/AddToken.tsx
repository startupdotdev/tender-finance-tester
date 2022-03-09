import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useEffect } from 'react';
import {useForm} from "react-hook-form";

interface Props {
  addToken: Function;
}

const AddToken = (props: Props) => {
  const { chainId } = useWeb3React<Web3Provider>();

  const {register, handleSubmit, setValue} = useForm();

  useEffect(() => {
    setValue("chainId", `${chainId}`);
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
      <button>Add Token</button>
    </form>
  );
};

export default AddToken;
