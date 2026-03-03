import React from "react";

function banner({
  text1,
  text2,
  text3,
}: {
  text1: string;
  text2: string;
  text3: string;
}) {
  return (
    <section className="bg-pink-600 h-auto pt-10 pb-6 pattern text-center">
      <h1 className="heading">{text1}</h1>
      {text2 && (
        <div className="flex justify-center">
          <p className=" bg-amber-300 text-center pb-1 px-3 inline-block w-fit rounded p-2 border-2 to-black">
            {text2}
          </p>
        </div>
      )}
      <div>
        <p className="text-amber-50 m-2">{text3}</p>
      </div>
    </section>
  );
} 

export default banner;
