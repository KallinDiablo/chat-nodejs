function inputSign(name: string, type: string, input: any) {
  return (
    <>
      <div>
        <label
          htmlFor="text"
          className="block mb-2 text-sm font-medium text-gray-100"
        >
          {name}
        </label>
        <div className="mt-2">
          <input
            id={name}
            name={name}
            type={type}
            required
            onChange={input}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
      </div>
    </>
  );
}
export default inputSign;
