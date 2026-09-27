import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jev AI Decision Layer Playground",
  description:
    "Interactive testbed for the Jev System One model integration. Watch the model classify incoming game events into optimal tactile UI feedback in real time with live telemetry.",
  openGraph: {
    title: "Jev AI Decision Layer Playground | JUI",
    description:
      "Interactive testbed for the Jev System One model integration. Watch the model classify incoming game events into optimal tactile UI feedback in real time.",
  },
  twitter: {
    title: "Jev AI Decision Layer Playground | JUI",
    description:
      "Interactive testbed for the Jev System One model integration. Watch the model classify incoming game events into optimal tactile UI feedback in real time.",
  },
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
