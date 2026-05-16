// ─── LEADS ───────────────────────────────────────────────────────────────────
export const leads = [
  { id: 'L001', firstName: 'Arjun', lastName: 'Sharma', phone: '+91 98201 34567', email: 'arjun.sharma@gmail.com', source: 'MLS', intent: 'Buy', budget: { min: 7500000, max: 12000000 }, location: 'Bandra West, Mumbai', status: 'hot', score: 87, lastCalled: '2026-04-30', assignedAgent: 'Priya Mehta', campaign: 'Mumbai Premium Buyers', propertyType: 'Apartment', bestTime: '10:00 AM', dnd: false, notes: 'Looking for 3BHK near sea link. Very interested.', createdAt: '2026-04-10' },
  { id: 'L002', firstName: 'Sunita', lastName: 'Reddy', phone: '+91 91234 56789', email: 'sunita.r@outlook.com', source: 'Referral', intent: 'Sell', budget: { min: 5000000, max: 8000000 }, location: 'Koramangala, Bengaluru', status: 'warm', score: 64, lastCalled: '2026-04-29', assignedAgent: 'Rahul Iyer', campaign: 'Bengaluru Sellers Q2', propertyType: 'Villa', bestTime: '2:00 PM', dnd: false, notes: 'Wants to sell current villa, moving to Pune.', createdAt: '2026-04-12' },
  { id: 'L003', firstName: 'Kiran', lastName: 'Patel', phone: '+91 99876 54321', email: 'kiran.patel@yahoo.in', source: 'Portal', intent: 'Buy', budget: { min: 3000000, max: 5500000 }, location: 'Thane West, Mumbai', status: 'cold', score: 28, lastCalled: '2026-04-25', assignedAgent: 'Anita Singh', campaign: 'Thane Affordable Homes', propertyType: 'Apartment', bestTime: '6:00 PM', dnd: false, notes: 'First time buyer. Exploring options.', createdAt: '2026-04-08' },
  { id: 'L004', firstName: 'Rohit', lastName: 'Joshi', phone: '+91 88765 43210', email: 'rohit.j@gmail.com', source: 'Ad', intent: 'Invest', budget: { min: 15000000, max: 30000000 }, location: 'Powai, Mumbai', status: 'hot', score: 92, lastCalled: '2026-04-30', assignedAgent: 'Priya Mehta', campaign: 'Mumbai Premium Buyers', propertyType: 'Commercial', bestTime: '9:00 AM', dnd: false, notes: 'HNI investor. Looking for commercial properties.', createdAt: '2026-04-15' },
  { id: 'L005', firstName: 'Deepa', lastName: 'Nair', phone: '+91 77654 32109', email: 'deepa.nair@gmail.com', source: 'MLS', intent: 'Rent', budget: { min: 50000, max: 90000 }, location: 'Whitefield, Bengaluru', status: 'warm', score: 55, lastCalled: '2026-04-28', assignedAgent: 'Rahul Iyer', campaign: 'Bengaluru Rentals', propertyType: 'Apartment', bestTime: '7:00 PM', dnd: true, notes: 'Relocating from Delhi. Needs furnished flat.', createdAt: '2026-04-18' },
  { id: 'L006', firstName: 'Amit', lastName: 'Kulkarni', phone: '+91 98123 45678', email: 'amit.k@company.com', source: 'Referral', intent: 'Buy', budget: { min: 6000000, max: 9500000 }, location: 'Hadapsar, Pune', status: 'hot', score: 78, lastCalled: '2026-04-30', assignedAgent: 'Sneha Verma', campaign: 'Pune Growth Zone', propertyType: 'Apartment', bestTime: '11:00 AM', dnd: false, notes: 'Engineer at Infosys. Ready to buy in 3 months.', createdAt: '2026-04-20' },
  { id: 'L007', firstName: 'Meera', lastName: 'Krishnamurthy', phone: '+91 96543 21098', email: 'meera.k@gmail.com', source: 'Portal', intent: 'Buy', budget: { min: 8000000, max: 14000000 }, location: 'Jubilee Hills, Hyderabad', status: 'warm', score: 61, lastCalled: '2026-04-27', assignedAgent: 'Vikram Das', campaign: 'Hyderabad Luxury', propertyType: 'Villa', bestTime: '3:00 PM', dnd: false, notes: 'Wants villa with garden. Seen 3 properties.', createdAt: '2026-04-14' },
  { id: 'L008', firstName: 'Suresh', lastName: 'Gupta', phone: '+91 87654 32101', email: 'suresh.g@business.in', source: 'Ad', intent: 'Invest', budget: { min: 20000000, max: 50000000 }, location: 'Gurgaon Sector 54', status: 'not_interested', score: 15, lastCalled: '2026-04-20', assignedAgent: 'Anita Singh', campaign: 'Delhi NCR Investors', propertyType: 'Commercial', bestTime: '5:00 PM', dnd: true, notes: 'Called 5 times. Not interested currently.', createdAt: '2026-04-05' },
  { id: 'L009', firstName: 'Priti', lastName: 'Agarwal', phone: '+91 95432 10987', email: 'priti.a@email.com', source: 'MLS', intent: 'Buy', budget: { min: 4500000, max: 7000000 }, location: 'Viman Nagar, Pune', status: 'hot', score: 83, lastCalled: '2026-04-30', assignedAgent: 'Sneha Verma', campaign: 'Pune Growth Zone', propertyType: 'Apartment', bestTime: '10:00 AM', dnd: false, notes: 'Liked Rohan Primus. Wants site visit.', createdAt: '2026-04-22' },
  { id: 'L010', firstName: 'Vivek', lastName: 'Menon', phone: '+91 94321 09876', email: 'vivek.m@tcs.com', source: 'Referral', intent: 'Rent', budget: { min: 80000, max: 150000 }, location: 'Hiranandani, Mumbai', status: 'warm', score: 47, lastCalled: '2026-04-26', assignedAgent: 'Priya Mehta', campaign: 'Mumbai Rentals', propertyType: 'Apartment', bestTime: '8:00 PM', dnd: false, notes: 'Expat returning. Prefers gated community.', createdAt: '2026-04-17' },
  { id: 'L011', firstName: 'Kavya', lastName: 'Rao', phone: '+91 93210 98765', email: 'kavya.rao@wipro.com', source: 'Portal', intent: 'Buy', budget: { min: 5500000, max: 8500000 }, location: 'Sarjapur Road, Bengaluru', status: 'hot', score: 89, lastCalled: '2026-04-30', assignedAgent: 'Rahul Iyer', campaign: 'Bengaluru Tech Buyers', propertyType: 'Apartment', bestTime: '12:00 PM', dnd: false, notes: 'Senior engineer at Wipro. Loan pre-approved.', createdAt: '2026-04-25' },
  { id: 'L012', firstName: 'Rahul', lastName: 'Deshmukh', phone: '+91 92109 87654', email: 'rahul.d@gmail.com', source: 'Ad', intent: 'Sell', budget: { min: 9000000, max: 13000000 }, location: 'Andheri East, Mumbai', status: 'cold', score: 32, lastCalled: '2026-04-23', assignedAgent: 'Anita Singh', campaign: 'Mumbai Sellers', propertyType: 'Apartment', bestTime: '4:00 PM', dnd: false, notes: 'Inherited property. Not urgent to sell.', createdAt: '2026-04-11' },
];

