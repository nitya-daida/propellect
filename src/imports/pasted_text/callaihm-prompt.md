Here is a comprehensive, production-ready prompt you can use to build the complete **Propellect Real Estate Agent Calling Platform**:

---

## 🏗️ Full Project Build Prompt

---

**Project Name:** Propellect — AI-Powered Real Estate Outreach Platform
**Type:** Full-Stack SaaS Web Application (End-to-End)
**Design Aesthetic:** Professional B2B SaaS — dark navy/slate sidebar, clean white content panels, emerald-green and amber accent system, sharp geometric cards, data-dense dashboards with glassmorphism modals. Typography: `Sora` for headings, `DM Sans` for body. Think Linear.app meets a real estate CRM.

---

### 🎨 Global Design System

- **Colors:** `#0F172A` (background), `#1E293B` (sidebar/cards), `#10B981` (primary CTA / hot lead), `#F59E0B` (warm lead), `#EF4444` (cold/danger), `#6366F1` (AI/analytics accent), `#F8FAFC` (text on dark)
- **Fonts:** Google Fonts — `Sora` (700/600 for headings), `DM Sans` (400/500 for body/labels)
- **Spacing:** 8px base grid, 16/24/32/48px scale
- **Border Radius:** 12px cards, 8px inputs, 6px badges
- **Shadows:** `0 4px 24px rgba(0,0,0,0.18)` for cards, `0 0 0 3px rgba(16,185,129,0.2)` for focus rings
- **Sidebar:** 260px fixed left, collapsible to 64px icon-only mode
- **Topbar:** 64px fixed, breadcrumb + global search + notifications bell + user avatar dropdown
- **Transitions:** 200ms ease for hovers, 300ms ease for modals/drawers

---

### 📁 Full Page & Feature List

---

#### 1. 🔐 AUTH PAGES

**1a. Login Page**
- Full-page split layout: left = brand illustration (animated waveform + city skyline SVG), right = login form
- Fields: Email, Password (show/hide toggle eye icon)
- "Remember me" checkbox, "Forgot Password?" link
- Primary CTA: `Sign In` button (emerald, full width, hover lift effect)
- OAuth: `Continue with Google` button (white, border, Google logo)
- Bottom: `Don't have an account? Start free trial`
- Error states: red border + shake animation on wrong credentials
- Loading state: spinner inside button, disabled

**1b. Forgot Password Page**
- Email input + `Send Reset Link` button
- Success state: animated checkmark + "Check your inbox" message
- Back to Login link

**1c. Reset Password Page**
- New Password + Confirm Password fields with strength meter (weak/fair/strong colored bar)
- Submit button, redirect to login on success

**1d. Register / Onboarding (4-step wizard)**
- Step 1: Company name, your name, phone number, country
- Step 2: Choose plan (Free / Starter / Pro / Enterprise) — card selector with feature lists
- Step 3: Connect integrations (Twilio, CRM, MLS) — toggle switches with "Connect" buttons
- Step 4: Upload first lead CSV or connect Google Sheets — drag-and-drop file zone
- Progress bar at top showing step 1/2/3/4
- Skip button on steps 3 and 4
- `Finish Setup` → redirect to Dashboard

---

#### 2. 🏠 MAIN LAYOUT (Persistent Shell)

**Left Sidebar (260px, collapsible)**
- Logo top-left (Propellect wordmark + phone wave icon)
- Collapse toggle button (chevron)
- Navigation groups with labels:
  - **Main:** Dashboard, Leads, Campaigns, Calls
  - **AI Tools:** Voice Agent, Dialer, Analysis, Follow-up
  - **Data:** Properties, Database, Reports
  - **Settings:** Integrations, Team, Billing, Security
- Each nav item: icon (24px) + label + active state (emerald left border + background highlight)
- Bottom: Avatar + name + role badge + Logout button

