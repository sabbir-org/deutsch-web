import { Link, useMatch, useResolvedPath, type LinkProps } from "react-router";

function CustomLink({ children, to, ...props }: LinkProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link to={to} className={`${match ? "bg-emerald-700 text-white" : ""} px-4 py-1 rounded`} {...props}>
      {children}
    </Link>
  );
}

export default CustomLink;
