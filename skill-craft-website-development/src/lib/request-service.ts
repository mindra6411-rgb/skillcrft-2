export const SELECT_SERVICE_EVENT = "skillcraft:select-service";

/** Pré-seleciona o serviço no formulário e rola suavemente até a seção de contato. */
export function requestService(serviceId: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: serviceId }));
  const el = document.getElementById("contato");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", "#contato");
  } else {
    window.location.href = "/#contato";
  }
}
