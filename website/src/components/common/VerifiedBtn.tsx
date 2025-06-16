import React from 'react';
import SvgIcon from "@/components/SvgIcon";

export default function VerifiedBtn({is_gallery}) {
    return (
        <div className={`verified-btn-inner ${is_gallery && "details-verified-btn-inner"}`}>
            <button className="verified-btn flex-div label-large">
                <SvgIcon name="SealCheck" className={''}/>
                Verified
            </button>
        </div>
    );
}