// ─── CAMPAIGNS ───────────────────────────────────────────────────────────────
export const campaigns = [
  { id: 'C001', name: 'Mumbai Premium Buyers', description: 'Target HNI buyers for luxury apartments in Mumbai', goal: 'Qualification', status: 'active', leadCount: 234, dialed: 189, answered: 142, qualified: 67, hot: 28, converted: 8, startDate: '2026-04-01', endDate: '2026-05-31', agents: ['Priya Mehta', 'Anita Singh'], timeWindow: { from: '09:00', to: '20:00', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] }, concurrentCalls: 12, language: 'English', voice: 'Priya Pro', recording: true, transcription: true },
  { id: 'C002', name: 'Bengaluru Tech Buyers', description: 'IT professionals looking for 2-3BHK in tech corridors', goal: 'Cold Outreach', status: 'active', leadCount: 456, dialed: 312, answered: 198, qualified: 87, hot: 41, converted: 15, startDate: '2026-04-10', endDate: '2026-06-10', agents: ['Rahul Iyer', 'Sneha Verma'], timeWindow: { from: '10:00', to: '19:00', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] }, concurrentCalls: 18, language: 'English', voice: 'Arjun Pro', recording: true, transcription: true },
  { id: 'C003', name: 'Pune Growth Zone', description: 'Mid-segment buyers in Pune\'s emerging micro-markets', goal: 'Qualification', status: 'paused', leadCount: 187, dialed: 145, answered: 98, qualified: 45, hot: 19, converted: 6, startDate: '2026-03-15', endDate: '2026-05-15', agents: ['Sneha Verma'], timeWindow: { from: '11:00', to: '18:00', days: ['Mon', 'Wed', 'Fri'] }, concurrentCalls: 8, language: 'English', voice: 'Priya Pro', recording: true, transcription: false },
  { id: 'C004', name: 'Hyderabad Luxury', description: 'Villa and luxury apartment buyers in Jubilee Hills & Banjara Hills', goal: 'Re-engagement', status: 'active', leadCount: 98, dialed: 54, answered: 38, qualified: 21, hot: 9, converted: 3, startDate: '2026-04-20', endDate: '2026-05-20', agents: ['Vikram Das'], timeWindow: { from: '10:00', to: '20:00', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] }, concurrentCalls: 5, language: 'English', voice: 'Kavitha Pro', recording: true, transcription: true },
  { id: 'C005', name: 'Delhi NCR Investors', description: 'Commercial property investors in Gurgaon and Noida', goal: 'Follow-up', status: 'completed', leadCount: 312, dialed: 312, answered: 201, qualified: 89, hot: 34, converted: 12, startDate: '2026-03-01', endDate: '2026-04-15', agents: ['Anita Singh', 'Rahul Iyer'], timeWindow: { from: '09:00', to: '18:00', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] }, concurrentCalls: 15, language: 'Hindi', voice: 'Raj Pro', recording: true, transcription: true },
  { id: 'C006', name: 'Mumbai Rentals', description: 'Corporate and expat rental seekers in Mumbai', goal: 'Qualification', status: 'draft', leadCount: 67, dialed: 0, answered: 0, qualified: 0, hot: 0, converted: 0, startDate: '2026-05-05', endDate: '2026-06-05', agents: ['Priya Mehta'], timeWindow: { from: '10:00', to: '21:00', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }, concurrentCalls: 6, language: 'English', voice: 'Priya Pro', recording: true, transcription: true },
];

