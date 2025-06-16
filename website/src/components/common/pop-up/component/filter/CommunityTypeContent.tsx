import SvgIcon from "@/components/SvgIcon";
import React from "react";
import Link from "next/link";
import RedioCheckBtn from "@/components/common/pop-up/component/RedioCheckBtn";
import Ratings_empty from "@/components/assets/Ratings_empty.svg";
import CheckBoxBtnSubText from "@/components/common/pop-up/component/CheckBoxBtnSubText";

export default function CommunityTypeContent({
  onChangeCheckbox,
  queryParam,
  queryString,
}: any) {
  const communityType = [
    {
      id: 1,
      name: "Assisted Living",
      value: "assisted-living",
    },
    {
      id: 2,
      name: "Memory Care",
      value: "memory-care",
    },
    {
      id: 3,
      name: "Independent Living",
      value: "independent-living",
    },
    {
      id: 4,
      name: "Residential Care Home",
      value: "residential-care-home",
    },
    {
      id: 5,
      name: "Nursing Home",
      value: "nursing-home",
    },
  ];
  const sizes = queryParam[queryString]?.split(",");

  return (
    <div className="step-wrapper">
      {communityType.map((item: any) => {
        return (
          <RedioCheckBtn
            checked={sizes?.includes(item.name)}
            label={item.name}
            value={item.name}
            queryParam={queryParam}
            queryString={queryString}
            onChange={(value: any, isChecked: any) => {
              onChangeCheckbox({ isChecked, key: queryString, value });
            }}
          />
        );
      })}
    </div>
  );
}