**Top Bar (64px)**
- Left: Breadcrumb (e.g., `Dashboard > Campaigns > New Campaign`)
- Center: Global search bar (`⌘K` shortcut) — opens full-screen command palette on click
- Right: Notification bell (badge count), Help `?` icon, User avatar (dropdown: Profile, Settings, Logout)

**Command Palette (⌘K)**
- Full-screen dark overlay
- Fuzzy search across leads, campaigns, calls, properties
- Keyboard navigable results with icons
- Recent searches section

---

#### 3. 📊 DASHBOARD PAGE (`/dashboard`)

**Header Row:**
- Page title "Good morning, [Name] 👋" + date
- Quick action buttons: `+ New Campaign`, `Import Leads`, `Start Dialing`

**KPI Cards Row (6 cards, responsive grid):**
- Total Leads (number + % change arrow)
- Calls Made Today
- Hot Leads (emerald)
- Conversion Rate (%)
- Avg Call Duration
- Follow-ups Pending
- Each card: icon, number (large), sparkline mini-chart, trend badge (↑ +12% vs last week)

**Main Grid (2-column):**
- Left (60%): Live Call Activity feed — real-time scrolling list of calls in progress with lead name, status badge, duration timer, agent name
- Right (40%): Lead Funnel chart (vertical funnel: Dialed → Answered → Qualified → Hot → Converted) using SVG/canvas

**Second Row:**
- Campaign Performance table: Name, Leads, Dialed, Answered %, Hot %, Status, Actions (Pause/Resume/View)
- Stacked bar chart: Calls by Hour (today)

**Third Row:**
- Recent Activity Timeline (vertical list): icons for call made, lead updated, follow-up sent, etc.
- Top Agents Leaderboard: avatar + name + calls + conversion %

---

#### 4. 👥 LEADS PAGE (`/leads`)

**Header:**
- Title + `Import Leads` button + `Add Lead Manually` button + `Export CSV` button

**Filters Bar:**
- Search input (name/phone/email)
- Dropdowns: Status (All/Hot/Warm/Cold/Not Interested), Source (MLS/Referral/Portal/Ad), Intent (Buy/Sell/Rent/Invest), Date Range picker
- `Clear Filters` link

**Leads Table (sortable columns):**
- Checkbox (bulk select), Name + Avatar initials, Phone, Email, Source, Intent, Budget, Status badge (color-coded), Score (progress bar 0–100), Last Called, Assigned Agent, Actions (Call Now 📞, Edit ✏️, View 👁️, Delete 🗑️)
- Bulk action bar (appears on checkbox select): `Assign to Campaign`, `Change Status`, `Delete Selected`
- Pagination (10/25/50/100 per page)

**Lead Detail Drawer (right slide-in panel, 480px wide):**
- Lead name + avatar initials + status badge
- Tabs: Overview | Call History | Transcripts | Properties | Notes | Activity
- Overview tab: all lead fields editable inline, AI Score card, Recommended Action
- Call History tab: list of past calls with date, duration, outcome badge, play button for recording, view transcript link
- Transcripts tab: full call transcript with speaker labels (Agent / Lead), sentiment highlights (green=positive, red=objection, yellow=uncertain)
- Properties tab: matched properties from DB with thumbnail, address, price, match score
- Notes tab: text area to add notes + timestamped note history
- Activity tab: timeline of all actions

**Add/Edit Lead Modal:**
- Full form: First Name, Last Name, Phone (with flag+country code selector), Email, Source dropdown, Intent multi-select (Buy/Sell/Rent), Budget range slider (min-max), Location preference (city/area text), Property type checkboxes, Best time to call (time picker), DND toggle, Notes textarea
- Save + Cancel buttons

---

#### 5. 📣 CAMPAIGNS PAGE (`/campaigns`)

**Header:** Title + `Create Campaign` button

**Campaign Cards Grid (or list toggle):**
- Each card: Campaign name, status badge (Active/Paused/Completed/Draft), lead count, progress bar (dialed/total), start date, assigned agents avatars stack, quick actions (▶ Resume / ⏸ Pause / ✏️ Edit / 👁️ View / 🗑️ Delete)

