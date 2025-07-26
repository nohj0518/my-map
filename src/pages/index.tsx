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
  const [currentStore, setCurrentStore] = useState<StoreType | null>(null);
  return (
    <>
      <Map setMap={setMap} />
      <Markers stores={stores} map={map} setCurrentStore={setCurrentStore} />
      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);
  let stores = [];
  if (res.ok) {
    stores = await res.json();
  } else {
    // 에러 로그를 남기고, 빈 배열 반환
    console.error("Failed to fetch stores:", await res.text());
  }
  return {
    props: { stores },
    revalidate: 60 * 60, // 1시간 마다 업데이트
  };
}