// ─── CALLS ───────────────────────────────────────────────────────────────────
export const calls = [
  { id: 'CA001', leadId: 'L001', leadName: 'Arjun Sharma', phone: '+91 98201 34567', campaign: 'Mumbai Premium Buyers', agent: 'Priya Mehta', date: '2026-04-30', time: '10:23 AM', duration: '4:32', outcome: 'answered', sentiment: 'positive', sentimentScore: 82, score: 88, recording: true, transcript: true },
  { id: 'CA002', leadId: 'L004', leadName: 'Rohit Joshi', phone: '+91 88765 43210', campaign: 'Mumbai Premium Buyers', agent: 'Priya Mehta', date: '2026-04-30', time: '11:07 AM', duration: '7:15', outcome: 'answered', sentiment: 'positive', sentimentScore: 91, score: 94, recording: true, transcript: true },
  { id: 'CA003', leadId: 'L003', leadName: 'Kiran Patel', phone: '+91 99876 54321', campaign: 'Thane Affordable Homes', agent: 'Anita Singh', date: '2026-04-30', time: '09:45 AM', duration: '1:23', outcome: 'voicemail', sentiment: 'neutral', sentimentScore: 50, score: 30, recording: false, transcript: false },
  { id: 'CA004', leadId: 'L011', leadName: 'Kavya Rao', phone: '+91 93210 98765', campaign: 'Bengaluru Tech Buyers', agent: 'Rahul Iyer', date: '2026-04-30', time: '12:15 PM', duration: '5:48', outcome: 'answered', sentiment: 'positive', sentimentScore: 88, score: 91, recording: true, transcript: true },
  { id: 'CA005', leadId: 'L007', leadName: 'Meera Krishnamurthy', phone: '+91 96543 21098', campaign: 'Hyderabad Luxury', agent: 'Vikram Das', date: '2026-04-29', time: '3:30 PM', duration: '6:12', outcome: 'answered', sentiment: 'neutral', sentimentScore: 62, score: 65, recording: true, transcript: true },
  { id: 'CA006', leadId: 'L006', leadName: 'Amit Kulkarni', phone: '+91 98123 45678', campaign: 'Pune Growth Zone', agent: 'Sneha Verma', date: '2026-04-29', time: '11:00 AM', duration: '3:55', outcome: 'answered', sentiment: 'positive', sentimentScore: 78, score: 80, recording: true, transcript: true },
  { id: 'CA007', leadId: 'L002', leadName: 'Sunita Reddy', phone: '+91 91234 56789', campaign: 'Bengaluru Sellers Q2', agent: 'Rahul Iyer', date: '2026-04-29', time: '2:00 PM', duration: '0:00', outcome: 'no_answer', sentiment: 'neutral', sentimentScore: 50, score: 20, recording: false, transcript: false },
  { id: 'CA008', leadId: 'L009', leadName: 'Priti Agarwal', phone: '+91 95432 10987', campaign: 'Pune Growth Zone', agent: 'Sneha Verma', date: '2026-04-28', time: '10:30 AM', duration: '8:22', outcome: 'answered', sentiment: 'positive', sentimentScore: 85, score: 87, recording: true, transcript: true },
];

