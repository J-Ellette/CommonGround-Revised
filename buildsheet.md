CommonGround — Revised Buildsheet (Iterative Launch)
Philosophy: Ship something real as fast as possible. Each milestone produces a deployable, usable product — not just a feature branch.

Launch Stack (Simplified for Speed)
The original stack is solid long-term but overkill for launch. Start here and migrate as needed:
LayerChoiceNotesFrontendReact + TypeScriptSame as beforeBackendNode.js (Fastify)SameDatabasePostgreSQL (Supabase)Hosted, no DevOps burden at launchAuthSupabase Auth (email + magic link)Add passkeys/TOTP in a later milestoneFile StorageSupabase StorageUpgrade to MinIO when self-hosting neededRealtimeSupabase RealtimeReplaces Redis + WebSocket setup for nowHostingVercel (frontend) + Railway or Render (API)One-click deploys, no Kubernetes yetCI/CDGitHub ActionsSame
You keep Kubernetes, Redis, Signal Protocol, and self-hosting as later milestones. This lets you launch in weeks rather than months.

Milestones
Milestone 0 — Live on the Internet
Target: Week 2
Goal: A real URL that real people can visit and create an account.
Deliverables:

Repo + monorepo structure
GitHub Actions CI (lint + tests)
Supabase project provisioned (auth, DB, storage)
User registration and login (email + magic link)
Basic user profile page
Deployed to Vercel + Railway with a real domain
"Coming soon" feature roadmap page so early visitors know what's coming

This milestone is done when you can email someone a link and they can sign up.

Milestone 1 — Organizations & Groups
Target: Week 5
Goal: An organizer can create an org, invite people, and put them in groups.
Deliverables:

Create and name an organization
Invite members via link or email
Create subgroups within an org
Role system: Owner, Admin, Member
Member directory

This is the skeleton everything else hangs on.

Milestone 2 — Events
Target: Week 8
Goal: An organizer can post an event and members can RSVP.
Deliverables:

Create an event (title, date, time, location, description)
RSVP tracking
Event list view for org members
Basic volunteer shift creation (role + time slot + sign-up)
iCal export

No map view yet, no encryption — just functional event planning.

Milestone 3 — Messaging
Target: Week 12
Goal: Members can communicate inside the platform.
Deliverables:

Group chat per org and per event (unencrypted first, clearly labeled as such)
Direct messages between members
Real-time delivery (Supabase Realtime)
Basic notifications (in-app + email digest)

Ship unencrypted messaging with a clear UI label ("Messages are not end-to-end encrypted yet — upgrade coming"). Organizers who need E2EE now can keep using Signal. You'll upgrade this in Milestone 7.

Milestone 4 — Supporter CRM (Basic)
Target: Week 16
Goal: Organizers can track their contacts and supporter relationships.
Deliverables:

Contact import (CSV)
Manual contact creation
Tags, notes, engagement history per contact
Simple list view with search and filter


Milestone 5 — Outreach Tools
Target: Week 20
Goal: Members can take and share actions.
Deliverables:

Action Centers: templated emails/texts to elected officials
Petition / advocacy form builder
Signature collection
Peer-to-peer shareable links


Milestone 6 — Policy & Campaign Tracking
Target: Week 24
Goal: Organizers can map their political landscape inside the platform.
Deliverables:

Legislation tracker (OpenStates / LegiScan API)
Official directory by district (Google Civic API)
Campaign workspace: goals, timelines, stakeholder notes
Collaborative planning board


Milestone 7 — Security Hardening
Target: Week 28
Goal: The platform is trustworthy for sensitive organizing work.
Deliverables:

Signal Protocol E2EE for messaging (replace Supabase Realtime for message content)
Passkeys + TOTP 2FA (replace magic link auth)
Disappearing messages
External E2EE security audit
Message retention policies per org

This is intentionally late — you want the feature surface stable before you lock down the security model, so you're not re-auditing constantly.

Milestone 8 — Public Meeting Tools
Target: Week 31
Deliverables:

Agenda builder
Minutes editor
Public-facing meeting archive
Resident feedback collection


Milestone 9 — Training & Simulation
Target: Week 35
Deliverables:

Scenario runner (sandboxed from live org)
Role assignments per drill
After-action report
Pre-built scenario library


Milestone 10 — Self-Hosting & Infrastructure Upgrade
Target: Week 38
Goal: Orgs with strict data sovereignty can run their own instance.
Deliverables:

Migrate from Supabase to self-managed Postgres + Redis
Docker Compose bundle
Self-hosting documentation
MinIO for file storage
Kubernetes configs for scale


Milestone 11 — Hardening & Launch Prep
Target: Week 42
Deliverables:

Full penetration test + E2EE re-audit
GDPR / CCPA compliance review
Data export and account deletion
Accessibility audit (WCAG 2.1 AA)
Load testing (10k concurrent users)
Onboarding flows and in-app help
Beta: 10 real orgs, 60-day feedback cycle


Milestone 12 — v1.0 Public Launch
Target: Week 48
Same as original — marketing site, pricing tiers, app store submissions, press outreach.

Key Differences from Original Buildsheet
The end state is identical, but the path is completely different. You have a live, usable product by Week 2 instead of Week 4 — and more importantly, you have something real users can poke at by Week 8 instead of Week 20. The security hardening moves later (but before launch), so you're not building a nuclear bunker around an unfinished house. The hosted infrastructure (Supabase, Vercel, Railway) removes all the DevOps overhead at the start, and you migrate to self-managed infra only when you actually need it.
The main tradeoff is that the messaging in Milestones 3–6 is explicitly not E2EE. That's a real limitation, and it should be communicated clearly to users. Organizers doing sensitive work will need to continue using Signal until Milestone 7. That's honest and manageable.
Want me to turn any of these milestones into a detailed technical spec or a first coding task?