**Create/Edit Campaign — Full Page Wizard (3 steps):**

Step 1 — Campaign Setup:
- Campaign Name input
- Description textarea
- Goal dropdown (Qualification / Follow-up / Re-engagement / Cold Outreach)
- Start Date / End Date pickers
- Time Window: From / To time pickers + Day checkboxes (Mon–Sun)
- Timezone selector dropdown

Step 2 — Lead Selection:
- Filter leads by: Source, Intent, Status, Budget Range, Location
- Results table (preview of matching leads) with count badge
- Manual lead add: search and add individually
- Total leads selected counter

Step 3 — Dialer & AI Settings:
- Max concurrent calls slider (1–50)
- Retry attempts (1–5) + Retry delay (minutes)
- DND enforcement toggle
- Voice Agent selection: dropdown of available AI voices with play-preview button
- Script/Prompt textarea (what the AI says as opening)
- Language selection: English, Hindi, Telugu, + multi-language toggle
- Call recording toggle
- Transcription toggle
- `Launch Campaign` button (large, emerald)

**Campaign Detail Page (`/campaigns/:id`):**
- Header: Campaign name + status badge + Pause/Resume/Delete buttons
- Stats row: Total Leads, Dialed, Answered, Qualified, Hot, Converted
- Line chart: Calls over time (by day/hour toggle)
- Leads table (filtered to this campaign) with same columns as global leads table
- Call log table: Lead name, time, duration, outcome, transcript link

---

#### 6. 📞 CALLS PAGE (`/calls`)

**Header:** Title + Date range filter + Export button

**Live Calls Panel (top, collapsible):**
- Grid of active call cards: Lead name, phone, campaign, duration timer (live), agent, status (Ringing/Connected/On Hold), `Listen In` button, `End Call` button

**Call History Table:**
- Columns: Date/Time, Lead Name, Phone, Campaign, Agent, Duration, Outcome (Answered/No Answer/Voicemail/DNC/Error), Sentiment (😊/😐/😟), Recording (▶ Play), Transcript (📄 View), Score (0–100)
- Filters: Outcome, Campaign, Agent, Date Range, Sentiment
- Click row → Call Detail Modal

**Call Detail Modal:**
- Audio player (waveform visualizer) with play/pause/scrub/speed controls
- Transcript panel (scrollable, time-stamped, speaker-labeled)
- AI Analysis panel:
  - Key insights (bullet list generated by LLM)
  - Sentiment timeline chart (line chart over call duration)
  - Objections detected (tags)
  - Buying intent score (gauge chart)
  - Next best action recommendation (colored card)
- Lead quick-view sidebar: name, status, budget, notes
- Action buttons: Update Lead Status, Schedule Follow-up, Add Note

---

#### 7. 🤖 VOICE AGENT PAGE (`/voice-agent`)

**Header:** Title + `Test Voice Agent` button

**Agent Configuration Panel:**
- Agent Name input
- Language: multi-select (English, Hindi, Telugu, etc.)
- Voice selection: grid of voice cards with name, gender, accent, `▶ Preview` button — selected state with emerald border
- Speaking speed slider (0.5x – 2.0x)
- Tone: dropdown (Professional / Friendly / Formal / Conversational)

**Script Builder:**
- Opening message textarea (what AI says first)
- Intent detection instructions textarea
- Qualification questions builder: drag-and-drop list of questions, add/remove rows, each row: question text + expected answer type (text/yes-no/number)
- Objection handling: accordion list of common objections + how AI should respond
- Closing statement textarea

**Live Test Console:**
- `Start Test Call` button (enters your phone number to test)
- Simulated call interface: shows transcript in real-time as you talk
- AI response display panel

---

#### 8. 📡 DIALER PAGE (`/dialer`)

**Dialer Control Center:**
- Campaign selector dropdown
- Status: Idle / Running / Paused with indicator dot
- `Start Dialing` / `Pause` / `Stop` buttons (large)
- Concurrent calls slider (live adjustment)
- Retry settings toggle panel

