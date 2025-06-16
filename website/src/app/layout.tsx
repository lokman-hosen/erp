import "../../styles/home-styles/bootstrap.min.css";
import "../../styles/home-styles/demo.css";
import "../../styles/home-styles/font-awesome.min.css";
import "../../styles/home-styles/fontawesome-stars.css";
import "../../styles/home-styles/lightgallery.min.css";
import "../../styles/home-styles/nouislider.min.css";
import "../../styles/home-styles/owl.carousel.min.css";
import "../../styles/home-styles/owl.theme.default.min.css";
import "../../styles/home-styles/select2.min.css";
import "../../styles/home-styles/slick.css";
import "../../styles/home-styles/style.css";
import Providers from "./Providers";
import "./globals.css";

export const metadata = {
  title: {
    template: "starter | %s",
  },
  description: "starter",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
