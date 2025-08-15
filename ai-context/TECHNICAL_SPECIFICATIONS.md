# TECHNICAL SPECIFICATIONS

This file defines the technical architecture, development patterns, and integration requirements for the healthcare website template system.

## CORE ARCHITECTURE

### **Fork-and-Evolve Template System**

**Master Template Repository:**
```
custom-prime-design/
├── master-template/          # Core template (this repo)
├── client-sites/            # Individual client forks
│   ├── practice-name-1/     # Client-specific customizations
│   ├── practice-name-2/     # Each gets own repo/deployment
│   └── practice-name-3/
└── shared-components/       # Reusable improvements
    ├── blocks/              # New block components
    ├── templates/           # New page templates
    └── integrations/        # Third-party connectors
```

**Development Workflow:**
1. **Client Project Init:** Fork master template to new client repo
2. **Customization:** Modify colors, fonts, content, add client-specific features
3. **Innovation Feedback:** Reusable improvements flow back to master template
4. **Template Evolution:** Master template continuously improved from client work

### **Technology Stack**

**Frontend Framework:**
- **Next.js 14+** with App Router for optimal performance
- **TypeScript** for type safety and developer experience
- **Tailwind CSS 4** for utility-first styling with customization
- **Motion** for smooth animations and interactions

**Content Management:**
- **TinaCMS** for live visual editing and content management
- **YAML-based content** stored in Git for version control
- **Generated TypeScript types** for type-safe content handling
- **Real-time preview** with hot reloading during editing

**Performance & Optimization:**
- **Next.js Image Optimization** with Sharp for automatic WebP/AVIF
- **Static Site Generation** for maximum performance and SEO
- **Bundle Analysis** for optimization monitoring
- **Service Workers** for offline functionality and caching

## INTEGRATION ARCHITECTURE

### **NexHealth Appointment Booking**

**Implementation Strategy:**
```typescript
// NexHealth API Integration
interface NexHealthConfig {
  apiKey: string;
  practiceId: string;
  locationId: string;
  serviceTypes: NexHealthService[];
}

// Booking Flow Components
<AppointmentBooking
  nexHealthConfig={config}
  serviceTypes={["initial-consultation", "therapy-session"]}
  availabilityWindow={30} // days
  customization={{
    colors: theme.colors,
    branding: practice.branding
  }}
/>
```

**Required Features:**
- Service-specific booking (individual, couples, group therapy)
- Real-time availability calendar
- Client intake form integration
- Automated confirmation/reminder emails
- Insurance verification workflow
- Multi-location support for larger practices

### **Essential Integrations**

**Payment Processing:**
- **Stripe Elements** for secure payment handling
- **Insurance verification** API integration
- **Subscription billing** for membership plans
- **HIPAA-compliant** payment flows

**Email Marketing:**
- **Mailchimp/ConvertKit** for newsletter management
- **Automated sequences** for new client onboarding
- **Lead nurturing campaigns** based on user behavior
- **Newsletter signup** with lead magnets

**Analytics & Tracking:**
- **Google Analytics 4** with enhanced ecommerce
- **Facebook Pixel** for retargeting campaigns
- **Hotjar/FullStory** for user behavior analysis
- **Custom event tracking** for appointment conversions

**CRM Integration:**
- **SimplePractice API** for existing workflow integration
- **TherapyNotes** connector for client management
- **Custom CRM solutions** for larger practices
- **Lead scoring and qualification** automation

## CUSTOMIZATION SYSTEM

### **Design Token Architecture**

**Highly Customizable Elements:**
```typescript
// Design Tokens (per client)
interface BrandTokens {
  colors: {
    primary: string;      // #4F46E5 (adjustable)
    secondary: string;    // #10B981 (adjustable)
    accent: string;       // #F59E0B (adjustable)
    neutral: string[];    // Gray scale (adjustable)
  };
  typography: {
    headings: string;     // Font family (customizable)
    body: string;         // Font family (customizable)
    sizes: number[];      // Scale (customizable)
  };
  spacing: number[];      // Space scale (customizable)
  borderRadius: number;   // Corner radius (customizable)
}
```

**Rigid Component Structure:**
- **Block components** maintain consistent internal logic
- **Template layouts** preserve usability patterns
- **Navigation structure** stays functionally consistent
- **Form workflows** maintain conversion optimization

### **TinaCMS Live Editing Configuration**

**Editable Content Areas:**
```yaml
# Example: Hero Block Configuration
hero_block:
  __typename: "PageBlocksHero"
  heading: "Transform Your Mental Health Journey" # Editable
  subheading: "Compassionate therapy for individuals..." # Editable
  cta_text: "Schedule Consultation" # Editable
  cta_link: "/appointments" # Editable
  image_collage: # Visual editor for image selection
    - src: "/hero-1.jpg"
    - src: "/hero-2.jpg"
  layout: "split" # Dropdown: split, centered, full-width
```

