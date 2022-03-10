import {useForm} from "react-hook-form";

const CompoundFunctionFactory = (props: { name: string, fn: Function}) => {

  const {register, handleSubmit, formState: {errors}} = useForm();

  // TODO: reset data after successful submit

  return (
    <form onSubmit={handleSubmit(data => props.fn(data.amount))}>
    <h3>
       {props.name} 
    </h3>
    <div className="field">
        <div className="label">
          Amount:
        </div>
        <input {...register("amount", {required: true})} />
        <div className="error-text">
          {errors.name?.type ==='required' && <p>Amount is required</p>}
        </div>
    </div>
    <div>
        <input type="submit" />
    </div>
    <hr style={{margin: "2rem 0" }}/>
    </form>
  );
};

export default CompoundFunctionFactory;
