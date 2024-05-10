import react, { useState } from "react";
import inputSign from "./inputSign";

const SignUp = (props: any) => {
  const SignUpAPI = props.SignUpAPI;
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [pNumber, setPNumber] = useState("");
  const [avatar, setavatar] = useState();

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100">
          Sign Up new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          {inputSign("Username", "text", (e: any) => {
            setUsername(e.target.value);
          })}
          {inputSign("Password", "password", (e: any) => {
            setPassword(e.target.value);
          })}
          {inputSign("Fullname", "text", (e: any) => {
            setFullname(e.target.value);
          })}
          {inputSign("Email", "email", (e: any) => {
            setEmail(e.target.value);
          })}
          {inputSign("Phone number", "text", (e: any) => {
            setPNumber(e.target.value);
          })}
          <div>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                accept="image/*"
                multiple={false}
                className="block w-full text-sm text-slate-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-emerald-50 file:text-emerald-700
                      hover:file:bg-emerald-100
                    "
                onChange={(e: any) => {
                  setavatar(e.target.value);
                }}
              />
            </label>
          </div>

          <div>
            <button
              id="SignUp"
              className="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              onClick={() => {
                SignUpAPI(
                  fullname,
                  username,
                  password,
                  email,
                  pNumber,
                  avatar
                );
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
