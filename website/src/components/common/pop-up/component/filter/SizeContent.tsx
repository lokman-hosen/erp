import React from "react";
import CheckBoxBtnSubText from "@/components/common/pop-up/component/CheckBoxBtnSubText";
import RedioCheckBtn from "../RedioCheckBtn";
export default function SizeContent({
  onChangeRadioButton,
  queryParam,
  queryString,
}: any) {
  const sizes: any = [
    {
      id: 1,
      size: "small",
      label:"Small"
    },
    {
      id: 2,
      size: "medium",
      label:"Medium"
    },
    {
      id: 3,
      size: "large",
      label:"Large"
    },
  ];
  const _sizes = queryParam[queryString]?.split(",");
  const sizeFromUrl = queryParam[queryString];

  return (
    <div className="step-wrapper">
      {sizes?.map((size: any) => {
        return (
          <RedioCheckBtn
            checked={sizeFromUrl == size?.size}
            label={size?.label}
            value={size?.size}
            queryParam={queryParam}
            queryString={queryString}
            onChange={(value: any, isChecked: any) => {
              onChangeRadioButton({ isChecked, key: "size", value });
            }}
          />
        );
        // return (
        //   <CheckBoxBtnSubText
        //     key={size.id}
        //     label={size.size}
        //     value={size.size}
        //     checked={_sizes?.includes(size.size)}
        //     queryParam={queryParam}
        //     queryString={queryString}
        //     onChangeCheckbox={(value: any, isChecked: any) => {
        //       onChangeCheckbox({ isChecked, key: "size", value });
        //     }}
        //   />
        // );
      })}
    </div>
  );
}
