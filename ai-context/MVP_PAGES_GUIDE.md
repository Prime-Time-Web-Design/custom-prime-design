# MVP PAGES GUIDE

This file defines the essential pages needed for a conversion-focused healthcare website MVP that transforms visitors into booked appointments.

## MVP CONVERSION FUNNEL OVERVIEW

```
Traffic Sources → Homepage → Service Pages → Trust Building → Booking → Follow-up
     ↓              ↓           ↓              ↓            ↓         ↓
   SEO/Ads      Hero/Value   Detailed Info   Team/Reviews   Appointment  Confirmation
                   ↓              ↓              ↓            ↓         ↓
              Service Overview → FAQ/Process → Contact Info → Payment → Welcome Sequence
```

**Conversion Goal:** 8-15% of visitors book consultations (vs industry 2-5%)

## ESSENTIAL PAGES FOR CLIENT CONVERSION

### **1. Homepage** ⭐ CRITICAL
**File:** `content/pages/home.yaml` (EXISTS - needs optimization)

**Purpose:** First impression, value proposition, conversion funnel entry
**Target Conversion:** 25-35% continue to service pages

**Required Blocks:**
```yaml
blocks:
  - __typename: "PageBlocksHero"
    heading: "Transform Your Mental Health Journey"
    subheading: "Compassionate, evidence-based therapy that actually works"
    cta_text: "Book Free Consultation"
    cta_link: "/contact"
    
  - __typename: "PageBlocksServiceListing" 
    services: [Individual, Couples, Virtual, Group]
    
  - __typename: "PageBlocksCarousel"
    testimonials: [5+ client stories with photos]
    
  - __typename: "PageBlocksCta"
    heading: "Ready to start healing?"
    cta_text: "Schedule Your Free Consultation"
```

**Content Strategy:**
- **Hero:** Clear value prop + risk-free offer (free consultation)
- **Social Proof:** 5+ testimonials with photos and therapy types
- **Service Overview:** Brief descriptions with "Learn More" CTAs
- **Process:** 3-step "How It Works" section
- **Newsletter:** Lead magnet signup for nurturing

### **2. Contact/Get Started Page** ⭐ CRITICAL
**File:** `content/pages/contact.yaml` (MISSING - MUST CREATE)

**Purpose:** Primary conversion page, multiple contact methods
**Target Conversion:** 40-60% complete contact form or call

**Required Blocks:**
```yaml
blocks:
  - __typename: "PageBlocksHeader"
    heading: "Let's Start Your Healing Journey"
    subheading: "Multiple ways to connect - choose what feels comfortable"
    
  - __typename: "PageBlocksAppointmentBookingBlock"
    title: "Book Your Free 15-Minute Consultation"
    services: ["Individual Therapy", "Couples Therapy", "Virtual Sessions"]
    
  - __typename: "PageBlocksRichText"
    content: |
      ## Contact Information
      **Phone:** (555) 123-4567
      **Text:** (555) 987-6543  
      **Email:** hello@practicename.com
      **Address:** 123 Healing Way, City, ST 12345
      
      ## Office Hours
      Monday - Thursday: 9am - 6pm
      Friday: 9am - 3pm
      Emergency: 24/7 crisis line available
```

**Content Strategy:**
- **Multiple contact options** (phone, text, email, form, booking)
- **Free consultation offer** to reduce barriers
- **Crisis support information** for emergencies
- **Office location and hours** for transparency
- **What to expect** from initial contact

### **3. Service Pages** ⭐ CRITICAL
**Files:** 
- `individual-therapy.yaml` (EXISTS - needs expansion)
- `couples-therapy.yaml` (EXISTS - needs expansion)  
- `virtual-therapy.yaml` (EXISTS - needs expansion)
- `group-therapy-organizational-wellness.yaml` (EXISTS - needs expansion)

**Purpose:** Detailed service information, address specific needs
**Target Conversion:** 15-25% proceed to booking

