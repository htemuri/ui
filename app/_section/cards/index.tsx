import StatusIndicatorCard from "./status-indicator-card";

type Props = {};

const Cards = (props: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 grid-rows-1 md:grid-rows-4 gap-4 size-full">
      <StatusIndicatorCard />
    </div>
  );
};

export default Cards;
