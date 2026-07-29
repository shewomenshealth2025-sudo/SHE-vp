import {
  getKnowledgeStats,
  knowledgeGuides,
} from "../knowledge/knowledgeBase";

export function auditKnowledgeBase() {
  const stats = getKnowledgeStats();

  const records = knowledgeGuides.map((guide) => ({
    id: guide.id,
    title: guide.title,
    status: guide.evidence.status,
    reviewedAt: guide.evidence.reviewedAt,
    sourceCount: guide.evidence.sources.length,
    publicationReady: guide.publication.ready,
    missingSections: guide.publication.missingSections,
    issues: guide.publication.issues,
  }));

  return {
    stats,
    records,
  };
}

export function logKnowledgeAudit() {
  const audit = auditKnowledgeBase();

  console.group("SHE Knowledge Base Audit");
  console.table(audit.records);
  console.log("Summary", audit.stats);
  console.groupEnd();

  return audit;
}