**Service Page Template:**
```yaml
template: "ServiceTemplate"
blocks:
  - __typename: "PageBlocksHero"
    heading: "Individual Therapy That Creates Real Change"
    subheading: "Personalized treatment for anxiety, depression, trauma, and life transitions"
    
  - __typename: "PageBlocksRichText"
    content: |
      ## What You'll Experience
      - Compassionate, non-judgmental space
      - Evidence-based treatment approaches (CBT, EMDR, DBT)
      - Personalized treatment plans
      - Flexible scheduling options
      
      ## Common Concerns We Address
      - Anxiety and panic attacks
      - Depression and mood disorders
      - Trauma and PTSD
      - Relationship issues
      - Life transitions and stress
      
      ## Treatment Approaches
      **Cognitive Behavioral Therapy (CBT)**
      Practical strategies for changing thought patterns
      
      **EMDR Therapy**
      Specialized trauma treatment for lasting healing
      
  - __typename: "PageBlocksCta"
    heading: "Ready to start feeling better?"
    cta_text: "Schedule Free Consultation"
    cta_link: "/contact"
```

**Content Strategy per Service:**
- **Clear benefits** and outcomes
- **Specific conditions treated**
- **Treatment methodologies** explained simply
- **What to expect** in sessions
- **Success stories** relevant to that service
- **Strong CTA** to booking page

### **4. About/Meet Our Team Page** ⭐ CRITICAL  
**File:** `content/pages/meet-our-team.yaml` (EXISTS - good content)

**Purpose:** Build trust and credibility, practitioner connection
**Target Conversion:** 20-30% proceed to booking after reading

**Enhancement Recommendations:**
- Add more personal stories and "why I became a therapist"
- Include photos of practitioners in office setting
- Add client testimonials specific to each practitioner
- Include credentials and specialization badges
- Add "Book with [Name]" CTAs for each practitioner

### **5. FAQ Page** ⭐ CRITICAL
**File:** `content/pages/faq.yaml` (MISSING - MUST CREATE)

**Purpose:** Address common concerns that prevent booking
**Target Conversion:** 35-45% proceed to contact after reading

**Essential FAQ Categories:**
```yaml
blocks:
  - __typename: "PageBlocksRichText"
    content: |
      ## Getting Started
      **What happens in the first session?**
      Your first session is about getting to know you and understanding your goals...
      
      **Do you accept insurance?**
      We accept most major insurance plans including Blue Cross, Aetna, UnitedHealth...
      
      **How long does therapy typically take?**
      Most clients see improvement within 6-12 sessions, though this varies...
      
      ## Practical Information  
      **What if I need to cancel or reschedule?**
      We require 24-hour notice for cancellations...
      
      **Is therapy confidential?**
      Absolutely. Everything discussed in therapy is confidential with limited exceptions...
      
      **Do you offer virtual sessions?**
      Yes, we offer secure video sessions through our HIPAA-compliant platform...
      
      ## Financial Information
      **What are your rates?**
      Individual sessions are $120, couples sessions are $150...
      
      **Do you offer payment plans?**
      Yes, we offer flexible payment options for those who need them...
```

### **6. Booking/Appointment Page** ⭐ CRITICAL
**File:** `content/pages/appointments.yaml` (EXISTS - needs optimization)

**Purpose:** Seamless booking experience, reduce abandonment
**Target Conversion:** 70-85% complete booking process

**Optimized Booking Flow:**
```yaml
blocks:
  - __typename: "PageBlocksAppointmentBookingBlock"
    title: "Schedule Your Appointment"
    subtitle: "Choose your preferred time and provider"
    
    # Multi-step booking process
    steps:
      1: "Select Service Type"
      2: "Choose Date & Time" 
      3: "Select Provider"
      4: "Your Information"
      5: "Confirmation"
      
    # Service options
    services:
      - name: "Free 15-Minute Consultation"
        description: "Get to know us, ask questions, no commitment"
        duration: "15 minutes"
        price: "Free"
        
      - name: "Individual Therapy Session"  
        description: "One-on-one therapy for personal growth"
        duration: "50 minutes"
        price: "$120"
        
      - name: "Couples Therapy Session"
        description: "Relationship counseling for couples"
        duration: "50 minutes" 
        price: "$150"
```

