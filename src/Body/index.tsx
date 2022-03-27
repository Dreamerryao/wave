import Metric from "../components/Metric";

const Body = () => {
  return (
    <div className="absolute z-0 inset-0">
      <Metric timing={3000} number={8} color={"rgba(129,140,248,0.2)"} />
      <Metric timing={3000} number={10} color={"rgba(56,189,248,0.2)"} />
      <Metric timing={2000} number={6} color={"rgba(253,186,116,0.2)"} />
    </div>
  );
};

export default Body;
