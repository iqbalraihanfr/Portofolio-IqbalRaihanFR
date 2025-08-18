import { certificates as data } from "@/features/certificates/lib/data";
import CertificatesClient from "./client";

export const metadata = { title: "Certificates" };

export default function CertificatesPage() {
  return <CertificatesClient data={data} />;
}
