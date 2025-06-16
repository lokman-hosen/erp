import SvgIcon from "@/components/SvgIcon";
import React from "react";
import Link from "next/link";

export default function PasswordContainContent({ hasMinEightChar, hasMinOneNumber, hasCapitalLetter, hasSpecialSymbol }) {
    return (
        <div className="password-contain-wrap">
            <h2 className="label-large">Password should contain:</h2>
            <div className="password-contain-inner">
                <div className="password-contain-item flex-div-8gap">
                    <SvgIcon
                        name={hasMinEightChar ? 'CheckCircle_active' : "CheckCircle_disable"}
                        className={hasMinEightChar ? 'CheckCircle_active' : 'CheckCircle_disable'}
                    />
                    <p className={`label-small ${hasMinEightChar ? 'password-contain-item-active' : ''}`}>At least 8 characters</p>
                </div>
                <div className="password-contain-item flex-div-8gap">
                    <SvgIcon
                        name={hasMinOneNumber ? 'CheckCircle_active' : "CheckCircle_disable"}
                        className={hasMinOneNumber ? 'CheckCircle_active' : 'CheckCircle_disable'} />
                    <p className={`label-small ${hasMinOneNumber ? 'password-contain-item-active' : ''}`}>At least one number</p>
                </div>
                <div className="password-contain-item flex-div-8gap">
                    {/* <SvgIcon name="CheckCircle_disable" className={'CheckCircle_disable'}/> */}
                    <SvgIcon
                        name={hasCapitalLetter ? 'CheckCircle_active' : "CheckCircle_disable"}
                        className={hasCapitalLetter ? 'CheckCircle_active' : 'CheckCircle_disable'} />
                    <p className={`label-small ${hasCapitalLetter ? 'password-contain-item-active' : ''}`}>At least one capital letter</p>
                </div>
                <div className="password-contain-item flex-div-8gap">
                    <SvgIcon
                        name={hasSpecialSymbol ? 'CheckCircle_active' : "CheckCircle_disable"}
                        className={hasSpecialSymbol ? 'CheckCircle_active' : 'CheckCircle_disable'} />
                    <p className={`label-small ${hasSpecialSymbol ? 'password-contain-item-active' : ''}`}>At least one special symbol</p>
                </div>
            </div>
        </div>
    )
}
