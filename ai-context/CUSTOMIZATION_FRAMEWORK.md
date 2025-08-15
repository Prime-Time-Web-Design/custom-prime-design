# CUSTOMIZATION FRAMEWORK

This file defines the system for achieving maximum visual customization while maintaining rigid component structure and functionality for optimal user experience and conversion rates.

## DESIGN PHILOSOPHY

### **Flexible Visual Identity, Rigid User Experience**

**Core Principle:** Allow unlimited brand expression while preserving proven healthcare conversion patterns.

**Customizable Elements:**
- Brand colors, typography, imagery, spacing, animations
- Visual style, content tone, marketing messages
- Layout variations within predefined structures

**Rigid Elements (Never Change):**
- Component internal logic and user flows
- Accessibility patterns and semantic structure
- Conversion-optimized layouts and interactions
- Form workflows and validation patterns

## DESIGN TOKEN SYSTEM

### **Brand Customization Architecture**

```typescript
// Brand configuration per client
interface ClientBrandConfig {
  identity: {
    name: string;
    tagline: string;
    logo: {
      primary: string;    // Light backgrounds
      secondary: string;  // Dark backgrounds  
      mark: string;       // Icon only
    };
  };
  
  colors: {
    primary: {
      50: string;   // Lightest tint
      500: string;  // Main brand color
      900: string;  // Darkest shade
    };
    secondary: ColorScale;
    accent: ColorScale;
    neutral: ColorScale;
    semantic: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
  };
  
  typography: {
    fonts: {
      heading: string;    // Google Font name
      body: string;       // Body text font
      accent: string;     // Special elements
    };
    scales: {
      mobile: number[];   // [12, 14, 16, 18, 24, 32, 48]
      desktop: number[];  // [14, 16, 18, 20, 28, 40, 64]
    };
  };
  
  spacing: {
    unit: number;        // Base unit (4px, 8px, etc.)
    scale: number[];     // Multipliers [0.5, 1, 1.5, 2, 3, 4, 6, 8]
  };
  
  effects: {
    borderRadius: number;     // Corner radius consistency
    shadows: string[];        // Elevation shadows
    animations: {
      duration: number;       // Consistent timing
      easing: string;         // Motion curves
    };
  };
}
```

### **Dynamic Theme Generation**

```typescript
// Theme generator from brand config
export const generateTheme = (brandConfig: ClientBrandConfig) => {
  return {
    colors: {
      // Semantic color mapping
      'brand-primary': brandConfig.colors.primary[500],
      'brand-primary-light': brandConfig.colors.primary[50],
      'brand-primary-dark': brandConfig.colors.primary[900],
      
      // Conversion-critical elements (never change function)
      'cta-primary': brandConfig.colors.primary[500],
      'cta-hover': brandConfig.colors.primary[600],
      'form-focus': brandConfig.colors.primary[500],
      'success-state': brandConfig.colors.semantic.success,
    },
    
    typography: {
      fontFamily: {
        heading: [brandConfig.typography.fonts.heading, 'Arial', 'sans-serif'],
        body: [brandConfig.typography.fonts.body, 'system-ui', 'sans-serif'],
      }
    }
  };
};
```

## COMPONENT CUSTOMIZATION LEVELS

### **Level 1: Brand Identity (Fully Customizable)**

**Visual Brand Elements:**
- **Logo placement and sizing** (maintain aspect ratio)
- **Color scheme application** to all design tokens
- **Typography selection** from approved healthcare-friendly fonts
- **Image style and photography** following brand guidelines

**Implementation:**
```tsx
// Hero block with brand customization
export const HeroBlock = ({ data, theme }: HeroBlockProps) => {
  return (
    <section 
      className="hero-section"
      style={{ 
        backgroundColor: theme.colors.primary[50],
        borderColor: theme.colors.primary[200]
      }}
    >
      <div className="hero-content">
        <h1 style={{ 
          fontFamily: theme.typography.fonts.heading,
          color: theme.colors.primary[900]
        }}>
          {data.heading}
        </h1>
        
        {/* Layout and interaction patterns remain rigid */}
        <AppointmentCTA 
          variant="primary"
          theme={theme}
          onClick={handleAppointmentClick}
        />
      </div>
    </section>
  );
};
```

### **Level 2: Layout Variations (Controlled Flexibility)**

