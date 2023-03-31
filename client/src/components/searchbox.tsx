export default function Searchbox({
  q,
  textChangeHandler,
  clearButtonHandler,
}: {
  q: string;
  textChangeHandler: any;
  clearButtonHandler: any;
}) {
  return (
    <div className="flex w-full place-content-center">
      <input
        type="text"
        value={q}
        onChange={textChangeHandler}
        className="h-16 pl-4 text-2xl rounded-md outline outlien-black font-bold"
      />
      <button 
        type="button" 
        onClick={clearButtonHandler} 
        className="ml-8 font-extrabold text-2xl">
          Clear
        </button>
    </div>
  );
}
