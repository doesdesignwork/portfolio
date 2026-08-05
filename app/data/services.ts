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
      "I create brand identities that work beyond the launch slide, from naming and the core visual idea to campaigns, digital, print, environments and motion.",
    intro:
      "A useful identity is not a large folder of logo files. It is a small set of strong decisions that helps people make consistent work, even when the format, team or production constraints change.",
    problems: [
      "You are launching something new and need a clear name, idea and identity.",
      "The brand looks different every time a new team or supplier touches it.",
      "Several offers or sub-brands have grown without a clear relationship.",
      "The identity works in one format but falls apart across campaigns, screens, print or spaces.",
    ],
    scope: [
      "Naming and positioning",
      "Visual identity systems",
      "Brand architecture",
      "Campaign and launch applications",
      "Digital, print and environmental rollout",
      "Practical guidelines and production direction",
    ],
    approach:
      "I find the few elements that must stay recognisable, test them early on real applications and write down only the rules people genuinely need. The aim is a system that is easy to use, not impressive to file away.",
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
      "I shape exhibitions and branded spaces around what visitors should notice, understand and remember, then use clear visual direction and 3D views to make the idea buildable.",
    intro:
      "An exhibition should not feel like a collection of departments competing for wall space. I help organise the story, set the hierarchy and give the whole environment one recognisable visual language.",
    problems: [
      "The content is technical, corporate or difficult to grasp on a busy exhibition floor.",
      "The space feels assembled from separate graphics rather than one visitor experience.",
      "The team needs to understand the scale and flow before committing to fabrication.",
      "The brand becomes inconsistent across the booth, screens, signage and event materials.",
    ],
    scope: [
      "Central concept and visitor story",
      "Spatial identity and communication hierarchy",
      "Exhibition graphics and environmental applications",
      "Visitor-flow planning",
      "3D visualisation and presentation views",
      "Creative direction through production handoff",
    ],
    approach:
      "I organise the content around the visitor journey, create one visual language for the space and use 3D views to settle hierarchy, scale and flow before expensive production decisions begin.",
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
      "I design packaging ranges and product visuals that make the idea clear quickly, separate variants properly and still feel like one recognisable brand.",
    intro:
      "Packaging has very little time to explain itself. The product, benefit and variant need to read quickly, while the whole range still looks related. Good visualisation also lets a team judge the idea before money is spent on production.",
    problems: [
      "Customers cannot tell the products or variants apart at a glance.",
      "A new product idea is still too technical or abstract to evaluate.",
      "The range has grown so far that the parent brand is becoming hard to recognise.",
      "The team needs believable product and packaging visuals before production.",
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
      "I keep the strongest brand cues and range logic steady, then use colour, form, hierarchy and visualisation to make each product easier to understand and compare.",
    proofProjectNumbers: ["04", "15", "07", "10", "02", "12"],
  },
];
