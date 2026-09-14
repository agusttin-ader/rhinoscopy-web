import {
  CertificateDownloadIcon,
  CertificateViewIcon,
} from "@/components/certificate-pdf-icon";
import { constanciasCopy } from "@/data/constancias-copy";

type CertificateResultActionsProps = {
  displayName: string;
  downloadUrl: string;
};

const iconClass = "h-[1.15rem] w-[1.15rem] sm:h-5 sm:w-5";

const actionClassName =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/35 bg-white/[0.06] text-white transition-[color,background-color,border-color,transform] hover:border-white/55 hover:bg-white/[0.1] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:h-11 sm:w-11";

export function CertificateResultActions({
  displayName,
  downloadUrl,
}: CertificateResultActionsProps) {
  return (
    <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
      <a
        href={downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={constanciasCopy.viewCta}
        aria-label={`${constanciasCopy.viewCta} — ${displayName}`}
        className={actionClassName}
      >
        <CertificateViewIcon className={iconClass} />
      </a>
      <a
        href={downloadUrl}
        download
        title={constanciasCopy.downloadCta}
        aria-label={`${constanciasCopy.downloadCta} — ${displayName}`}
        className={actionClassName}
      >
        <CertificateDownloadIcon className={iconClass} />
      </a>
    </div>
  );
}
