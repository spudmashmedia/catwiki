import { BreedStatResponse } from "../models/BreedStat";
import { Link } from "react-router-dom";
import Logo from "./logo";

export default function Stats({
  title,
  data,
}: {
  title: string;
  data?: BreedStatResponse[];
}) {
  const sortDesc = (a: BreedStatResponse, b: BreedStatResponse) =>
    b.count - a.count;

  data = data
    ?.filter((item): item is BreedStatResponse => !!item)
    .sort(sortDesc);

  return (
    <>
      <div className="container h-64 w-96 p-4 ml-8 mr-8 mb-8 flex flex-col outline outline-3 outline-black rounded-md bg-white">
        <div className="font-extrabold text-xl text-black">{title}</div>
        {!data || data.length === 0 ? (
          <>
            <div>Search or Select a breed below</div>
            <div className="flex flex-row place-content-center">
              <Logo className="w-32 h-32 mt-6 mr-4" />
            </div>
          </>
        ) : (
          <ol className="list-decimal grid grid-rows-5 grid-flow-col">
            {data?.map((item, index) => (
              <li key={item.id} className="flex flex-1 p-2">
                <Link to={`/details/${item.id}`}>
                  <span className="w-6">{index + 1}. </span>
                  <span className="text-sm mr-4">{item.name}</span>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
}
