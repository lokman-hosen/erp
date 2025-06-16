import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import SvgIcon from "@/components/SvgIcon";
import { useRouter } from "next/router";
import { removeEmptyKeys } from "@/utils/utils";
import Image from "next/image";
import MagnifyingGlass from "@/components/pages/home/assets/MagnifyingGlass.svg";
import { QUIZ_ANSWER_LOCAL_STORAGE_KEY } from "@/utils/quiz";

export default function SearchPopup({ showModal, setShowModal }) {
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

    if (params['city'] === '') {
      return alert('Please enter a post code, city or state')
    }

    localStorage.removeItem(QUIZ_ANSWER_LOCAL_STORAGE_KEY);

    setQueryParams(params);
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="explore-main-popup-wrapper medium-width-popup explore-popup-main">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div className="search-popup-inner">
              <h1 className="headline-medium">
                More than 100,000 communities available in our database!
              </h1>
              <p className="body-regular">
                Explore the preferable communities for your loved ones nearby
              </p>
              <form onSubmit={handleSearch}>
                <div className="search-Bar flex-div-single">
                  <input
                    autoFocus
                    className="body-small"
                    type="text"
                    placeholder="Search by city, post code, or community name"
                    ref={searchTextRef}
                    onChange={handleSearchText}
                  />
                  <button
                    type="submit"
                    className="search-bar-btn primary-short-btn"
                  >
                    <SvgIcon name="MagnifyingGlass" className={""} />
                    Explore Now
                  </button>
                </div>
              </form>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}
