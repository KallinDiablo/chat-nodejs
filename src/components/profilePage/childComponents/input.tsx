const Input = (props:any) => {
  return (
    <>
      <div className="mb-5">
        <label
          htmlFor={props.id}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {props.name}
        </label>
        <input
          type= {props.id}
          id={props.id}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder= {props.value}
          onChange={props.function}
        />
      </div>
    </>
  );
};
export default Input;
