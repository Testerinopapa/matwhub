import "./matw-whatsapp-help.css";

/** Confirmed MATW support contact. */
export const DEFAULT_MATW_WHATSAPP_NUMBER = "447951579147";

/** One direct link; no settings, popup, or phone-number field. */
export function MatwWhatsAppHelp({ appName }: { appName: string }) {
  const message = encodeURIComponent(`Hello, I need help with MATW ${appName}.`);
  const href = `https://wa.me/${DEFAULT_MATW_WHATSAPP_NUMBER}?text=${message}`;
  return (
    <a
      className="matw-whatsapp-help"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Contact MATW ${appName} support on WhatsApp`}
      title="Contact support on WhatsApp"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" width="29" height="29" focusable="false">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.496.099-.198.05-.372-.025-.52-.074-.149-.669-1.612-.916-2.208-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.148.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.93 9.93 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.93 9.93 0 0 1-1.524-5.302C2.155 6.33 6.637 1.85 12.055 1.85a9.85 9.85 0 0 1 7.014 2.907 9.85 9.85 0 0 1 2.903 7.017c-.003 5.425-4.484 9.911-9.921 9.911M20.52 3.48A11.84 11.84 0 0 0 12.05 0C5.467 0 .105 5.36 .102 11.964a11.92 11.92 0 0 0 1.6 5.967L0 24l6.233-1.635a11.94 11.94 0 0 0 5.812 1.48h.005c6.58 0 11.94-5.36 11.95-11.964a11.84 11.84 0 0 0-3.48-8.401z" />
      </svg>
    </a>
  );
}