// ─── AGENTS ──────────────────────────────────────────────────────────────────
export const agents = [
  { id: 'A001', name: 'Priya Mehta', email: 'priya.mehta@propellect.com', role: 'Manager', status: 'active', callsToday: 47, callsMonth: 312, conversions: 28, conversionRate: 8.97, avatar: 'PM', lastActive: '2 min ago' },
  { id: 'A002', name: 'Rahul Iyer', email: 'rahul.iyer@propellect.com', role: 'Agent', status: 'active', callsToday: 38, callsMonth: 267, conversions: 19, conversionRate: 7.12, avatar: 'RI', lastActive: '5 min ago' },
  { id: 'A003', name: 'Anita Singh', email: 'anita.singh@propellect.com', role: 'Agent', status: 'active', callsToday: 31, callsMonth: 198, conversions: 14, conversionRate: 7.07, avatar: 'AS', lastActive: '12 min ago' },
  { id: 'A004', name: 'Sneha Verma', email: 'sneha.verma@propellect.com', role: 'Agent', status: 'active', callsToday: 29, callsMonth: 187, conversions: 16, conversionRate: 8.56, avatar: 'SV', lastActive: '8 min ago' },
  { id: 'A005', name: 'Vikram Das', email: 'vikram.das@propellect.com', role: 'Agent', status: 'idle', callsToday: 22, callsMonth: 134, conversions: 9, conversionRate: 6.72, avatar: 'VD', lastActive: '35 min ago' },
  { id: 'A006', name: 'Neha Bansal', email: 'neha.bansal@propellect.com', role: 'Agent', status: 'offline', callsToday: 0, callsMonth: 89, conversions: 6, conversionRate: 6.74, avatar: 'NB', lastActive: '2 hours ago' },
];

