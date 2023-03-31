import { Breed } from "../models/Breed";
import CountryFlag from "./countryflag";

export default function KittyStatsCard({ cat }: { cat: Breed }) {
  return (
    <>
      <div key={cat.id} className="p-2">
        <div className="p-2 outline outline-1 outline-yellow-100 bg-yellow-300 rounded-xl drop-shadow-md">
          <div className="rounded-md p-2 bg-gradient-to-b from-slate-100 to-slate-400 outline outline-1 outline-gray-300 drop-shadow-lg text-stone-900 h-80">
            <div className="grid grid-cols-3 p-4 outline outline-1 rounded-md">
              <div className="flex flex-1 w-40 justify-between mr-4">
                <span className="font-bold">Life Span</span>
                <span>{cat.life_span}yrs</span>
              </div>
              <div className="flex flex-1 w-40 justify-between mr-4">
                <span className="font-bold">Adaptability</span>
                <span>{cat.adaptability}</span>
              </div>
              <div className="flex flex-1 w-40 justify-between mr-4">
                <span className="font-bold">Affection Level</span>
                <span>{cat.affection_level}</span>
              </div>
              <div className="flex flex-1 w-40 justify-between mr-4">
                <span className="font-bold">Child Friendly</span>
                <span>{cat.child_friendly}</span>
              </div>
              <div className="flex flex-1 w-40 justify-between mr-4">
                <span className="font-bold">Shedding Level</span>
                <span>{cat.shedding_level}</span>
              </div>
              <div className="flex flex-1 w-40 justify-between mr-4">
                <span className="font-bold">Intelligence</span>
                <span>{cat.intelligence}</span>
              </div>
              <div className="flex flex-1 w-40 justify-between mr-4">
                <span className="font-bold">Health Issues</span>
                <span>{cat.health_issues}</span>
              </div>
              <div className="flex flex-1 w-40 justify-between mr-4">
                <span className="font-bold">Social Needs</span>
                <span>{cat.social_needs}</span>
              </div>
              <div className="flex flex-1 w-40 justify-between mr-4">
                <span className="font-bold">Stranger Friendly</span>
                <span>{cat.stranger_friendly}</span>
              </div>
            </div>
            <div className="col-span-3 mt-2 p-4 font-semibold text-md outline outline-1 rounded-md">
              <div className="mb-2 font-extrabold">{cat.temperament}</div>
              <div>"{cat.description}"</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
