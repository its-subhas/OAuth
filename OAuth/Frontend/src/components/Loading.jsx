const Loading = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="flex flex-col items-center">
        {/* Logo / Loader */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Outer spinning ring */}
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />

          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-white border-r-white animate-spin" />

          {/* Center */}
          <div className="w-11 h-11 rounded-xl bg-white text-black flex items-center justify-center font-bold text-xl shadow-lg">
            S
          </div>
        </div>

        {/* Text */}
        <h1 className="mt-7 text-lg font-semibold tracking-wide">
          Loading
          <span className="inline-flex ml-1">
            <span className="animate-bounce [animation-delay:0ms]">.</span>
            <span className="animate-bounce [animation-delay:150ms]">.</span>
            <span className="animate-bounce [animation-delay:300ms]">.</span>
          </span>
        </h1>

        <p className="mt-2 text-sm text-slate-500">Please wait a moment</p>

        {/* Progress line */}
        <div className="w-48 h-1 bg-white/10 rounded-full mt-7 overflow-hidden">
          <div className="h-full w-1/2 bg-white rounded-full animate-[loading_1.5s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Custom animation */}
      <style>
        {`
          @keyframes loading {
            0% {
              transform: translateX(-100%);
            }
            50% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(250%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
