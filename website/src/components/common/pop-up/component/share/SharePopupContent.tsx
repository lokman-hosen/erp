import SvgIcon from "@/components/SvgIcon";
import Image from "next/image";
import {
    EmailShareButton,
    FacebookShareButton,
    WhatsappShareButton,
} from 'next-share';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import FacebookMessengerShare from "./FacebookMessengerShare";


export default function SharePopupContent({ currentUrl , careHomeName }) {

    const popover = (
        <Popover id="popover-basic">
            <Popover.Body>
                Copied to clipboard
            </Popover.Body>
        </Popover>
    );

    return (
        <>
            <div className="step-wrapper">
                <h1 className="headline-small">Share {careHomeName} Profile</h1>
                <div className="step-middle flex-div-single social-share-wrap">
                    <FacebookMessengerShare url={currentUrl} />

                    <FacebookShareButton
                        url={currentUrl}>
                        <SvgIcon name="logos_facebook" className={'logos_facebook'} />
                    </FacebookShareButton>

                    <WhatsappShareButton
                        url={currentUrl}
                        // title={'next-share is a social share buttons for your next React apps.'}
                        separator=":: "
                    >
                        <SvgIcon name="logos_whatsapp" className={''} />
                    </WhatsappShareButton>

                    <EmailShareButton
                        url={currentUrl}
                        // subject={"ESPD - The world is our classroom "}
                        // body="Join ESPD today"
                        blankTarget={true}
                    >
                        <SvgIcon name="logos_google" className={''} />
                    </EmailShareButton>
                </div>
                <div className="copy-link-Bar flex-div-single">
                    <input
                        className="body-small"
                        type="text"
                        placeholder="#link"
                        value={currentUrl}
                    />
                    <OverlayTrigger
                        trigger="click"
                        placement="top"
                        overlay={popover}
                    >
                        <button
                            className="primary-short-btn flex-div-8gap"
                            onClick={() => navigator.clipboard.writeText(currentUrl)}
                        >
                            <SvgIcon name="copy_icon" className={''} />
                            Copy
                        </button>
                    </OverlayTrigger>

                </div>
            </div>
        </>
    )
}
