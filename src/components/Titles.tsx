type Props = {
  title: string;
  number?: string | number;
  subtitle: string;
};

const Titles = ({ title, number, subtitle }: Props) => {
  return (
    <div className={`mt-2`}>
      <h2 className={`title text-lg font-medium text-emerald-700`}>{title}</h2>
      <h4 className={`subtitle`}>
        {" "}
        <span className={`text-emerald-700 font-semibold`}>{number}</span>{" "}
        {subtitle}
      </h4>
    </div>
  );
};
export default Titles;