**Approved Layout Options:**
```typescript
interface LayoutVariation {
  heroLayout: 'split' | 'centered' | 'full-width';
  serviceDisplay: 'grid' | 'tabs' | 'accordion';
  teamLayout: 'cards' | 'list' | 'carousel';
  testimonialStyle: 'carousel' | 'grid' | 'featured';
}

// Each variation maintains conversion optimization
const layoutConfigs: Record<string, LayoutConfig> = {
  'split': {
    structure: 'two-column',
    ctaPlacement: 'right-column',
    imageRatio: '16:9',
    conversionOptimized: true
  },
  'centered': {
    structure: 'single-column',
    ctaPlacement: 'below-content',
    imageRatio: '3:2',
    conversionOptimized: true
  }
};
```

### **Level 3: Content Customization (TinaCMS Integration)**

**Editable Content Areas:**
```yaml
# TinaCMS schema for service block
service_block:
  heading: 
    type: "string"
    label: "Service Title"
    ui:
      component: "text"
      
  description:
    type: "rich-text" 
    label: "Service Description"
    ui:
      component: "rich-text"
      
  treatment_approaches:
    type: "object"
    label: "Treatment Methods"
    list: true
    fields:
      - name: "approach"
        type: "string"
        options: ["CBT", "EMDR", "DBT", "EFT"] # Controlled options
        
  layout_variant:
    type: "string"
    label: "Display Style"
    options: ["tabs", "accordion", "grid"] # Approved layouts only
```

### **Level 4: Rigid Elements (Never Customizable)**

**Protected Conversion Elements:**
- **Form field order and validation** (appointment booking)
- **CTA button placement** in conversion-critical areas
- **Navigation structure** and accessibility patterns
- **Mobile responsive breakpoints** and behavior
- **Loading states** and error handling

**Implementation Protection:**
```typescript
// Protected component with customizable styling only
export const AppointmentBookingForm = ({ theme, ...props }) => {
  // Rigid: Form structure and validation
  const [formData, setFormData] = useState(REQUIRED_FIELDS);
  const [errors, setErrors] = useState({});
  
  // Rigid: Conversion-optimized flow
  const steps = [
    'service-selection',    // Never change order
    'date-time-selection',  // Proven conversion flow
    'personal-information', // Required for booking
    'confirmation'         // Trust-building step
  ];
  
  return (
    <form className="appointment-form">
      {/* Customizable: Visual styling */}
      <div 
        className="form-container"
        style={{ 
          backgroundColor: theme.colors.neutral[50],
          borderColor: theme.colors.primary[200]
        }}
      >
        {/* Rigid: Form logic and accessibility */}
        <StepIndicator currentStep={currentStep} totalSteps={steps.length} />
        
        {renderCurrentStep()}
        
        <FormNavigation 
          onNext={handleNext}
          onPrevious={handlePrevious}
          isValid={validateCurrentStep()}
        />
      </div>
    </form>
  );
};
```

## BRAND APPLICATION SYSTEM

### **Automated Brand Application**

```typescript
// Brand application service
class BrandApplicationService {
  static applyBrandToComponents(
    components: ComponentTree, 
    brandConfig: ClientBrandConfig
  ) {
    const theme = generateTheme(brandConfig);
    
    return components.map(component => ({
      ...component,
      props: {
        ...component.props,
        theme,
        // Apply brand-specific styling
        className: this.generateBrandClasses(component, theme),
        style: this.generateInlineStyles(component, theme)
      }
    }));
  }
  
  private static generateBrandClasses(component: Component, theme: Theme) {
    // Generate Tailwind classes with brand colors
    const brandClasses = {
      'primary-button': `bg-[${theme.colors.primary}] hover:bg-[${theme.colors.primaryDark}]`,
      'heading-text': `font-[${theme.typography.heading}] text-[${theme.colors.text}]`,
      'brand-border': `border-[${theme.colors.primary}]`
    };
    
    return brandClasses[component.type] || '';
  }
}
```

### **Component Variant System**

```typescript
// Component with brand-aware variants
interface ButtonVariants {
  intent: 'primary' | 'secondary' | 'ghost';
  size: 'small' | 'medium' | 'large';
  theme: ClientTheme;
}

const Button = ({ intent, size, theme, children, ...props }) => {
  const variants = {
    intent: {
      primary: `bg-[${theme.colors.primary}] text-white hover:bg-[${theme.colors.primaryDark}]`,
      secondary: `bg-[${theme.colors.secondary}] text-white hover:bg-[${theme.colors.secondaryDark}]`,
      ghost: `bg-transparent text-[${theme.colors.primary}] border border-[${theme.colors.primary}]`
    },
    size: {
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-4 py-2 text-base',
      large: 'px-6 py-3 text-lg'
    }
  };
  
  return (
    <button 
      className={cn(
        'font-medium rounded transition-colors',
        variants.intent[intent],
        variants.size[size]
      )}
      {...props}
    >
      {children}
    </button>
  );
};
```

