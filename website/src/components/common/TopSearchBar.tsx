import Image from "next/image";
import MagnifyingGlass from "./header/assets/MagnifyingGlass.svg";
import SearchPopup from "@/components/common/pop-up/search-popup";
import React, { useRef, useState } from "react";
import { reactQueryKeys } from "@/services/reactQueryKeys";
import { useQuery } from "react-query";
import { get } from "@/services/api/api";
import { useRouter } from "next/router";
import { removeEmptyKeys } from "@/utils/utils";
import { QUIZ_ANSWER_LOCAL_STORAGE_KEY } from "@/utils/quiz";
import { PAGE_SEARCH_RESULT } from "@/config/constants";

export default function TopSearchBar() {
  const searchTextRef: any = useRef<HTMLInputElement>(null);
  const route = useRouter();
  const query = route.query;
  let queryParam = removeEmptyKeys(query);

  const queryStr = new URLSearchParams(queryParam).toString();

  const handleSearchText = (e: any) => {
    const searchText = e.target.value;
  };

  const setQueryParams = (params: any) => {
    //add params to route
    const query = { ...route.query };
    route.push(
      {
        pathname: "/search-result",
        query: { ...query, ...params },
      },
      undefined,
      { shallow: false }
    );
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    const params: any = { ...route.query };
    params["city"] = searchTextRef?.current?.value; // searchTextRef?.current?.value;
    
    if(params['city'] === ''){
      return alert('Please enter a post code, city or state')
    }

    localStorage.removeItem(QUIZ_ANSWER_LOCAL_STORAGE_KEY);

    setQueryParams(params);

    if(route?.pathname === PAGE_SEARCH_RESULT){
      searchTextRef.current.value = ""
      return
      window.location.reload()
    }else{
      return
    }
  };

  return (
    <>
      <div className="topSearchBarWrap">
        <div className="topSearchBar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              ref={searchTextRef}
              placeholder="search by postcode, city, or state"
              onChange={handleSearchText}
            />
            <button className="topSearchBarBtn" type="submit">
              <Image
                className="MagnifyingGlass"
                priority
                src={MagnifyingGlass}
                alt=""
              />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