**Live Dashboard (real-time):**
- Cards: Calls in Progress, Queue Size, Calls Today, Success Rate %
- Live call cards grid (same as Calls page live panel)
- Auto-refresh every 5 seconds (with last updated timestamp)

**Queue Management Table:**
- Pending leads in queue: Name, Phone, Attempts, Next Retry Time, Priority, Remove from Queue button
- Drag to reorder rows (priority)

---

#### 9. 📈 ANALYSIS PAGE (`/analysis`)

**Header:** Title + Date range picker + Campaign filter + Export Report button

**Overview Cards:** Calls Made, Avg Sentiment Score, Objection Rate %, Conversion Rate %

**Charts Grid (responsive, 2 columns):**
- Sentiment Distribution: Donut chart (Positive / Neutral / Negative %)
- Calls by Hour heatmap (7 days × 24 hours grid)
- Conversion Funnel (SVG funnel)
- Objections Word Cloud (SVG)
- Lead Score Distribution: histogram
- Agent Performance: bar chart (calls, qualified, hot per agent)

**Insights Panel (AI-generated):**
- Bullet list of AI insights (e.g., "Calls between 10–11am have 34% higher answer rate")
- Recommended actions as colored cards (green = do this, yellow = consider, red = stop this)

**Transcript Search:**
- Search across all transcripts by keyword
- Results: list of matching transcript snippets with call date, lead name, context highlighted

---

#### 10. 🔁 FOLLOW-UP PAGE (`/follow-up`)

**Header:** Title + `Create Follow-up Task` button

**Segmentation Panel:**
- Three columns: 🔥 Hot | 🟡 Warm | ❄️ Cold
- Each column: count badge + lead cards (name, phone, last call date, recommended action)
- Each card: `Call Now`, `Send SMS`, `Schedule`, `Suppress` buttons

**Nurture Sequence Builder:**
- Create sequence modal: Name, Trigger (Lead becomes Warm/Hot), Steps builder
- Steps: Add Step button → choose type (Call / SMS / WhatsApp / Email / Wait X days)
- Each step card: drag handle, step type icon, delay, message template textarea, delete button
- `Save Sequence` button

**Follow-up Tasks Table:**
- Due Date, Lead Name, Task Type, Campaign, Priority, Status (Pending/Done/Snoozed), Actions (Complete ✓, Snooze ⏰, Reassign)
- Filter by: Due Today / Overdue / This Week / All

**SMS/WhatsApp Template Editor:**
- Template Name, Channel (SMS/WhatsApp), Message body with `{lead_name}`, `{property}`, `{agent_name}` variable insertion buttons
- Character count (SMS: 160 limit warning)
- `Save Template` + `Send Test` buttons

---

#### 11. 🏘️ PROPERTIES PAGE (`/properties`)

**Header:** Title + `Add Property` button + `Import from MLS` button

**Filters:** Property type (House/Apt/Villa/Plot), Price range slider, Location search, BHK selector, Status (Available/Sold/Rented)

**Property Grid / List toggle:**
- Grid card: thumbnail (placeholder gradient), price, address, type badge, BHK, area sqft, status badge, `View Details` + `Match Leads` buttons
- List row: same info in compact row

**Property Detail Modal:**
- Image gallery (3 placeholder slots)
- Full details: Address, Price, Type, BHK, Area, Amenities checklist, Description
- Matched Leads tab: list of leads whose criteria match this property (with Match Score %)
- Activity tab: timeline of calls/interactions mentioning this property

**Add/Edit Property Form (full modal):**
- All property fields, image upload slots, amenities multi-select, save/cancel

---

#### 12. 🗄️ DATABASE PAGE (`/database`)

**Tabs:** Leads | Properties | Interactions | Transcripts | Market Data

Each tab shows respective data table with search, sort, filter, export CSV/Excel buttons, and pagination. Tables are read-only with row click to view detail.

