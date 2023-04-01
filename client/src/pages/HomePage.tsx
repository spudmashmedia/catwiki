import { ChangeEvent, useState, useEffect } from "react";
import { useDebounce } from "usehooks-ts";
import Banner from "../components/common/banner";
import {
  useGetBreedsQuery,
  useSearchBreedQuery,
  useGetTopTenViewedBreedsQuery,
  useLogBreedClickMutation,
} from "../app/services/api";
import Searchbox from "../components/searchbox";
import { Breed } from "../models/Breed";
import { Link } from "react-router-dom";
import KittyCard from "../components/kittycard";
import Stats from "../components/stats";
import { BreedStatRequest, BreedStatResponse } from "../models/BreedStat";

export default function HomePage(props: any) {
  const [searchText, setSearchText] = useState("");
  const getBreedQueryHook = useGetBreedsQuery("");
  const searchResultQueryHook = useSearchBreedQuery(searchText);
  const getTopTenViewedBreedsQuery = useGetTopTenViewedBreedsQuery("");
  const [logBreedClick, response] = useLogBreedClickMutation();

  const [searchResults, setSearchResults] = useState<Breed[]>([]);

  const debounceValue = useDebounce<string>(searchText, 500);

  function textChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  function clearButtonHandler() {
    setSearchText("");
  }

  function logInteraction(cat: Breed) {
    let request: BreedStatRequest = {
      id: cat.id,
      name: cat.name,
    };

    logBreedClick(request);
  }

  // Page Load useEffect
  useEffect(() => {
    // reload the top 10 on page load
    getTopTenViewedBreedsQuery.refetch();
  }, []);

  // will fire off during first load all breeds
  useEffect(() => {
    if (!getBreedQueryHook.isLoading) {
      setSearchResults(getBreedQueryHook.data);
    }
  }, [getBreedQueryHook]);

  useEffect(() => {
    // When the searchbox is clear, show all results
    if (searchText == "") {
      setSearchResults(getBreedQueryHook.data);
    } else {
      //otherwise filter
      setSearchResults(searchResultQueryHook.data);
    }
  }, [debounceValue]);

  return (
    <>
      <div className="grid grid-cols-1 items-center place-items-center lg:grid-cols-2 auto-cols-max">
        <div className="flex flex-col place-content-center items-center mt-6 mb-10">
          <Banner className="mb-8" />
          <Searchbox
            q={searchText}
            textChangeHandler={textChangeHandler}
            clearButtonHandler={clearButtonHandler}
          />
        </div>
        {getTopTenViewedBreedsQuery.isLoading ? (
          <>Loading...</>
        ) : (
          <Stats
            title="Top 10 Viewed Breeds"
            data={getTopTenViewedBreedsQuery?.data}
          />
        )}
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {searchResults?.map((item: Breed) => (
            <Link
              key={item.id}
              to={`details/${item.id}`}
              onClick={() => logInteraction(item)}
            >
              <KittyCard cat={item} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
