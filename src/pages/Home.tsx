import { MoveRight } from "lucide-react";
import { Link } from "react-router";

const Home = () => {
  const links = [
    {
      name: "Hören",
      link: "/listen",
    },
    {
      name: "Lösungsheft",
      link: "/solution",
    },
  ];
  return (
    <div>
      <h2 className="text-3xl font-bold text-emerald-700">
        Spektrum Deutsch A1+
      </h2>
      <p className={`font-medium`}>Integriertes Kurs- und Arbeitsbuch</p>
      <ul className={`mt-10 text-lg`}>
        {links.map((link) => (
          <Link key={link.name} to={link.link} className={`flex items-center gap-x-2 group`}>
            <MoveRight />{" "}
            <span className={`group-hover:translate-x-2 transition-transform`}>
              {link.name}
            </span>
          </Link>
        ))}
      </ul>
    </div>
  );
};
export default Home;
