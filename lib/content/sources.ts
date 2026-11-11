import type { SEOSource } from "@/components/SEOPage";

/**
 * Références citées par les pages de contenu. Chacune a été retrouvée dans
 * PubMed (titre, auteurs, année, revue) ou sur le site de l'organisme avant
 * d'être ajoutée : n'en ajouter aucune sans la même vérification.
 */
const pubmed = (pmid: string) => `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;

export const SOURCES = {
  kolber2010: {
    label: "Kolber MJ et coll. Shoulder injuries attributed to resistance training: a brief review. J Strength Cond Res, 2010.",
    url: pubmed("20508476"),
  },
  kolber2014: {
    label: "Kolber MJ et coll. Characteristics of shoulder impingement in the recreational weight-training population. J Strength Cond Res, 2014.",
    url: pubmed("24077379"),
  },
  urbanczyk2020: {
    label: "Urbanczyk CA et coll. Avoiding high-risk rotator cuff loading: muscle force during three pull-up techniques. Scand J Med Sci Sports, 2020.",
    url: pubmed("32715526"),
  },
  hartmann2013: {
    label: "Hartmann H, Wirth K, Klusemann M. Analysis of the load on the knee joint and vertebral column with changes in squatting depth and weight load. Sports Med, 2013.",
    url: pubmed("23821469"),
  },
  powers2010: {
    label: "Powers CM. The influence of abnormal hip mechanics on knee injury: a biomechanical perspective. J Orthop Sports Phys Ther, 2010.",
    url: pubmed("20118526"),
  },
  malliaras2015: {
    label: "Malliaras P et coll. Patellar tendinopathy: clinical diagnosis, load management, and advice for challenging case presentations. J Orthop Sports Phys Ther, 2015.",
    url: pubmed("26390269"),
  },
  nice2016: {
    label: "NICE. Low back pain and sciatica in over 16s: assessment and management (NG59), 2016, mis à jour depuis.",
    url: "https://www.nice.org.uk/guidance/ng59",
  },
  ebben2011: {
    label: "Ebben WP et coll. Kinetic analysis of several variations of push-ups. J Strength Cond Res, 2011.",
    url: pubmed("21873902"),
  },
  suprak2011: {
    label: "Suprak DN, Dawes J, Stephenson MD. The effect of position on the percentage of body mass supported during traditional and modified push-up variants. J Strength Cond Res, 2011.",
    url: pubmed("20179649"),
  },
  coombes2015: {
    label: "Coombes BK, Bisset L, Vicenzino B. Management of lateral elbow tendinopathy: one size does not fit all. J Orthop Sports Phys Ther, 2015.",
    url: pubmed("26381484"),
  },
  cullinane2014: {
    label: "Cullinane FL, Boocock MG, Trevelyan FC. Is eccentric exercise an effective treatment for lateral epicondylitis? A systematic review. Clin Rehabil, 2014.",
    url: pubmed("23881334"),
  },
  mccrary2015: {
    label: "McCrary JM, Ackermann BJ, Halaki M. A systematic review of the effects of upper body warm-up on performance and injury. Br J Sports Med, 2015.",
    url: pubmed("25694615"),
  },
  behm2016: {
    label: "Behm DG et coll. Acute effects of muscle stretching on physical performance, range of motion, and injury incidence in healthy active individuals: a systematic review. Appl Physiol Nutr Metab, 2016.",
    url: pubmed("26642915"),
  },
  simic2013: {
    label: "Simic L, Sarabon N, Markovic G. Does pre-exercise static stretching inhibit maximal muscular performance? A meta-analytical review. Scand J Med Sci Sports, 2013.",
    url: pubmed("22316148"),
  },
  fradkin2010: {
    label: "Fradkin AJ, Zazryn TR, Smoliga JM. Effects of warming-up on physical performance: a systematic review with meta-analysis. J Strength Cond Res, 2010.",
    url: pubmed("19996770"),
  },
} satisfies Record<string, SEOSource>;
