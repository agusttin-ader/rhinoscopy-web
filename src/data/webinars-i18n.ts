import type { Webinar } from "@/data/webinars";
import type { AppLocale } from "@/i18n/routing";

type WebinarText = Pick<Webinar, "topic" | "dateLabel">;

const en: Record<string, WebinarText> = {
  "mucoceles-rinosinusales-hocsman": {
    topic: "Management of rhinosinusal mucoceles",
    dateLabel: "Thursday, October 1",
  },
  "rinoplastia-preservacion-z-flap-ragoni": {
    topic: "Preservation rhinoplasty with Z flap",
    dateLabel: "Thursday, September 24",
  },
  "micoticas-rinosinusales-hadad": {
    topic: "Rhinosinusal mycotic diseases",
    dateLabel: "Thursday, September 18",
  },
  "perforaciones-septales-cataldo": {
    topic: "Management of septal perforations",
    dateLabel: "Thursday, August 27",
  },
  "onlay-tip-grafts-urquiola": {
    topic: "Onlay tip grafts",
    dateLabel: "Thursday, April 2",
  },
  "rinoplastia-secundaria-kochol": {
    topic: "Redesigning the nose: advances in secondary rhinoplasty",
    dateLabel: "Thursday, March 26",
  },
  "reparacion-perforaciones-nazar": {
    topic: "Repair of septal perforations",
    dateLabel: "Thursday, March 19",
  },
  "rsccpn-biologicos-riolfi": {
    topic:
      "CRSwNP: selecting patients for biologic therapy",
    dateLabel: "Thursday, March 12",
  },
  "perlas-rinoplastia-secundaria-lopez-rivera": {
    topic: "Pearls in secondary rhinoplasty",
    dateLabel: "Thursday, March 5",
  },
  "redes-sociales-santos": {
    topic: "Social media as allies in your medical practice",
    dateLabel: "Thursday, November 6",
  },
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
  "mucoceles-rinosinusales-hocsman": {
    topic: "Manejo de mucoceles rinossinusais",
    dateLabel: "Quinta-feira, 1 de outubro",
  },
  "rinoplastia-preservacion-z-flap-ragoni": {
    topic: "Rinoplastia de preservação em Z flap",
    dateLabel: "Quinta-feira, 24 de setembro",
  },
  "micoticas-rinosinusales-hadad": {
    topic: "Doenças micóticas rinossinusais",
    dateLabel: "Quinta-feira, 18 de setembro",
  },
  "perforaciones-septales-cataldo": {
    topic: "Manejo de perfurações septais",
    dateLabel: "Quinta-feira, 27 de agosto",
  },
  "onlay-tip-grafts-urquiola": {
    topic: "Onlay tip grafts",
    dateLabel: "Quinta-feira, 2 de abril",
  },
  "rinoplastia-secundaria-kochol": {
    topic: "Redesenhando o nariz: avanços em rinoplastia secundária",
    dateLabel: "Quinta-feira, 26 de março",
  },
  "reparacion-perforaciones-nazar": {
    topic: "Reparação de perfurações septais",
    dateLabel: "Quinta-feira, 19 de março",
  },
  "rsccpn-biologicos-riolfi": {
    topic:
      "RSCcPN: seleção do paciente candidato a tratamento com biológicos",
    dateLabel: "Quinta-feira, 12 de março",
  },
  "perlas-rinoplastia-secundaria-lopez-rivera": {
    topic: "Pérolas em rinoplastia secundária",
    dateLabel: "Quinta-feira, 5 de março",
  },
  "redes-sociales-santos": {
    topic: "As redes sociais como aliadas no seu consultório médico",
    dateLabel: "Quinta-feira, 6 de novembro",
  },
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
