import React from "react";
import RedioCheckBtn from "@/components/common/pop-up/component/RedioCheckBtn";

export default function PriceContent({
  onChangeRadioButton,
  queryParam,
  queryString,
}: any) {
  const priceFromUrl = queryParam[queryString];

  const checked = false;

  const prices = [
    {
      id: 1,
      price: 2000,
      label: 'Up to $2,000'
    },
    {
      id: 2,
      price: 2500,
      label: 'Up to $2,500'
    },
    {
      id: 3,
      price: 3000,
      label: 'Up to $3,000'
    },
    {
      id: 4,
      price: 3500,
      label: 'Up to $3,500'
    },
    {
      id: 5,
      price: 4000,
      label: 'Up to $4,000'
    },
    {
      id: 6,
      price: 4500,
      label: 'Up to $4,500'
    },
    {
      id: 7,
      price: 5000,
      label: 'Up to $5,000'
    },
    {
      id: 30,
      price: 99999,
      label: 'More than $5,000'
    },
  ];

  return (
    <div className="step-wrapper">
      {prices?.map((price: any) => {
        return (
          <RedioCheckBtn
            checked={priceFromUrl == price.price}
            label={`${price.label}`}
            value={price.price}
            queryParam={queryParam}
            queryString={queryString}
            onChange={(value: any, isChecked: any) => {
              onChangeRadioButton({ isChecked, key: "price", value });
            }}
          />
        );
      })}
    </div>
  );
}