## SUPPORTING PAGES FOR TRUST & COMPLIANCE

### **7. Privacy Policy & HIPAA** 🔒 LEGAL REQUIREMENT
**File:** `content/pages/privacy-policy.yaml` (MISSING - MUST CREATE)

**Purpose:** Legal compliance, build trust through transparency
**Required Content:**
- HIPAA compliance statement
- Data collection and usage policies
- Patient rights and protections
- Contact information for privacy concerns

### **8. New Patient Information** 📋 CONVERSION SUPPORT
**File:** `content/pages/new-patient-info.yaml` (MISSING - RECOMMENDED)

**Purpose:** Reduce anxiety, set expectations, improve show-up rates
**Content Strategy:**
- What to expect in first session
- How to prepare for therapy
- Office policies and procedures
- Intake forms and paperwork

### **9. Insurance & Payment** 💳 CONVERSION SUPPORT  
**File:** `content/pages/insurance-payment.yaml` (MISSING - RECOMMENDED)

**Purpose:** Address financial concerns, improve accessibility
**Content Strategy:**
- Accepted insurance providers
- Out-of-network options
- Payment plans and assistance
- Billing procedures and policies

### **10. Crisis Resources** 🆘 ETHICAL REQUIREMENT
**File:** `content/pages/crisis-resources.yaml` (MISSING - MUST CREATE)

**Purpose:** Safety net, professional responsibility
**Content Strategy:**
- 24/7 crisis hotlines
- Emergency room locations
- When to seek immediate help
- After-hours contact protocols

## PAGE OPTIMIZATION PRIORITIES

### **Phase 1: Critical for Launch (MVP)**
1. ✅ Homepage (exists, optimize)
2. ❌ Contact/Get Started page (MUST CREATE)
3. ❌ Enhanced Service pages (expand existing)
4. ✅ About/Team page (exists, enhance)
5. ❌ FAQ page (MUST CREATE)
6. ✅ Booking page (exists, optimize)
7. ❌ Privacy Policy (MUST CREATE)

### **Phase 2: Trust & Conversion Optimization**
1. New Patient Information page
2. Insurance & Payment page  
3. Crisis Resources page
4. Enhanced testimonials/case studies
5. Outcome tracking and success metrics

### **Phase 3: Growth & SEO**
1. Blog/Resources section
2. Condition-specific landing pages
3. Local SEO location pages
4. Therapist individual profile pages
5. Group therapy schedules

## CONVERSION FUNNEL METRICS TO TRACK

### **Per Page Conversion Rates:**
- **Homepage → Service pages:** 25-35%
- **Service pages → Contact page:** 15-25%  
- **Contact page → Booking:** 40-60%
- **FAQ page → Contact:** 35-45%
- **Team page → Booking:** 20-30%

### **Overall Funnel Performance:**
- **Website visitors → Appointment booked:** 8-15%
- **Contact form submissions → Show rate:** 85-95%
- **Free consultation → Paid client:** 60-75%

### **Page Performance Requirements:**
- **Load time:** <2 seconds all pages
- **Mobile optimization:** 95+ Lighthouse score
- **Accessibility:** WCAG 2.1 AA compliance
- **SEO:** 90+ Lighthouse score

## CONTENT TONE & MESSAGING STRATEGY

### **Universal Messaging Principles:**
- **Warm but professional** - approachable yet credible
- **Hope-focused** - emphasize positive outcomes
- **Client-centered** - focus on their needs and goals
- **Evidence-based** - mention specific methodologies
- **Inclusive** - welcoming to all identities and backgrounds

### **Conversion-Focused Copywriting:**
- **Headlines:** Clear benefit statements (not clever wordplay)
- **CTAs:** Action-oriented, low-pressure ("Get Started," "Learn More")
- **Social proof:** Specific outcomes and testimonials
- **Risk reversal:** Free consultations, satisfaction guarantees
- **Urgency:** Gentle (limited availability vs aggressive pressure)

This MVP page structure creates a complete conversion funnel that builds trust, addresses concerns, and guides visitors toward booking appointments while maintaining the professional standards required for healthcare websites.