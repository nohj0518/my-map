/*global kakao*/
import Link from "next/link";

import Script from "next/script";
import Map from "@/components/Map";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Home() {
  return (
    <>
      <Map />
    </>
  );
}