---

#### 13. 📋 REPORTS PAGE (`/reports`)

**Report Templates Grid:**
- Cards: Lead Report, Campaign Performance, Agent Report, Call Analytics, Conversion Report, Sentiment Report
- Each card: description, `Generate` button, `Schedule` button

**Generated Reports Table:**
- Name, Type, Date Generated, Date Range, Format (PDF/Excel), Status (Ready/Generating), Download button, Delete button

**Schedule Report Modal:**
- Report type selector, frequency (Daily/Weekly/Monthly), delivery time, email recipients input, format selection

---

#### 14. 🔗 INTEGRATIONS PAGE (`/integrations`)

**Integration Cards Grid (3 columns):**
- **Telephony:** Twilio (connected/disconnect), Exotel
- **LLM/AI:** Claude/GPT (API key input)
- **Speech:** ASR provider, TTS provider
- **Messaging:** Gupshup (WhatsApp), Meta (SMS)
- **CRM:** Salesforce, HubSpot, Zoho — each: connect button → OAuth flow or API key modal
- **MLS/Property:** Realtor.com, Zones, Local MLS — API key input
- **Monitoring:** Prometheus, ELK Stack

Each card: logo, name, description, status badge (Connected/Not Connected/Error), Connect/Disconnect/Configure button. Configure → opens settings modal for that integration.

---

#### 15. 👥 TEAM PAGE (`/team`)

**Header:** Title + `Invite Member` button

**Team Members Table:**
- Avatar, Name, Email, Role (Admin/Manager/Agent/Viewer), Status (Active/Invited/Suspended), Last Active, Actions (Edit role, Resend invite, Remove)

**Invite Member Modal:**
- Email input, Role selector, `Send Invite` button

**Roles & Permissions Panel:**
- Table: Feature rows × Role columns, checkboxes showing what each role can do
- `Save Permissions` button (admin only)

---

#### 16. 💳 BILLING PAGE (`/billing`)

**Current Plan Card:**
- Plan name, price, renewal date, usage stats (calls this month / limit, leads / limit)
- `Upgrade Plan` button, `Cancel Subscription` link

**Plan Comparison Table:**
- Free / Starter / Pro / Enterprise columns
- Feature rows with ✓ / ✗ / limits

**Usage Graphs:**
- Calls used vs limit (progress bar + line chart by day)
- Leads used vs limit

**Payment Method Section:**
- Current card (masked), `Update Card` button → Stripe elements modal
- Billing history table: Date, Invoice #, Amount, Status (Paid/Due), Download PDF

---

#### 17. 🔒 SECURITY PAGE (`/security`)

**Sections:**
- TRAI/DND Compliance: toggle + upload DND list CSV + auto-check status
- Encryption status: at-rest ✓, in-transit ✓ — info badges
- Role-Based Access: link to Team > Permissions
- Audit Log table: timestamp, user, action, IP address — searchable, exportable
- Call Retention Policy: dropdown (30/60/90/180/365 days) + `Save`
- Data Privacy: DPDP Act toggle, GDPR toggle, Data export request button, Account deletion request

---

#### 18. ⚙️ SETTINGS PAGE (`/settings`)

**Tabs:** General | Notifications | Call Settings | AI Preferences | API Keys | Danger Zone

- General: Company name, logo upload, timezone, date format, language
- Notifications: toggles for Email/SMS/In-app for each event type (call completed, hot lead, campaign finished, error)
- Call Settings: default recording on/off, transcription on/off, voicemail drop message upload, max call duration
- AI Preferences: default voice, default language, qualification strictness slider, sentiment threshold
- API Keys: list of generated API keys (name, key masked, created date, Copy button, Revoke button) + `Generate New Key` button
- Danger Zone: `Export All Data` button, `Delete Account` button (red, confirmation dialog required)

---

#### 19. 👤 PROFILE PAGE (`/profile`)

