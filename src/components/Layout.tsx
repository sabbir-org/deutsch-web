import CustomLink from "./CustomLink";
type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <nav
        className={`h-16 sticky top-0  flex items-center gap-x-2 rounded border-b border-gray-100 bg-white`}
      >
        <div className={`w-[90%] mx-auto space-x-4`}>
          <CustomLink to="/">Home</CustomLink>
          <CustomLink to="/add">Add</CustomLink>
        </div>

        <div className={`absolute right-5 text-xl font-bold text-emerald-700`}>
          <h2 className={`hidden sm:block md:hidden lg:hidden xl:hidden`}>
            sm
          </h2>
          <h2 className={`hidden md:block lg:hidden xl:hidden`}>md</h2>
          <h2 className={`hidden lg:block xl:hidden`}>lg</h2>
          <h2 className={`hidden xl:block`}>xl</h2>
        </div>
      </nav>
      <div className={`w-[90%] mx-auto mb-20 mt-5`}>{children}</div>
    </div>
  );
};
export default Layout;