// ─── PROPERTIES ──────────────────────────────────────────────────────────────
export const properties = [
  { id: 'P001', name: 'Lodha World Towers', address: 'Lower Parel, Mumbai, Maharashtra 400013', type: 'Apartment', bhk: 3, area: 1850, price: 32500000, status: 'available', amenities: ['Gym', 'Pool', 'Security', 'Parking', 'Clubhouse'], description: 'Luxurious 3BHK in one of Mumbai\'s most iconic towers with sea views.', matchedLeads: 12, image: null },
  { id: 'P002', name: 'Prestige Whitefield', address: 'Whitefield Main Road, Bengaluru 560066', type: 'Apartment', bhk: 2, area: 1200, price: 7800000, status: 'available', amenities: ['Gym', 'Pool', 'Security', 'Parking'], description: 'Modern 2BHK in Prestige\'s gated community, close to ITPL.', matchedLeads: 18, image: null },
  { id: 'P003', name: 'Godrej Infinity', address: 'Hinjewadi Phase 1, Pune 411057', type: 'Apartment', bhk: 3, area: 1450, price: 8500000, status: 'available', amenities: ['Gym', 'Pool', 'Security', 'Parking', 'Park'], description: 'Premium 3BHK near Rajiv Gandhi IT Park with world-class amenities.', matchedLeads: 9, image: null },
  { id: 'P004', name: 'DLF Camellias', address: 'Golf Course Road, Gurgaon 122001', type: 'Villa', bhk: 5, area: 6200, price: 280000000, status: 'available', amenities: ['Pool', 'Garden', 'Security', 'Gym', 'Spa', 'Theater'], description: 'Ultra-luxury 5BHK villa with private pool on Golf Course Road.', matchedLeads: 4, image: null },
  { id: 'P005', name: 'Sobha Lake Gardens', address: 'Bellandur, Bengaluru 560103', type: 'Apartment', bhk: 2, area: 1100, price: 6200000, status: 'sold', amenities: ['Gym', 'Security', 'Parking'], description: 'Lake-facing 2BHK in Sobha\'s premium enclave near Outer Ring Road.', matchedLeads: 0, image: null },
  { id: 'P006', name: 'Brigade Orchards', address: 'Devanahalli, Bengaluru 562110', type: 'Villa', bhk: 4, area: 3200, price: 18500000, status: 'available', amenities: ['Club', 'Pool', 'School', 'Hospital', 'Security'], description: 'Integrated township villa with full ecosystem - school, mall, hospital inside.', matchedLeads: 7, image: null },
  { id: 'P007', name: 'Hiranandani Powai', address: 'Hiranandani Gardens, Powai, Mumbai 400076', type: 'Apartment', bhk: 3, area: 1680, price: 24000000, status: 'rented', amenities: ['Gym', 'Pool', 'Security', 'Parking', 'Lake View'], description: 'Stunning 3BHK overlooking Powai Lake in Hiranandani\'s iconic township.', matchedLeads: 0, image: null },
  { id: 'P008', name: 'Aparna Sarovar', address: 'Nallagandla, Hyderabad 500019', type: 'Apartment', bhk: 3, area: 1750, price: 12500000, status: 'available', amenities: ['Pool', 'Gym', 'Security', 'Clubhouse', 'Garden'], description: 'Premium 3BHK with lake view in Aparna\'s flagship project near HITEC City.', matchedLeads: 11, image: null },
];

