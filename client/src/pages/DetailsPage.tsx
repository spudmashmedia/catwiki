import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetBreedByIdQuery,
  useGetImagesByBreedIdQuery,
} from "../app/services/api";
import KittyCard from "../components/kittycard";

import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  EffectCoverflow,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import KittyStatsCard from "../components/kittystatscard";

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
      <div className="mt-4">
        {getImageQueryHook.isLoading ? (
          <>Loading...</>
        ) : (
          <Swiper
            // effect={"coverflow"}
            spaceBetween={10}
            slidesPerView={3}
            onSlideChange={() => console.log("test: slide transition")}
            onSwiper={(swiper) => console.log(swiper)}
            cssMode={true}
            navigation={true}
            pagination={true}
            loop={true}
            mousewheel={true}
            keyboard={true}
            // coverflowEffect={{
            //   rotate: 50,
            //   stretch: 0,
            //   depth: 100,
            //   modifier: 1,
            //   slideShadows: true,
            // }}
            modules={[
              Navigation,
              Pagination,
              Mousewheel,
              Keyboard,
              EffectCoverflow,
            ]}
            className="h-80"
          >
            {getImageQueryHook.data.map((x: any) => (
              <SwiperSlide key={x.id} className="rounded-md drop-shadow-md">
                <img src={x.url} className="rounded-md cover-flow h-60" />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="flex place-content-end">
          {getBreedQueryHook.isLoading ? (
            <>Loading...</>
          ) : (
            <KittyCard cat={getBreedQueryHook.data} />
          )}
        </div>
        <div className="col-span-2 h-96">
          {getBreedQueryHook.isLoading ? (
            <>Loading...</>
          ) : (
            <KittyStatsCard cat={getBreedQueryHook.data} />
          )}
        </div>
      </div>
    </>
  );
}
