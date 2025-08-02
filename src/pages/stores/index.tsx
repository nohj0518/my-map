import React, { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { StoreApiResponse, StoreType } from "@/interface";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import Loader from "@/components/Loader";

export default function StoreListPage() {
  const router = useRouter();
  const { page = "1" }: any = router.query;
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;

  const fetchStores = async ({ pageParam = 1 }) => {
    const { data: stores } = await axios.get(`/api/stores`, {
      params: {
        limit: 10,
        page: pageParam,
      },
    });
    return stores as StoreApiResponse;
  };

  const {
    data: stores,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["stores"],
    queryFn: fetchStores,
    getNextPageParam: (lastPage: StoreApiResponse) =>
      lastPage.data?.length > 0 ? (lastPage?.page || 0) + 1 : undefined,
    initialPageParam: 1,
  });

  const fetchNext = async () => {
    if (isPageEnd && hasNextPage) {
      const result = await fetchNextPage();
      if (result.isError) {
        console.log(result.error);
      }
    }
  };
  useEffect(() => {
    let timeId: NodeJS.Timeout | undefined;
    if (isPageEnd && hasNextPage) {
      timeId = setTimeout(() => {
        fetchNext();
      }, 10);
    }
    return () => clearTimeout(timeId);
  }, [isPageEnd, hasNextPage, fetchNext]);

  if (isError) {
    return (
      <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
        다시 시도해주세요
      </div>
    );
  }

  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <ul role="list" className="divide-y divide-gray-100">
        {isLoading ? (
          <Loading />
        ) : (
          stores?.pages?.map((page: StoreApiResponse, index: number) => (
            <React.Fragment key={index}>
              {page?.data?.map((store: StoreType, index: number) => (
                <li className="flex justify-between gap-x-6 py-5" key={index}>
                  <div className="flex gap-x-4">
                    <Image
                      src={
                        store?.category
                          ? `/images/markers/${store?.category}.png`
                          : "/images/markers/default.png"
                      }
                      width={48}
                      height={48}
                      alt="아이콘 이미지"
                    />
                    <div>
                      <div className="text-sm font-semibold leading-6 text-gray-900">
                        {store?.name}
                      </div>
                      <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                        {store?.storeType}
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <div className="text-sm font-semibold leading-6 text-gray-900">
                      {store?.address}
                    </div>
                    <div className="mt-1 text-xs truncate font-semibold leading-5 text-gray-500">
                      {store?.phone || "번호없음"} | {store?.foodCertifyName} |{" "}
                      {store.category}
                    </div>
                  </div>
                </li>
              ))}
            </React.Fragment>
          ))
        )}
      </ul>
      {(hasNextPage || isFetchingNextPage || isFetching) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </div>
  );
}
