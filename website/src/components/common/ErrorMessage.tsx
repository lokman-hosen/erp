// import Image from "next/image";

function ErrorMessage({ text, className }) {
    const divStyle = { width: '100%',
    marginTop: '0.5rem',
    fontSize: '80%',
    color: '#dc3545'}
  return (
    <>
      <div className={className} style={divStyle}>
        {text}
      </div>
    </>
  );
}

export default ErrorMessage;
