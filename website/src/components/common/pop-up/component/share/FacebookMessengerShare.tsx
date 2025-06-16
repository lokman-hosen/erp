import Image from 'next/image';
import Capa_1 from "@/components/assets/Capa_1.svg";

import React from 'react';

const FacebookMessengerShare = ({ url }) => {

    const messengerOnClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        window.location.href =
            'fb-messenger://share?link=' +
            encodeURIComponent(url) +
            '&app_id=' +
            encodeURIComponent("")
    };

    return (
        <div>
            <Image
                className="Capa_1"
                priority
                src={Capa_1}
                alt=""
                onClick={messengerOnClick}
                style={{ cursor: "pointer" }}
            />
        </div>
    );
};

export default FacebookMessengerShare;