import React from 'react';
import SvgIcon from "@/components/SvgIcon";

export default function SavedBtn() {
    return (
        <div className="saved-btn-inner">
            <button className="saved-btn">
                <SvgIcon name="Heart_red_filed" className={''}/>
            </button>
        </div>
    );
}

