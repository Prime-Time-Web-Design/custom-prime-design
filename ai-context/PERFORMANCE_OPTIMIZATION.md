# PERFORMANCE OPTIMIZATION GUIDELINES

This file defines specific performance optimization strategies and implementation details for achieving industry-leading website performance.

## PERFORMANCE TARGETS

### **Core Web Vitals - Minimum Standards**
- **Largest Contentful Paint (LCP):** <1.2 seconds (Target: <0.8s)
- **First Input Delay (FID):** <50ms (Target: <20ms) 
- **Cumulative Layout Shift (CLS):** <0.05 (Target: <0.02)

### **Additional Performance Metrics**
- **Time to First Byte (TTFB):** <200ms (Target: <100ms)
- **Speed Index:** <1.5 seconds (Target: <1.0s)
- **Total Blocking Time:** <150ms (Target: <50ms)
- **Lighthouse Score:** 95+ all categories (Target: 98+)

### **Healthcare-Specific Conversion Metrics**
- **Above-fold load time:** <600ms (Critical for appointment bookings)
- **Form interaction delay:** <10ms (Essential for contact forms)
- **Image load progression:** <1s for hero images
- **Mobile performance parity:** 95%+ of desktop scores

## OPTIMIZATION STRATEGIES

### **1. Image Optimization (Critical for Healthcare Sites)**

**Implementation:**
```javascript
// next.config.js - Advanced image optimization
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'], // Next-gen formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 86400, // 24 hours
    dangerouslyAllowSVG: true, // For logos
    unoptimized: false,
  },
};
```

**Best Practices:**
- **Hero images:** Always preload with `<link rel="preload">`
- **Provider photos:** Optimize for 400x400px at 2x resolution
- **Before/after galleries:** Lazy load with intersection observer
- **Testimonial images:** 100x100px optimized avatars
- **Background images:** Use CSS background-image for decorative elements

**Custom OptimizedImage Component:**
```typescript
// Enhanced image component for healthcare content
interface OptimizedImageProps {
  src: string;
  alt: string;
  priority?: boolean; // Above-fold images
  sizes?: string;
  className?: string;
  quality?: number; // 75-90 for healthcare professional images
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  priority = false,
  quality = 85,
  ...props
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      quality={quality}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={`object-cover transition-opacity duration-300 ${props.className}`}
      {...props}
    />
  );
};
```

### **2. Font Loading Optimization**

**Strategy:** Minimize layout shift and improve perceived performance
```typescript
// app/layout.tsx - Optimized font loading
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'optional', // Prevents layout shift
  preload: true,
  fallback: ['Arial', 'sans-serif'], // System fallback
});
```

**Font Loading Best Practices:**
- **Single font family** to minimize requests
- **Variable fonts** when multiple weights needed
- **Font-display: optional** to prevent layout shift
- **Preconnect** to Google Fonts early
- **System font fallbacks** with similar metrics

### **3. JavaScript Optimization**

**Code Splitting Strategy:**
```typescript
// Dynamic imports for non-critical components
const AppointmentBooking = dynamic(
  () => import('@/components/blocks/AppointmentBookingBlock'),
  { 
    ssr: false, // Only load client-side
    loading: () => <AppointmentBookingSkeleton />
  }
);

const NewsletterSignup = dynamic(
  () => import('@/components/blocks/NewsletterSignupBlock'),
  { ssr: true } // Above-fold component, include in SSR
);
```

**Bundle Optimization:**
- **Tree shaking** for unused library code
- **Dynamic imports** for below-fold components
- **Service worker** for caching strategies
- **Minimal third-party scripts** (only essential tracking)

### **4. CSS Optimization**

**Tailwind CSS Configuration:**
```javascript
// tailwind.config.js - Optimized for production
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Custom design tokens only (remove unused defaults)
    colors: {
      // Healthcare brand colors only
      primary: '#4F46E5',
      secondary: '#10B981',
      // ... only needed colors
    }
  },
  plugins: [
    // Only essential plugins
  ],
  purge: {
    // Aggressive unused CSS removal
    enabled: process.env.NODE_ENV === 'production',
    safelist: [
      // TinaCMS classes that might not be detected
      'prose', 'prose-lg', 'tina-prose'
    ]
  }
};
```

**CSS Best Practices:**
- **Critical CSS inlining** for above-fold content
- **Unused CSS elimination** with PurgeCSS
- **CSS containment** for animation performance
- **Minimal external stylesheets**

### **5. Caching Strategies**

