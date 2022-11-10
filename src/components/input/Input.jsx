import './input.css';

export const Input = ({type, inputName, inputClassName, inputPlaceholder, inputValue})=>{
  return(
    <>
      <input type={type} name={inputName} className={inputClassName} placeholder={inputPlaceholder} />
    </>
  );
};