
const Loader = () => {
  return (
    <div className='h-full w-full grid place-items-center'>
      <svg width="50" height="50" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" stroke="blue" strokeWidth="4">
          <animate
            attributeName="stroke-dashoffset"
            dur="2s"
            repeatCount="indefinite"
            from="0"
            to="502"
          />
          <animate
            attributeName="stroke-dasharray"
            dur="2s"
            repeatCount="indefinite"
            values="150.6 100.4;1 250;150.6 100.4"
          />
        </circle>
      </svg>
    </div>
  );
}

export default Loader;
