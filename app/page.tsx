import StatusIndicator from "@/registry/8starlabs-ui/blocks/status-indicator";
import Hero from "@/app/_section/hero";
import { TransportBadge } from "@/registry/8starlabs-ui/blocks/transport-badge";

export default function Home() {
  return (
    <div className="max-w-10xl  px-6 md:px-16  mx-auto flex flex-col min-h-svh py-8 gap-8">
      <Hero />
      <StatusIndicator state="active" label="All systems operational" />
      <StatusIndicator state="down" label="Systems down" />
      <StatusIndicator state="idle" label="Systems idle" />
      <StatusIndicator state="fixing" label="Diagnosing issue, fixing" />
      <TransportBadge system="SMRT" stationCode="NS1" />
      <TransportBadge system="SMRT" stationCode={["NS1", "DT24", "TE12"]} />
      <TransportBadge system="SMRT" stationCode="CC12" />
      <TransportBadge system="SMRT" stationCode="EW12" />
      <TransportBadge
        system="SMRT"
        stationCode="NE12"
        stationName="Jurong East"
        showStationName
        size="sm"
      />
      <TransportBadge system="SMRT" stationCode="TE12" size="xs" />
    </div>
  );
}
