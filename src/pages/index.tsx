/*global kakao*/

import Map from "@/components/Map";
import Markers from "@/components/Markers";

import { useState } from "react";
import StoreBox from "@/components/StoreBox";
import { StoreType } from "@/interface";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Home({ stores }: { stores: StoreType[] }) {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  return (
    <>
      <Map setMap={setMap} />
      <Markers stores={stores} map={map} setCurrentStore={setCurrentStore} />
      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </>
  );
}

export async function getStaticProps() {
  const stores = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
  ).then((res) => res.json());
  return {
    props: { stores },
    revalidate: 60 * 60, // 1시간 마다 업데이트
  };
}