**Content Types:**
- **Pages:** Dynamic routing with YAML content files
- **Global Settings:** Navigation, contact info, branding
- **Service Listings:** Therapy types with detailed descriptions  
- **Team Members:** Provider profiles with credentials
- **Testimonials:** Client reviews with approval workflow

## PERFORMANCE REQUIREMENTS

### **Core Web Vitals Targets**

**Largest Contentful Paint (LCP):** <1.2 seconds
- Optimized hero images with preloading
- Above-the-fold content prioritization
- CDN delivery for all assets

**First Input Delay (FID):** <50 milliseconds  
- Minimal JavaScript execution
- Code splitting and lazy loading
- Service worker implementation

**Cumulative Layout Shift (CLS):** <0.05
- Defined dimensions for all images
- Font loading optimization
- Reserved space for dynamic content

### **Additional Performance Metrics**

**Time to First Byte (TTFB):** <200ms
- Static generation where possible
- Edge caching strategies
- Optimized API responses

**Speed Index:** <1.5 seconds
- Critical CSS inlining
- Progressive image loading
- Optimized asset delivery

## DEPLOYMENT ARCHITECTURE

### **Self-Hosting Strategy**

**Recommended Hosting Stack:**
```yaml
# Vercel Deployment (Recommended)
platform: "Vercel"
features:
  - Edge Functions for API routes
  - Automatic SSL certificates
  - Built-in CDN and image optimization
  - Preview deployments for staging
  - Custom domains with DNS management

# Alternative: Netlify
platform: "Netlify"  
features:
  - Form handling with spam protection
  - Split testing built-in
  - Edge functions for serverless APIs
  - Git-based deployment workflow

# Enterprise: AWS/Digital Ocean
platform: "Custom VPS"
features:
  - Full control over infrastructure
  - Custom server configurations
  - Advanced caching strategies
  - Multi-region deployment
```

**Deployment Workflow:**
1. **Development:** Local development with TinaCMS
2. **Staging:** Preview deployments for client review
3. **Production:** Automated deployment from Git
4. **Monitoring:** Uptime and performance monitoring
5. **Backups:** Automated content and code backups

### **Security & Compliance**

**HIPAA Compliance Requirements:**
- **SSL/TLS encryption** for all data transmission
- **Secure form handling** with proper validation
- **Data encryption at rest** for any stored information
- **Access logging** for audit trails
- **Regular security updates** and vulnerability scanning

**Content Security Policy:**
```javascript
const securityHeaders = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "img-src 'self' data: https:",
    "script-src 'self' 'unsafe-inline'", // TinaCMS requirement
    "style-src 'self' 'unsafe-inline'",
    "connect-src 'self' https://api.nexhealth.com"
  ].join('; ')
};
```

## DEVELOPMENT STANDARDS

### **Code Quality Requirements**

**TypeScript Configuration:**
- **Strict mode enabled** for maximum type safety
- **Custom types** for all TinaCMS content schemas
- **Interface definitions** for all API integrations
- **Proper error handling** with typed error responses

**Testing Strategy:**
- **Component testing** with React Testing Library
- **E2E testing** with Playwright for critical paths
- **Performance testing** with Lighthouse CI
- **Accessibility testing** with axe-core

**Code Organization:**
```
src/
├── components/
│   ├── atoms/           # Basic UI elements
│   ├── molecules/       # Composed components
│   ├── blocks/          # TinaCMS page blocks
│   ├── templates/       # Full page layouts
│   └── layout/          # Site-wide layout components
├── lib/
│   ├── integrations/    # Third-party API clients
│   ├── utils/          # Utility functions
│   └── types/          # TypeScript definitions
├── styles/
│   ├── globals.css     # Global styles and Tailwind
│   └── components/     # Component-specific styles
└── app/                # Next.js App Router pages
```

### **Client Handoff Process**

**Delivery Checklist:**
- [ ] Performance audit (95+ Lighthouse scores)
- [ ] Accessibility compliance (WCAG 2.1 AA)
- [ ] Mobile responsiveness testing
- [ ] Cross-browser compatibility
- [ ] TinaCMS training documentation
- [ ] Integration testing and API key setup
- [ ] DNS and hosting configuration
- [ ] Analytics and tracking implementation
- [ ] SEO optimization and schema markup
- [ ] Security review and compliance check

**Documentation Provided:**
- Content editing guide (TinaCMS usage)
- Integration setup instructions (NexHealth, Analytics)
- Troubleshooting guide and FAQ
- Maintenance and update procedures
- Contact information for ongoing support