import CheckBoxBtn from "@/components/common/pop-up/component/CheckBoxBtn";
import { get } from "@/services/api/api";
import { API_SEARCH_AMENITIES_DATA } from "@/services/api/endpoints";
import React from "react";
import { useQuery } from "react-query";

export default function AmenitiesContent({
  onChangeCheckbox,
  queryParam,
  queryString,
}: any) {

  const { isLoading, isError, error, data: amenities, isSuccess } = useQuery({
        queryKey: ['SearchAmenities'],
        queryFn: () => get(API_SEARCH_AMENITIES_DATA)
    });


    let amenites: any = {}

  if(isSuccess){
    const data: any = amenities?.data?.map(item => ({
        name: item?.group_name,
        amenity: item?.amenities?.map(I => ({
        id: I?.id,
        name: I?.name,
        icon: I?.icon
      }))
    }));
    amenites = data
  }


  const amenitiesFromUrl = queryParam[queryString]?.split(",");


  return (
    <div className="step-wrapper">
      {Object.keys(amenites).map((key: any, index: any) => {
        return (
          <div className="amenities-item">
            <h2 className="title-medium">{amenites[key]?.name}</h2>
            <div className="amenities-item-inner">
              {amenites[key]?.amenity?.map((item: any) => {
                return (
                  <CheckBoxBtn
                    label={item?.name}
                    checked={amenitiesFromUrl?.includes(`${item?.name}`)}
                    value={item?.name}
                    queryParam={queryParam}
                    queryString={queryString}
                    onChange={(value: any, isChecked: any) => {
                      onChangeCheckbox({ isChecked, key: "amenity", value });
                    }}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
      {/* //{" "} */}
      {/* <div className="amenities-item">
      //   <h2 className="title-medium">Room Amenities</h2>
      //   <div className="amenities-item-inner">
      //     <CheckBoxBtn
      //       label={"Test1"}
      //       value={12}
      //       queryParam={queryParam}
      //       queryString={queryString}
      //       onChange={(value: any, isChecked: any) => {
      //         onChangeCheckbox({ isChecked, key: "amenity", value });
      //       }}
      //     />
      //     <CheckBoxBtn
      //       label={"Test2"}
      //       value={22}
      //       queryParam={queryParam}
      //       queryString={queryString}
      //       onChange={(value: any, isChecked: any) => {
      //         onChangeCheckbox({ isChecked, key: "amenity", value });
      //       }}
      //     />
      //     <CheckBoxBtn
      //       label={"Test3"}
      //       value={13}
      //       queryParam={queryParam}
      //       queryString={queryString}
      //       onChange={(value: any, isChecked: any) => {
      //         onChangeCheckbox({ isChecked, key: "amenity", value });
      //       }}
      //     />
      //     <CheckBoxBtn
      //       label={"Test4"}
      //       value={14}
      //       queryParam={queryParam}
      //       queryString={queryString}
      //       onChange={(value: any, isChecked: any) => {
      //         onChangeCheckbox({ isChecked, key: "amenity", value });
      //       }}
      //     />
      //     <CheckBoxBtn
      //       label={"Test5"}
      //       value={15}
      //       queryParam={queryParam}
      //       queryString={queryString}
      //       onChange={(value: any, isChecked: any) => {
      //         onChangeCheckbox({ isChecked, key: "amenity", value });
      //       }}
      //     />
      //     <CheckBoxBtn
      //       label={"Test6"}
      //       value={16}
      //       queryParam={queryParam}
      //       queryString={queryString}
      //       onChange={(value: any, isChecked: any) => {
      //         onChangeCheckbox({ isChecked, key: "amenity", value });
      //       }}
      //     />
      //   </div>
      // </div>
      // <div className="amenities-item">
      //   <h2 className="title-medium">Community Amenities</h2>
      //   <div className="amenities-item-inner">
      //     <CheckBoxBtn
      //       label={"Test"}
      //       value={110}
      //       queryParam={queryParam}
      //       queryString={queryString}
      //       onChangeheckbox={(value: any, isChecked: any) => {
      //         onChangeCheckbox({ isChecked, key: "amenity", value });
      //       }}
      //     />
      //     <CheckBoxBtn
      //       label={"Test"}
      //       value={17}
      //       queryParam={queryParam}
      //       queryString={queryString}
      //       onChange={(value: any, isChecked: any) => {
      //         onChangeCheckbox({ isChecked, key: "amenity", value });
      //       }}
      //     />
      //     <CheckBoxBtn
      //       label={"Test"}
      //       value={18}
      //       queryParam={queryParam}
      //       queryString={queryString}
      //       onChange={(value: any, isChecked: any) => {
      //         onChangeCheckbox({ isChecked, key: "amenity", value });
      //       }}
      //     />
      //     <CheckBoxBtn
      //       label={"Test"}
      //       value={19}
      //       queryParam={queryParam}
      //       queryString={queryString}
      //       onChange={(value: any, isChecked: any) => {
      //         onChangeCheckbox({ isChecked, key: "amenity", value });
      //       }}
      //     />
      //     <CheckBoxBtn
      //       label={"Test"}
      //       value={20}
      //       queryParam={queryParam}
      //       queryString={queryString}
      //       onChange={(value: any, isChecked: any) => {
      //         onChangeCheckbox({ isChecked, key: "amenity", value });
      //       }}
      //     />
      //     <CheckBoxBtn
      //       label={"Test"}
      //       value={33}
      //       queryParam={queryParam}
      //       queryString={queryString}
      //       onChange={(value: any, isChecked: any) => {
      //         onChangeCheckbox({ isChecked, key: "amenity", value });
      //       }}
      //     />
      //   </div>
      // </div> */}
    </div>
  );
}