**Next.js Caching Configuration:**
```javascript
// next.config.js
const nextConfig = {
  // Static asset caching
  async headers() {
    return [
      {
        source: '/(.*)\\.(ico|png|jpg|jpeg|webp|avif|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)\\.(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

**Content Caching Strategy:**
- **Static pages:** Cache for 24 hours, revalidate on build
- **Dynamic content:** Cache for 1 hour, revalidate on demand
- **Images:** Cache for 1 year with immutable flag
- **API responses:** Cache based on content sensitivity

### **6. Third-Party Script Optimization**

**Script Loading Strategy:**
```typescript
// app/layout.tsx - Optimized script loading
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* Critical preconnects */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://api.nexhealth.com" />
        
        {/* DNS prefetch for non-critical resources */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body>
        {children}
        
        {/* Load analytics after page interaction */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
```

**Third-Party Integration Rules:**
- **Defer non-critical scripts** until user interaction
- **Minimize tracking pixels** (only essential analytics)
- **Self-host** critical third-party resources when possible
- **Use facades** for social media embeds

## MONITORING AND MEASUREMENT

### **Performance Monitoring Stack**

**Real User Monitoring (RUM):**
```typescript
// lib/performance.ts
export function trackWebVitals(metric: Metric) {
  // Send to analytics
  gtag('event', metric.name, {
    custom_parameter_1: metric.id,
    custom_parameter_2: Math.round(metric.value),
    custom_parameter_3: metric.label,
  });
  
  // Send to performance monitoring service
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/analytics', {
      method: 'POST',
      body: JSON.stringify(metric),
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
```

**Automated Performance Testing:**
- **Lighthouse CI** in deployment pipeline
- **WebPageTest** for synthetic monitoring
- **Core Web Vitals monitoring** with real user data
- **Performance budgets** with automated alerts

### **Performance Budget Guidelines**

**Resource Limits:**
- **Total page weight:** <500KB initial load, <1MB total
- **JavaScript bundle:** <150KB gzipped
- **CSS bundle:** <50KB gzipped
- **Image assets:** <100KB per above-fold image
- **Third-party scripts:** <50KB total

**Timing Budgets:**
- **First Paint:** <400ms
- **Largest Contentful Paint:** <800ms
- **Time to Interactive:** <1.5s
- **First Input Delay:** <20ms

## HEALTHCARE-SPECIFIC OPTIMIZATIONS

### **Appointment Booking Performance**

**Critical Path Optimization:**
1. **Preload booking calendar** data on page entry
2. **Optimize form validation** with debounced inputs
3. **Minimize booking flow steps** to reduce abandonment
4. **Progressive enhancement** for JavaScript failures

**Implementation:**
```typescript
// Optimized appointment booking
const AppointmentBooking = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  
  // Preload next 7 days of availability
  useEffect(() => {
    const preloadAvailability = async () => {
      const slots = await nexHealthAPI.getAvailability({
        days: 7,
        serviceTypes: ['consultation', 'therapy']
      });
      setAvailableSlots(slots);
    };
    
    preloadAvailability();
  }, []);
  
  return (
    <OptimizedBookingForm 
      availableSlots={availableSlots}
      onSubmit={handleBookingSubmission}
    />
  );
};
```

### **Trust Signal Performance**

**Fast-Loading Trust Elements:**
- **Provider photos:** Optimized to 400x400px, <50KB each
- **Testimonials:** Text-only with lazy-loaded avatars
- **Credentials:** SVG badges, <10KB total
- **Before/after galleries:** Progressive loading with placeholders

## MOBILE OPTIMIZATION

### **Mobile-First Performance Strategy**

**Critical Mobile Optimizations:**
- **Touch targets:** Minimum 44px tap area
- **Viewport optimization:** Proper meta viewport tag
- **Reduced motion** respect for accessibility
- **Offline functionality** for core pages

**Mobile Resource Priorities:**
1. **Critical rendering path:** Above-fold content only
2. **Progressive enhancement:** Feature additions for larger screens
3. **Adaptive loading:** Reduced image quality on slow connections
4. **Service worker caching:** Offline page access

### **Connection-Aware Loading**

```typescript
// Adaptive loading based on connection quality
const useAdaptiveLoading = () => {
  const [slowConnection, setSlowConnection] = useState(false);
  
  useEffect(() => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      setSlowConnection(
        connection.effectiveType === '2g' || 
        connection.effectiveType === 'slow-2g'
      );
    }
  }, []);
  
  return { slowConnection };
};
```

## CONVERSION RATE OPTIMIZATION

### **Performance-Driven CRO**

**Key Metrics Impact:**
- **1 second delay** = 7% reduction in conversions
- **3+ second load time** = 32% bounce rate increase
- **Mobile slow loading** = 53% abandonment rate

**Optimization Priorities:**
1. **Hero section:** <600ms load time
2. **Contact forms:** <10ms interaction delay  
3. **Appointment booking:** <1s calendar display
4. **Provider profiles:** <800ms image load

**A/B Testing Performance:**
- **Test performance variations** alongside design changes
- **Monitor bounce rates** as primary metric
- **Track appointment completion rates** by performance bucket
- **Measure form abandonment** at each step