/*global kakao*/
import Link from "next/link";

import Script from "next/script";
import Map from "@/components/Map";
import Markers from "@/components/Markers";

import * as stores from "@/data/store_data.json";
import { useState } from "react";
import StoreBox from "@/components/StoreBox";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Home() {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  const storeDatas = stores["DATA"];
  return (
    <>
      <Map setMap={setMap} />
      <Markers
        storeDatas={storeDatas}
        map={map}
        setCurrentStore={setCurrentStore}
      />
      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </>
  );
}