// ─── ACTIVITIES ──────────────────────────────────────────────────────────────
export const activities = [
  { id: 1, type: 'call', message: 'Call completed with Arjun Sharma — marked Hot lead', time: '2 min ago', user: 'Priya Mehta', icon: 'phone' },
  { id: 2, type: 'lead', message: 'New lead imported — Batch of 47 from MagicBricks portal', time: '15 min ago', user: 'System', icon: 'users' },
  { id: 3, type: 'campaign', message: 'Campaign "Bengaluru Tech Buyers" reached 50% dialed', time: '32 min ago', user: 'System', icon: 'megaphone' },
  { id: 4, type: 'followup', message: 'Follow-up SMS sent to 12 warm leads in Mumbai', time: '1 hr ago', user: 'Anita Singh', icon: 'message' },
  { id: 5, type: 'call', message: 'Call with Rohit Joshi — Buying intent score 94/100', time: '1 hr ago', user: 'Priya Mehta', icon: 'phone' },
  { id: 6, type: 'lead', message: 'Lead Priti Agarwal upgraded from Warm → Hot', time: '2 hr ago', user: 'Sneha Verma', icon: 'trending-up' },
  { id: 7, type: 'campaign', message: 'Campaign "Delhi NCR Investors" completed — 312/312 dialed', time: '3 hr ago', user: 'System', icon: 'check-circle' },
];

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
export const notifications = [
  { id: 1, type: 'call', message: 'Call with Kavya Rao completed — Hot Lead!', time: '3 min ago', unread: true },
  { id: 2, type: 'lead', message: '47 new leads imported to Mumbai Premium Buyers', time: '18 min ago', unread: true },
  { id: 3, type: 'system', message: 'Campaign "Pune Growth Zone" paused — low answer rate', time: '45 min ago', unread: true },
  { id: 4, type: 'call', message: 'Rohit Joshi — Site visit scheduled for May 3rd', time: '1 hr ago', unread: false },
  { id: 5, type: 'lead', message: 'DND check completed — 3 leads flagged', time: '2 hr ago', unread: false },
  { id: 6, type: 'system', message: 'Monthly report generated — April 2026', time: '3 hr ago', unread: false },
];

// ─── CALL HOURS DATA ──────────────────────────────────────────────────────────
export const callsByHour = [
  { hour: '8 AM', calls: 12, answered: 8 }, { hour: '9 AM', calls: 34, answered: 24 },
  { hour: '10 AM', calls: 67, answered: 51 }, { hour: '11 AM', calls: 82, answered: 63 },
  { hour: '12 PM', calls: 45, answered: 31 }, { hour: '1 PM', calls: 28, answered: 18 },
  { hour: '2 PM', calls: 59, answered: 43 }, { hour: '3 PM', calls: 74, answered: 58 },
  { hour: '4 PM', calls: 88, answered: 69 }, { hour: '5 PM', calls: 91, answered: 71 },
  { hour: '6 PM', calls: 76, answered: 58 }, { hour: '7 PM', calls: 52, answered: 38 },
  { hour: '8 PM', calls: 31, answered: 21 },
];

// ─── SENTIMENT DATA ────────────────────────────────────────────────────────────
export const sentimentData = [
  { name: 'Positive', value: 58, color: '#10B981' },
  { name: 'Neutral', value: 28, color: '#6366F1' },
  { name: 'Negative', value: 14, color: '#EF4444' },
];

// ─── FUNNEL DATA ──────────────────────────────────────────────────────────────
export const funnelData = [
  { stage: 'Dialed', count: 1356, color: '#6366F1' },
  { stage: 'Answered', count: 867, color: '#3B82F6' },
  { stage: 'Qualified', count: 412, color: '#F59E0B' },
  { stage: 'Hot Lead', count: 187, color: '#F97316' },
  { stage: 'Converted', count: 44, color: '#10B981' },
];

// ─── TEAM MEMBERS ─────────────────────────────────────────────────────────────
export const teamMembers = [
  { id: 'TM001', name: 'Rajesh Kapoor', email: 'rajesh.kapoor@propellect.com', role: 'Admin', status: 'active', lastActive: '1 min ago', avatar: 'RK' },
  { id: 'TM002', name: 'Priya Mehta', email: 'priya.mehta@propellect.com', role: 'Manager', status: 'active', lastActive: '2 min ago', avatar: 'PM' },
  { id: 'TM003', name: 'Rahul Iyer', email: 'rahul.iyer@propellect.com', role: 'Agent', status: 'active', lastActive: '5 min ago', avatar: 'RI' },
  { id: 'TM004', name: 'Anita Singh', email: 'anita.singh@propellect.com', role: 'Agent', status: 'active', lastActive: '12 min ago', avatar: 'AS' },
  { id: 'TM005', name: 'Sneha Verma', email: 'sneha.verma@propellect.com', role: 'Agent', status: 'active', lastActive: '8 min ago', avatar: 'SV' },
  { id: 'TM006', name: 'Vikram Das', email: 'vikram.das@callaihm.com', role: 'Agent', status: 'active', lastActive: '35 min ago', avatar: 'VD' },
  { id: 'TM007', name: 'Kavita Sharma', email: 'kavita.sharma@callaihm.com', role: 'Viewer', status: 'invited', lastActive: 'Never', avatar: 'KS' },
  { id: 'TM008', name: 'Aryan Mehta', email: 'aryan.mehta@callaihm.com', role: 'Agent', status: 'suspended', lastActive: '3 days ago', avatar: 'AM' },
];

