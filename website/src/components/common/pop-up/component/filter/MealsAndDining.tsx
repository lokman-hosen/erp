import React from "react";
import CheckBoxBtn from "@/components/common/pop-up/component/CheckBoxBtn";
import { useQuery } from "react-query";
import { API_SEARCH_AMENITIES_DATA } from "@/services/api/endpoints";
import { get } from "@/services/api/api";


export default function MealsAndDining({
    onChangeCheckbox,
    queryParam,
    queryString,
}: any) {

    const { isLoading, isError, error, data: amenities, isSuccess } = useQuery({
        queryKey: ['SearchAmenities'],
        queryFn: () => get(API_SEARCH_AMENITIES_DATA)
    });

    const d = amenities?.data?.find((i) => i?.group_name === 'Meals and Dining')

    const amenitiesFromUrl = queryParam[queryString]?.split(",");

    return (
        <div className="step-wrapper">
            {d?.amenities?.map((item: any) => {

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
    )
}
