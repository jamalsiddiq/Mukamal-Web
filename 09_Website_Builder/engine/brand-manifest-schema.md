# Brand Manifest Schema

> Part of: 09_Website_Builder/engine | Used for: New Build flows (no existing site to audit)

## Purpose

Defines the structured input schema for a brand mandate when building a site from scratch. For redesign flows, this is partially derived from the audit output. For new builds, the CEO collects this via structured intake.

---

## Schema

```json
{
  "brand_id": "string — unique slug (e.g. mukamal-redesign-09)",
  "build_type": "redesign | new | section-sprint",
  "brand": {
    "name": "string",
    "tagline": "string (< 8 words)",
    "vertical": "agency | saas | fintech | web3 | developer | media | portfolio",
    "tone": "dark-luxury | editorial | clinical | tech",
    "target_audience": "string"
  },
  "existing_site": {
    "url": "string | null",
    "routes": ["string"],
    "known_issues": ["string"]
  },
  "design": {
    "accent_color": "#hex",
    "background_color": "#hex",
    "text_color": "#hex",
    "font_display": "string",
    "font_sans": "string",
    "font_mono": "string",
    "motion_intensity": "1-10 integer",
    "aesthetic_mode": "A-dark-luxury | B-swiss-brutalist | C-soft-premium | D-editorial-minimalist"
  },
  "sections_required": [
    "hero-full-bleed | hero-split | hero-minimal",
    "features-grid | features-list",
    "stats-block",
    "process-steps",
    "social-proof",
    "logo-strip",
    "cta-full-bleed | cta-inline",
    "contact-form",
    "case-study-preview",
    "globe-feature"
  ],
  "evidence": {
    "case_studies": ["string — path to case study data"],
    "audit_reports": ["string — path to audit output"],
    "metrics": ["string — e.g. '47% conversion increase on redesigned checkout'"]
  },
  "constraints": {
    "pages": ["/ | /about | /work | /contact | /insights"],
    "deploy_target": "04_Mukamal_Web | client_repo",
    "deadline": "YYYY-MM-DD | null"
  }
}
```

---

## Mukamal Default Manifest

Used when build_type is `redesign` targeting `04_Mukamal_Web`:

```json
{
  "brand_id": "mukamal-redesign-09",
  "build_type": "redesign",
  "brand": {
    "name": "Mukamal",
    "tagline": "We Design Conversion",
    "vertical": "agency",
    "tone": "dark-luxury",
    "target_audience": "Enterprise FinTech, Web3, SaaS CTOs and Founders"
  },
  "existing_site": {
    "url": "http://localhost:3000",
    "routes": ["/", "/about", "/work", "/contact", "/distribution", "/insights"],
    "known_issues": [
      "Brand accent drift: using #635bff (Stripe indigo) instead of #C6F135 (lime)",
      "Inter font usage in body copy (banned)",
      "No Critic Gate enforced on prior deployments",
      "Section cognitive load unmeasured"
    ]
  },
  "design": {
    "accent_color": "#C6F135",
    "background_color": "#080808",
    "text_color": "#F0EDE6",
    "font_display": "Instrument Serif",
    "font_sans": "Manrope",
    "font_mono": "Space Mono",
    "motion_intensity": 8,
    "aesthetic_mode": "A-dark-luxury"
  },
  "sections_required": [
    "hero-full-bleed",
    "logo-strip",
    "features-grid",
    "stats-block",
    "process-steps",
    "case-study-preview",
    "cta-full-bleed"
  ],
  "evidence": {
    "case_studies": ["06_Workspace/web3-wallets/", "06_Workspace/linear-audit/"],
    "audit_reports": ["01_Audit_Engine/linear/", "01_Audit_Engine/mukamal-v3-home/"],
    "metrics": []
  },
  "constraints": {
    "pages": ["/", "/about", "/work", "/contact"],
    "deploy_target": "04_Mukamal_Web",
    "deadline": null
  }
}
```
