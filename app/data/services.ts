export type Service = {
  slug: string;
  title: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  description: string;
  intro: string;
  problems: string[];
  scope: string[];
  approach: string;
  proofProjectNumbers: string[];
};

export const services: Service[] = [
  {
    slug: "brand-identity-design-singapore",
    title: "Brand identity designer in Singapore",
    primaryKeyword: "brand identity designer Singapore",
    supportingKeywords: [
      "senior brand designer Singapore",
      "brand systems designer",
      "freelance brand designer Singapore",
      "visual identity designer Singapore",
      "brand architecture designer",
    ],
    description:
      "Brand identity and design systems for organisations, products and places, from naming and core identity through campaigns, digital, print, environments and motion.",
    intro:
      "The objective is not a larger logo library. It is a compact set of rules that helps teams make recognisable work quickly, even when formats, partners and production needs change.",
    problems: [
      "A new brand needs a clear name, idea and visual identity.",
      "An existing identity has become inconsistent across teams and channels.",
      "Several offers or sub-brands need a usable brand architecture.",
      "A visual system needs to work across digital, print, campaigns, environments or motion.",
    ],
    scope: [
      "Naming and positioning",
      "Visual identity systems",
      "Brand architecture",
      "Campaign and launch applications",
      "Digital, print and environmental rollout",
      "Guidelines and production-ready design direction",
    ],
    approach:
      "I identify the few brand elements that must remain stable, test them early on real applications and document only the rules people need to use the system well.",
    proofProjectNumbers: ["13", "01", "06", "09", "11"],
  },
  {
    slug: "experiential-exhibition-design-singapore",
    title: "Experiential and exhibition designer in Singapore",
    primaryKeyword: "experiential designer Singapore",
    supportingKeywords: [
      "exhibition designer Singapore",
      "experiential design Singapore",
      "event visual design Singapore",
      "exhibition creative direction",
      "3D event designer Singapore",
    ],
    description:
      "Creative direction for exhibitions and branded environments, including visitor narrative, spatial identity, communication hierarchy and 3D visualisation.",
    intro:
      "I focus on what visitors should notice, understand and remember. That keeps the space from becoming a collection of disconnected messages and gives fabricators a clearer creative framework.",
    problems: [
      "Technical or corporate content is difficult to understand on the exhibition floor.",
      "The space looks assembled from separate graphics instead of one visitor story.",
      "Stakeholders need to review the experience before build and production.",
      "The brand must stay recognisable across spatial, screen and event touchpoints.",
    ],
    scope: [
      "Central concept and visitor narrative",
      "Spatial brand and communication hierarchy",
      "Exhibition graphics and environmental applications",
      "Visitor-flow thinking",
      "3D visualisation and presentation views",
      "Creative direction through production handoff",
    ],
    approach:
      "I organise content around the visitor journey, establish one spatial language and use clear 3D views to align hierarchy, scale and flow before fabrication decisions begin.",
    proofProjectNumbers: ["08", "06", "11"],
  },
  {
    slug: "packaging-product-design-singapore",
    title: "Packaging and product visualisation designer in Singapore",
    primaryKeyword: "packaging designer Singapore",
    supportingKeywords: [
      "FMCG packaging designer",
      "beauty packaging design",
      "packaging range design",
      "label design Singapore",
      "3D packaging visualisation",
    ],
    description:
      "Packaging systems and product visualisation for FMCG, beauty, food, beverage and ingredient-led concepts.",
    intro:
      "The work makes the product proposition legible at a glance, separates variants without fragmenting the range and gives teams credible visuals before production.",
    problems: [
      "Different products in a range are difficult to distinguish at shelf.",
      "A new proposition is still too technical or abstract to evaluate.",
      "Parent-brand recognition is being lost across variants or sub-ranges.",
      "Teams need credible product and packaging visuals before production.",
    ],
    scope: [
      "Packaging concepts and range systems",
      "Label design and information hierarchy",
      "Product naming and proposition design",
      "FMCG and beauty packaging",
      "Food and beverage packaging",
      "3D product and packaging visualisation",
    ],
    approach:
      "I keep the brand anchors and range logic stable, then use colour, form, hierarchy and visualisation to make each proposition distinct and easy to assess.",
    proofProjectNumbers: ["04", "15", "07", "10", "02", "12"],
  },
];
