import { notFound } from "next/navigation";
import DigitalEditorialContentHubClient from "./DigitalEditorialContentHubClient";

export default function DigitalEditorialContentHubPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <DigitalEditorialContentHubClient />;
}

