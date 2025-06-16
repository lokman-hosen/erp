import SvgIcon from "@/components/SvgIcon";
import Select from "react-select";
import React from "react";
import Link from "next/link";

export default function FilterPopupFooter({
  onClickClear,
  applyQueryParamToSearch,
  filterBy,
}: any) {
  return (
    <div className="filter-footer-wrap flex-justify-Div">
      <button
        className="primary-text-btn"
        onClick={() => {
          onClickClear({ type: filterBy });
        }}
      >
        Clear
      </button>
      <button className="primary-short-btn" onClick={applyQueryParamToSearch}>
        Apply
      </button>
    </div>
  );
}
