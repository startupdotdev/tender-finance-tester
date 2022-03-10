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
  const {register, handleSubmit, setValue, formState: {errors}, reset} = useForm();

  useEffect(() => {
    setValue("chainId", `${chainId}`);
    setValue("id", `${uuidv4()}`);
  });

  // TODO: Warn about supported networks?

  return (
    
    <form onSubmit={handleSubmit(data => {
      props.addToken(data);
      reset();
    })} className="box">
      <h2>
        Add new token
      </h2>
      <div className='field'>  
        <div className="label">Token Address </div>
        <input {...register("address", {required: true})} placeholder='Token Address'/> 
        <div className="error-text">
          {errors.address?.type === 'required' && <p>Token Address is required</p>}
        </div>
      </div>

      <div className="field"> 
        <div className="label">
          Token Name
        </div> 
        <input placeholder='Token Name' {...register("name", {required: true})} /> 
        <div className="error-text">
          {errors.name?.type ==='required' && <p>Token Name is required</p>}
        </div>
      </div>

    <div className="field">
      <div className='label'>
        Underlying token address
      </div>
      <input placeholder='Underlying token (required for cTokens)' {...register("underlyingAssetAddress")} /> 
      <div className="small-text">Required for cTokens. Leave blank for ETH.</div>
    </div>

      <input type="hidden" {...register("chainId")} />
      <input type="hidden" {...register("id")} />
      <button>Add Token</button>
    </form>
  );
};

export default AddToken;
