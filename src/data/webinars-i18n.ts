import type { Webinar } from "@/data/webinars";
import type { AppLocale } from "@/i18n/routing";

type WebinarText = Pick<Webinar, "topic" | "dateLabel">;

const en: Record<string, WebinarText> = {
  "poliposis-nasosinusal": {
    topic: "Surgical management of nasosinusal polyposis",
    dateLabel: "Thursday, September 10",
  },
  "otoplastia-pabellones": {
    topic: "Otoplasty in cupped pinnae",
    dateLabel: "Thursday, September 3",
  },
  "valvula-nasal-cpap": {
    topic: "Nasal valve and CPAP therapy",
    dateLabel: "Thursday, August 13",
  },
  "accesos-transorbitarios": {
    topic: "Endoscopic transorbital access routes",
    dateLabel: "Thursday, August 6",
  },
  "dorso-nasal-sousa": {
    topic: "Dorsal nasal treatment: a sculptural approach",
    dateLabel: "Thursday, July 23",
  },
  "oxigeno-hiperbarico-yapur": {
    topic: "Hyperbaric oxygen therapy in facial filler complications",
    dateLabel: "Thursday, July 16",
  },
  "abordaje-endonasal-tepedino": {
    topic: "Anatomy-based endoscopic endonasal approach and surgical strategies",
    dateLabel: "Thursday, June 25",
  },
  "inmunologicos-rinosinusitis-cincura": {
    topic: "Biologics in chronic rhinosinusitis: when and how to use them",
    dateLabel: "Thursday, July 2",
  },
  "rehabilitacion-respiratoria-nasal": {
    topic: "Nasal respiratory rehabilitation after functional surgery",
    dateLabel: "Thursday, June 11",
  },
  "endo-dcr": {
    topic: "Endo-DCR: from clinic to operating room",
    dateLabel: "Thursday, June 4",
  },
  "septoplastia-endoscopica": {
    topic:
      "Endoscopic septoplasty: uses in rhinoplasty and posterior deviations",
    dateLabel: "Thursday, May 14",
  },
  "perforaciones-septales": {
    topic: "Septal perforations",
    dateLabel: "Thursday, May 7",
  },
  "derecho-salud": {
    topic: "Right to health and patient access",
    dateLabel: "Thursday, April 23",
  },
  "laterorrinia-cajelli-diorio": {
    topic: "Preservation lateral rhinoplasties and thick-skin rhinoplasty",
    dateLabel: "Thursday, April 9",
  },
  "expansion-columelar-luis-chinski": {
    topic: "Columellar expansion",
    dateLabel: "Thursday, April 30",
  },
  "accesos-expandidos-dolci": {
    topic: "The key to expanded lateral access routes",
    dateLabel: "Thursday, April 16",
  },
};

const pt: Record<string, WebinarText> = {
  "poliposis-nasosinusal": {
    topic: "Manejo cirúrgico da polipose nasossinusal",
    dateLabel: "Quinta-feira, 10 de setembro",
  },
  "otoplastia-pabellones": {
    topic: "Otoplastia em pavilhões em concha",
    dateLabel: "Quinta-feira, 3 de setembro",
  },
  "valvula-nasal-cpap": {
    topic: "Válvula nasal e terapia com CPAP",
    dateLabel: "Quinta-feira, 13 de agosto",
  },
  "accesos-transorbitarios": {
    topic: "Acessos endoscópicos transorbitários",
    dateLabel: "Quinta-feira, 6 de agosto",
  },
  "dorso-nasal-sousa": {
    topic: "Tratamento do dorso nasal: uma abordagem escultural",
    dateLabel: "Quinta-feira, 23 de julho",
  },
  "oxigeno-hiperbarico-yapur": {
    topic: "Oxigenoterapia hiperbárica em complicações de preenchimentos faciais",
    dateLabel: "Quinta-feira, 16 de julho",
  },
  "abordaje-endonasal-tepedino": {
    topic: "Abordagem endoscópica endonasal baseada em anatomia e estratégias cirúrgicas",
    dateLabel: "Quinta-feira, 25 de junho",
  },
  "inmunologicos-rinosinusitis-cincura": {
    topic:
      "Imunobiológicos na rinossinusite crônica: quando e como utilizar",
    dateLabel: "Quinta-feira, 2 de julho",
  },
  "rehabilitacion-respiratoria-nasal": {
    topic: "Reabilitação respiratória nasal após cirurgia funcional",
    dateLabel: "Quinta-feira, 11 de junho",
  },
  "endo-dcr": {
    topic: "Endo-DCR: da consulta ao centro cirúrgico",
    dateLabel: "Quinta-feira, 4 de junho",
  },
  "septoplastia-endoscopica": {
    topic:
      "Septoplastia endoscópica: utilidades na rinoplastia e desvios posteriores",
    dateLabel: "Quinta-feira, 14 de maio",
  },
  "perforaciones-septales": {
    topic: "Perfurações septais",
    dateLabel: "Quinta-feira, 7 de maio",
  },
  "derecho-salud": {
    topic: "Direito à saúde e acesso dos pacientes",
    dateLabel: "Quinta-feira, 23 de abril",
  },
  "laterorrinia-cajelli-diorio": {
    topic: "Laterorrinias por preservação de dorso e rinoplastia em pele grossa",
    dateLabel: "Quinta-feira, 9 de abril",
  },
  "expansion-columelar-luis-chinski": {
    topic: "Expansão columelar",
    dateLabel: "Quinta-feira, 30 de abril",
  },
  "accesos-expandidos-dolci": {
    topic: "A chave para os acessos expandidos laterais",
    dateLabel: "Quinta-feira, 16 de abril",
  },
};

const byLocale: Partial<Record<AppLocale, Record<string, WebinarText>>> = {
  en,
  pt,
};

export function localizeWebinar(webinar: Webinar, locale: string): Webinar {
  const texts = byLocale[locale as AppLocale]?.[webinar.id];
  if (!texts) return webinar;
  return { ...webinar, ...texts };
}

export function localizeWebinars(
  items: readonly Webinar[],
  locale: string,
): Webinar[] {
  return items.map((item) => localizeWebinar(item, locale));
}
