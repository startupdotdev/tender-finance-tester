import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useEffect } from 'react';
import {useForm} from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

interface Props {
  addToken: Function;
}

const AddToken = (props: Props) => {
  const { chainId } = useWeb3React<Web3Provider>();

  const {register, handleSubmit, setValue, formState: {errors}, reset} = useForm();

  useEffect(() => {
    setValue("chainId", `${chainId}`);
    setValue("id", `${uuidv4()}`);
  });

  // TODO: Warn about supported networks?

  return (
    
    <form onSubmit={handleSubmit(data => {
      props.addToken(data);
      toast("New token added!");
      reset();
    })} className="wallet-info">
      <h2>
        Add new token
      </h2>
      <p> Token Address <input {...register("address", {required: true})} placeholder='Token Address'/> </p>
      {errors.address?.type === 'required' && <p style={{color: 'red'}}>Token Address is required</p>}

      <p> Token Name <input placeholder='Token Name' {...register("name", {required: true})} /> </p>
      {errors.name?.type ==='required' && <p style={{color: 'red'}}>Token Name is required</p>}

      <input type="hidden" {...register("chainId")} />
      <input type="hidden" {...register("id")} />
      <button>Add Token</button>
    </form>
  );
};

export default AddToken;
