import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import WriteReviewStep1 from "@/components/common/pop-up/component/write-review/WriteReviewStep1";
import WriteReviewSuccess from "@/components/common/pop-up/component/write-review/WriteReviewSuccess";
import WriteReviewPopupFooter from "@/components/common/pop-up/component/WriteReviewPopupFooter";

export const WRITE_REVIEW = 'review_write';
export const REVIEW_SUCCESS = 'review_success'

export default function WriteReviewPopup({ showModal, setShowModal, careHomeId, careHomeName }) {

    const [currentView, setCurrentView] = useState(WRITE_REVIEW);


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
                <div className="main-popup-wrapper small-width-popup write-review-pop">
                    <Modal.Header closeButton>

                    </Modal.Header>
                    <Modal.Body>
                        <div className="expert-popup-inner">
                            <div className="middle-content-main">
                                <WriteReviewStep1
                                    careHomeId={careHomeId}
                                    careHomeName={careHomeName}
                                />
                                {/* <WriteReviewSuccess /> */}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <WriteReviewPopupFooter />
                    </Modal.Footer>
                </div>
            </Modal>
        </>
    );
}
