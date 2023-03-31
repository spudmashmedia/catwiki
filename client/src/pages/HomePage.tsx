import React, { ChangeEvent, useState, useEffect } from "react";
import { useDebounce } from "usehooks-ts";
import Banner from "../components/common/banner";
import { useGetBreedsQuery, useSearchBreedQuery } from "../app/services/api";
import Searchbox from "../components/searchbox";
import { Breed } from "../models/Breed";
import { Link } from "react-router-dom";

export default function HomePage(props: any) {
  const [searchText, setSearchText] = useState("");
  const getBreedQueryHook = useGetBreedsQuery("");
  const searchResultQueryHook = useSearchBreedQuery(searchText);

  const [searchResults, setSearchResults] = useState<Breed[]>([]);

  const debounceValue = useDebounce<string>(searchText, 500);

  function textChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  function clearButtonHandler() {
    setSearchText("");
  }

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
      <div className="flex flex-col place-content-center items-center  mt-6 mb-10">
        <Banner className="mb-8" />

        <Searchbox
          q={searchText}
          textChangeHandler={textChangeHandler}
          clearButtonHandler={clearButtonHandler}
        />
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {searchResults?.map((item: Breed) => (
            <Link key={item.id} to={`details/${item.id}`}>
              <div>{item.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
