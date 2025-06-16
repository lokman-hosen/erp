import Brand_Logo from "@/components/pages/home/assets/footer-logo.svg";
import primaryMsg from "@/components/pages/home/assets/primaryMsg.svg";
import primaryPhone from "@/components/pages/home/assets/primaryPhone.svg";
import useGetSetting from "@/src/hooks/useGetSetting";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const { isLoading, isError, error, settingsData } = useGetSetting();

  return (
    <>
      <div className="footer-wrapper">
        <div className="footer-wrap">
          <div>
            <div className="col-12">
              <Link href="/">
                <Image className="footer-logo" priority src={Brand_Logo} alt="" />
              </Link>
            </div>
          </div>
          <div className="footer-col-wrap">
            <div className="footer-first-col">
              <p className="footer-des">{settingsData?.desc}</p>

              <p className="contact-us-text">Contact Us</p>

              <a href={`tel:${settingsData?.phone}`} className="footer-contact-link">
                <div>
                  <Image className="PhoneCall" priority src={primaryPhone} alt="" />
                  <p>{settingsData?.phone}</p>
                </div>
              </a>

              <a href={`mailto:${settingsData?.email}`} className="footer-contact-link">
                <div>
                  <Image className="PhoneCall" priority src={primaryMsg} alt="" />
                  <p>{settingsData?.email}</p>
                </div>
              </a>
            </div>

          </div>
          <div className="copy-right-wrap">
            <p className="copy-text">© Senior Places {new Date().getFullYear()}. All Rights Reserved</p>

            <div className="terms-wrap flex-div">
              <p className="label-large">Designed by: </p>
              <Link className="body-medium label-large" target="_blank" href={`${settingsData?.brand_url
                }` || "https://vixion.webflow.io"}>
                {settingsData?.brand_name || "Vixion"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
