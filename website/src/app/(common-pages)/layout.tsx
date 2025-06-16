import Header from "@/src/components/header-footer/header/Header";

export const metadata = {
  title: {
    template: "%s | Dashboard",
  },
  description: "node-commerce",
};

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default PageLayout;
