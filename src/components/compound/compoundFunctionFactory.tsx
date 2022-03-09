import {useForm} from "react-hook-form";

const CompoundFunctionFactory = (props: { name: string, fn: Function}) => {

  const {register, handleSubmit} = useForm();

  // TODO: reset data after successful submit

  return (
    <form onSubmit={handleSubmit(data => props.fn(data.token, data.value))}>
    <h3>
       {props.name} 
    </h3>
    <div>
        Amount:
        <input {...register("amount")} value="9" />
    </div>
    <div>
        <input type="submit" />
    </div>
    </form>
  );
};

export default CompoundFunctionFactory;
