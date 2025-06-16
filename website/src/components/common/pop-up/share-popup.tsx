import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import SharePopupContent from "@/components/common/pop-up/component/share/SharePopupContent";

export default function SharePopup({ showModal , setShowModal , currentUrl , careHomeName}) {
    return (
        <>
            <Modal
                show={showModal}
                onHide={() => {
                    setShowModal(false)
                }}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <div className="main-popup-wrapper small-width-popup">
                    <Modal.Header closeButton>

                    </Modal.Header>
                    <Modal.Body>
                        <div className="expert-popup-inner">
                            <div className="middle-content-main">
                                <SharePopupContent currentUrl={currentUrl} careHomeName={careHomeName} />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </div>
            </Modal>
        </>
    );
}
