import { Breed } from "../models/Breed";
import CountryFlag from "./countryflag";

export default function KittyCard({ cat }: { cat: Breed }) {
  return (
    <>
      <div key={cat.id} className="p-2 w-80">
        <div className="p-2 outline outline-1 outline-yellow-100 bg-yellow-300 rounded-xl drop-shadow-md">
          <div className="rounded-t-md pl-2 pt-2 pb-2 text-xl text-white font-extrabold bg-gradient-to-r from-cyan-500 to-blue-500 drop-shadow-lg">
            🐱 {cat?.name}
          </div>

          <div className="rounded-b-md bg-gradient-to-r from-cyan-500 to-blue-500">
            <img
              src={cat?.image?.url}
              className="object-cover h-48 w-96 rounded-t-lg p-2"
            />
          </div>
          <div className="mt-2 rounded-md p-2 bg-gradient-to-b from-slate-100 to-slate-400 outline outline-1 outline-gray-300 drop-shadow-lg text-stone-900">
            <div className="flex flex-col pl-4 pr-4 pt-2">
              <div className="flex flex-row items-center rounded-md p-2 mb-4 outline outline-1 outline-black text-white bg-slate-700">
                <span className="mr-4">
                  <CountryFlag code={cat?.country_code} />
                </span>
                <span className="font-extrabold text-md">{cat?.origin}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