## TEMPLATE CUSTOMIZATION SYSTEM

### **Page Template Variants**

```typescript
// Template with layout options
interface ServicePageTemplate {
  layout: 'sidebar' | 'full-width' | 'centered';
  heroStyle: 'image-left' | 'image-background' | 'video';
  serviceDisplay: 'tabs' | 'accordion' | 'grid';
  ctaPlacement: 'floating' | 'inline' | 'footer';
}

const ServiceTemplate = ({ 
  pageData, 
  templateConfig, 
  brandTheme 
}: ServiceTemplateProps) => {
  // Layout selection maintains conversion patterns
  const LayoutComponent = layoutComponents[templateConfig.layout];
  
  return (
    <LayoutComponent theme={brandTheme}>
      <HeroSection 
        data={pageData.hero}
        variant={templateConfig.heroStyle}
        theme={brandTheme}
      />
      
      <ServiceListingBlock
        data={pageData.services}
        display={templateConfig.serviceDisplay}
        theme={brandTheme}
      />
      
      <AppointmentCTA
        placement={templateConfig.ctaPlacement}
        theme={brandTheme}
      />
    </LayoutComponent>
  );
};
```

## QUALITY ASSURANCE SYSTEM

### **Customization Validation**

```typescript
// Validate customizations don't break UX patterns
interface CustomizationValidator {
  validateColorContrast(foreground: string, background: string): boolean;
  validateAccessibility(component: Component): ValidationResult;
  validateConversionElements(page: PageData): ConversionAudit;
  validatePerformance(theme: Theme): PerformanceImpact;
}

const validator = {
  // Ensure WCAG compliance
  validateColorContrast: (fg: string, bg: string) => {
    const contrast = calculateContrast(fg, bg);
    return contrast >= 4.5; // AA standard
  },
  
  // Check conversion-critical elements
  validateConversionElements: (page: PageData) => {
    const required = [
      'primary-cta-visible',
      'contact-info-accessible', 
      'appointment-booking-functional',
      'trust-signals-present'
    ];
    
    return required.every(element => 
      page.components.some(comp => comp.type === element)
    );
  }
};
```

### **Brand Guidelines Enforcement**

```typescript
// Ensure brand consistency across all customizations
interface BrandGuidelinesChecker {
  fonts: {
    approved: string[];        // Healthcare-appropriate fonts
    fallbacks: string[];       // System font fallbacks
    maxFonts: number;          // Limit to 2-3 fonts max
  };
  
  colors: {
    contrastRatio: number;     // Minimum 4.5:1
    maxPalette: number;        // Limit to 5 brand colors
    semanticRequired: string[]; // Error, success, warning colors
  };
  
  imagery: {
    aspectRatios: string[];    // Consistent image proportions
    qualityStandards: {
      minResolution: number;   // Professional image quality
      formats: string[];       // Optimized formats only
    };
  };
}
```

## CLIENT HANDOFF PROCESS

### **Customization Documentation**

**Delivered to Each Client:**
1. **Brand Application Guide** - How their brand was applied
2. **TinaCMS Editing Manual** - What they can safely edit
3. **Approved Variations Catalog** - Layout options available
4. **Brand Consistency Guidelines** - Maintaining professional appearance

**Template Customization Report:**
```markdown
# Client Brand Implementation Report

## Applied Customizations
- **Primary Color**: #4F46E5 → #2D5B87 (Client Blue)
- **Typography**: Montserrat → Poppins (Brand Font)
- **Logo Integration**: 3 variations created and implemented
- **Layout Variant**: Hero Section - "Split Layout" selected

## Protected Elements
- Appointment booking flow (optimized for conversions)
- Contact form structure (accessibility compliant)
- Mobile navigation pattern (usability tested)
- CTA button placement (conversion optimized)

## Future Customization Options
- Content updates via TinaCMS (unlimited)
- Color adjustments within brand palette
- Image updates following provided guidelines
- Layout variants from approved catalog
```

This framework ensures unlimited creative expression while maintaining the proven healthcare website patterns that drive appointments and build trust with potential clients.