// ─── VOICE OPTIONS ────────────────────────────────────────────────────────────
export const voices = [
  { id: 'V001', name: 'Priya Pro', gender: 'Female', accent: 'Mumbai English', language: 'English', rating: 4.8 },
  { id: 'V002', name: 'Arjun Pro', gender: 'Male', accent: 'Neutral Indian', language: 'English', rating: 4.7 },
  { id: 'V003', name: 'Kavitha Pro', gender: 'Female', accent: 'South Indian', language: 'English / Telugu', rating: 4.9 },
  { id: 'V004', name: 'Raj Pro', gender: 'Male', accent: 'Delhi Hindi', language: 'Hindi', rating: 4.6 },
  { id: 'V005', name: 'Meera Pro', gender: 'Female', accent: 'Neutral Hindi', language: 'Hindi / English', rating: 4.8 },
  { id: 'V006', name: 'Suresh Pro', gender: 'Male', accent: 'Bengaluru', language: 'English / Kannada', rating: 4.5 },
];

// ─── BILLING HISTORY ──────────────────────────────────────────────────────────
export const billingHistory = [
  { id: 'INV-2026-04', date: 'Apr 1, 2026', amount: 29999, status: 'paid', format: 'PDF' },
  { id: 'INV-2026-03', date: 'Mar 1, 2026', amount: 29999, status: 'paid', format: 'PDF' },
  { id: 'INV-2026-02', date: 'Feb 1, 2026', amount: 14999, status: 'paid', format: 'PDF' },
  { id: 'INV-2026-01', date: 'Jan 1, 2026', amount: 14999, status: 'paid', format: 'PDF' },
];

// ─── AI INSIGHTS ──────────────────────────────────────────────────────────────
export const aiInsights = [
  { type: 'success', text: 'Calls between 10–11 AM have 34% higher answer rate. Schedule more calls in this window.' },
  { type: 'warning', text: 'Leads from "Ad" source have 18% lower conversion vs referrals. Review ad targeting strategy.' },
  { type: 'success', text: '"Site visit" mentioned in calls leads to 3.2x higher conversion. Train agents to offer visits early.' },
  { type: 'danger', text: 'Friday after 4 PM shows 61% no-answer rate. Avoid scheduling calls in this window.' },
  { type: 'success', text: 'Multilingual calls (Hindi+English) show 22% better engagement with Tier-2 city leads.' },
];

export const formatBudget = (amount: number) => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(0)}L`;
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const statusColors: Record<string, string> = {
  hot: 'bg-[#10B981]/20 text-[#10B981]',
  warm: 'bg-[#F59E0B]/20 text-[#F59E0B]',
  cold: 'bg-[#6366F1]/20 text-[#6366F1]',
  not_interested: 'bg-[#EF4444]/20 text-[#EF4444]',
  active: 'bg-[#10B981]/20 text-[#10B981]',
  paused: 'bg-[#F59E0B]/20 text-[#F59E0B]',
  completed: 'bg-[#6366F1]/20 text-[#6366F1]',
  draft: 'bg-[#64748B]/20 text-[#94A3B8]',
  answered: 'bg-[#10B981]/20 text-[#10B981]',
  no_answer: 'bg-[#EF4444]/20 text-[#EF4444]',
  voicemail: 'bg-[#F59E0B]/20 text-[#F59E0B]',
  available: 'bg-[#10B981]/20 text-[#10B981]',
  sold: 'bg-[#6366F1]/20 text-[#6366F1]',
  rented: 'bg-[#F59E0B]/20 text-[#F59E0B]',
};
