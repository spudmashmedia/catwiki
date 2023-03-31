import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetBreedByIdQuery,
  useGetImagesByBreedIdQuery,
} from "../app/services/api";

export default function DetailsPage(props: any) {
  const { breed_id } = useParams();
  const navigate = useNavigate();

  const getBreedQueryHook = useGetBreedByIdQuery(breed_id ? breed_id : "");
  const getImageQueryHook = useGetImagesByBreedIdQuery(
    breed_id ? breed_id : ""
  );

  return (
    <>
      <button onClick={() => navigate(-1)}>
        <span className="font-extrabold text-2xl pr-2">←</span>
        <span className="font-extrabold text-2xl">BACK</span>
      </button>

      <div className="mb-4">
        {getImageQueryHook.isLoading ? (
          <>Loading...</>
        ) : (
          getImageQueryHook.data.map((x: any) => <img key={x.id} src={x.url} />)
        )}
      </div>
      <div>
        {getBreedQueryHook.isLoading ? (
          <>Loading...</>
        ) : (
          JSON.stringify(getBreedQueryHook.data)
        )}
      </div>
    </>
  );
}
