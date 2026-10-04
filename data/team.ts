import type { CreditLine, Host, TeamMember } from "@/types";

const CONTETRA = "Contetra Private Limited";

/**
 * NOTE: the brief spells the host's surname two ways — "Parameshwaran" in the
 * host section and "Parameswaran" in the credits. Normalised to one spelling
 * here so the same page does not contradict itself. Change both occurrences
 * below if the other spelling is the correct one.
 */
export const host: Host = {
  name: "CA Chitra Parameswaran",
  role: "Director and Chief of Staff",
  organisation: CONTETRA,
  image: "https://contetra.b-cdn.net/CFO%20Podcast/Chitra_Parameswaran_1.jpg",
  paragraphs: [
    "I have spent my working life around finance teams, and one thing never stopped bothering me. The numbers they produce get read closely by boards, banks and analysts. The people who produce them get asked almost nothing.",
    "So I started asking. Not about EBITDA or working capital, but about the town someone grew up in, the exam they failed, the job they took because they needed the money, the one thing a mentor said that they still repeat twenty years later.",
    "What comes back is more useful to a young chartered accountant than any technical session I could put together. That is the whole reason this show exists.",
  ],
};

export const credits: CreditLine[] = [
  {
    id: "host",
    role: "Conceptualised and hosted by",
    names: ["Chitra Parameswaran"],
  },
  {
    id: "produced",
    role: "Produced by",
    names: ["Palak Kedia", "Kashish Rajpal"],
  },
  {
    id: "creative",
    role: "Creative",
    names: ["Pankaj Sakpal", "Denal Radadia", "Rui Manjrekar"],
  },
];

/** Six named people, each with a photo. */
export const supportedBy: TeamMember[] = [
  {
    id: "amit-srinivasan",
    name: "Amit Srinivasan",
    role: "CEO",
    organisation: CONTETRA,
    // NOTE: filename reads "amit-shrivastav" while the brief gives the name as
    // "Amit Srinivasan". URL used exactly as supplied — confirm which is right.
    image:
      "https://contetra.b-cdn.net/company-data/employee-photos/amit-shrivastav.jpg",
  },
  {
    id: "amm-zulfiquar",
    name: "AMM Zulfiquar",
    role: "CFO",
    organisation: CONTETRA,
    image:
      "https://contetra.b-cdn.net/company-data/employee-photos/ahamed-meera-mohideen-zulfiquar.jpg",
  },
  {
    id: "neha",
    name: "Neha",
    role: "CPO",
    organisation: CONTETRA,
    image:
      "https://contetra.b-cdn.net/company-data/employee-photos/neha-shrivastav.jpg",
  },
  {
    id: "tejas-savla",
    name: "Tejas Savla",
    role: "CMO",
    organisation: CONTETRA,
    image:
      "https://contetra.b-cdn.net/company-data/employee-photos/tejas-savla-1787807457263.jpg",
  },
  {
    id: "mayuresh-deshmukh",
    name: "Mayuresh Deshmukh",
    role: "COO",
    organisation: CONTETRA,
    image:
      "https://contetra.b-cdn.net/company-data/employee-photos/mayuresh-deshmukh.jpg",
  },
  {
    id: "vivek-kedia",
    name: "Vivek Kedia",
    role: "CCO",
    organisation: CONTETRA,
    image:
      "https://contetra.b-cdn.net/company-data/employee-photos/vivek-kedia.jpg",
  },
];

/** The seventh item in the row — text only, no photo, by design. */
export const supportedByCoda = "and the Contetra family";

/** Heading for the supported-by group. The organisation is stated once here
 *  rather than repeated under all six names. */
export const supportedByIntro = {
  title: "Supported by",
  line: `Everyone below is at ${CONTETRA}.`,
};