- Avatar upload (drag or click), Name, Email (verify badge), Phone, Timezone, Language preference
- Change Password section (old + new + confirm)
- Two-Factor Authentication toggle → QR code modal for TOTP app
- Connected accounts (Google OAuth)
- `Save Changes` button

---

#### 20. 🔔 NOTIFICATIONS PANEL (slide-in from right, accessible from bell icon)

- Tabs: All | Unread | Calls | Leads | System
- Notification rows: icon (type), message, time ago, unread dot
- `Mark All Read` button
- `View All` link → full notifications page
- Real-time updates (polling or WebSocket simulation)

---

### 🧩 REUSABLE COMPONENT LIBRARY (build these as shared components)

| Component | Details |
|---|---|
| `<Button>` | variants: primary/secondary/ghost/danger; sizes: sm/md/lg; states: loading spinner, disabled |
| `<Badge>` | Hot (green), Warm (amber), Cold (blue), Not Interested (gray), Error (red) |
| `<Table>` | sortable headers, pagination, row hover, bulk checkbox, empty state illustration |
| `<Modal>` | centered overlay, close X, ESC to close, backdrop blur, slide-up animation |
| `<Drawer>` | right-side slide-in panel, overlay, close button |
| `<Input>` | label, helper text, error state, icon left/right, character count |
| `<Select>` | searchable dropdown, multi-select variant |
| `<DatePicker>` | calendar popup, range selection |
| `<Toast>` | success/error/warning/info — top-right, auto-dismiss 4s, stack multiple |
| `<Spinner>` | centered, sizes sm/md/lg |
| `<EmptyState>` | illustration + title + description + CTA button |
| `<ConfirmDialog>` | "Are you sure?" modal with red confirm button |
| `<Avatar>` | image or initials fallback, sizes sm/md/lg, status dot |
| `<Stat Card>` | icon + value + label + trend badge |
| `<Progress Bar>` | labeled, colored variants |
| `<Tabs>` | underline style, pill style variants |
| `<Tooltip>` | hover, 200ms delay, dark bg |
| `<Stepper>` | wizard steps indicator |

---

### 📱 RESPONSIVE BEHAVIOR

- **Desktop (1280px+):** Full sidebar expanded, multi-column layouts
- **Tablet (768–1279px):** Sidebar collapsed to icons, 2-column → 1-column cards
- **Mobile (< 768px):** Sidebar hidden (hamburger menu → full-screen overlay nav), all tables become card stacks, modals full-screen, bottom action bar for primary CTAs

---

### ⚡ MICRO-INTERACTIONS & ANIMATIONS

- Page route transitions: 150ms fade + slight upward slide
- Table row hover: subtle background + right-arrow reveal
- Button hover: 2px upward translate + shadow deepen
- Status badge pulse: active calls have a soft pulsing ring animation
- Toast slide-in from right with spring easing
- Modal: backdrop fades in, modal slides up from 20px below
- Sidebar collapse: smooth 250ms width transition, icon labels fade
- KPI cards: count-up animation on first load
- Live call timer: digits tick every second with a subtle flip
- Chart bars animate in on load (staggered, 50ms delay each)
- Form validation: red border + shake animation on submit error
- Loading skeletons for all data-fetching states (gray shimmer)

---

### 🔧 TECH STACK RECOMMENDATION

- **Frontend:** React 18 + TypeScript + Vite
- **State:** Zustand (global), React Query (server state)
- **Routing:** React Router v6
- **Styling:** Tailwind CSS + custom CSS variables
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod validation
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Audio:** WaveSurfer.js (waveform player)
- **Tables:** TanStack Table v8
- **Dates:** date-fns

---

Use this prompt to build the project page by page or as a whole. Each page section above maps directly to a route, and every UI element described should be implemented with full interactivity, proper loading/empty/error states, and mobile responsiveness. No placeholder "lorem ipsum" — use realistic real-estate domain data throughout (lead names, property addresses, call durations, Indian phone numbers, INR budgets, etc.).