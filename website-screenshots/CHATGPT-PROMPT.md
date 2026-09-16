# ChatGPT Prompt for Mobile Version UI/UX Design

## Instructions
Upload all the screenshots from the `website-screenshots` folder as reference images to ChatGPT, then use this prompt:

---

## Prompt

I have a website called **Manikstu Agro** - a tech-enabled social enterprise revolutionizing goat farming in rural India. I need you to design a **mobile-first version** of this website.

### Reference Images
I'm attaching desktop screenshots of all pages. Use these as the design reference:

1. **Homepage** - Main landing page with hero section, features, and call-to-action
2. **About** - Company information and mission
3. **Services** - Services offered (breed improvement, insurance, market access)
4. **Products** - Product catalog (lick blocks, supplements, medicines)
5. **Training** - Training programs for farmers
6. **Blog** - News and articles
7. **Contact** - Contact form and information
8. **Careers** - Job openings
9. **Partners** - Partner organizations
10. **Collaborate** - Collaboration opportunities
11. **Help** - Help and support
12. **Privacy** - Privacy policy
13. **Terms** - Terms and conditions

### Design Requirements

**Color Palette (MUST maintain exact same colors):**
- Primary Green: `#4A8C3F` (Manikstu Green)
- Leaf Green: `#3A7030`
- Gold Accent: `#C4952A`
- Cream Background: `#FDF6EC` / `#FAF4EB`
- Saura Red: `#9F5233`
- Charcoal Text: `#1A1A1A`
- Grey Text: `#5A5A5A`

**Typography:**
- Headings: Playfair Display (serif, italic for elegance)
- Body: Inter (clean, readable)

**Tribal Art Elements to Preserve:**
- Mandala corner decorations
- Tribal floral borders
- Village landscape illustrations
- Diamond/ornamental dividers between sections
- Dashed border cards with gold accents

### Mobile Design Specifications

**Screen Sizes:**
- Mobile: 375px - 428px width
- Tablet: 768px - 1024px width

**Layout Rules:**
1. Single column layout on mobile
2. Stack elements vertically
3. Reduce padding/margins by 40-50%
4. Make buttons full-width on mobile
5. Collapse navigation into hamburger menu
6. Use collapsible/accordion sections for long content
7. Maintain visual hierarchy with proper spacing

**Component Adaptations:**

1. **Navigation:**
   - Hamburger menu with slide-out drawer
   - Logo stays visible at top
   - Bottom navigation bar for key actions (optional)

2. **Hero Section:**
   - Full-width background image
   - Centered text with smaller font size
   - CTA button full-width below text
   - Remove or reposition decorative elements

3. **Cards/Products:**
   - Stack vertically on mobile
   - 2-column grid on tablet
   - Maintain card styling (dashed borders, icons)
   - Touch-friendly tap targets (min 44px)

4. **Forms:**
   - Full-width inputs
   - Larger touch targets
   - Sticky submit button at bottom (optional)
   - Simplified form fields

5. **Images:**
   - Responsive images that scale properly
   - Lazy loading for performance
   - Maintain aspect ratios

6. **Footer:**
   - Collapsible sections
   - Stack links vertically
   - Social icons in a row

### Deliverables Required

For each page, provide:

1. **Mobile Wireframe** (375px width)
   - Layout structure
   - Element placement
   - Spacing guidelines

2. **Mobile Mockup** (High-fidelity)
   - Exact colors and typography
   - All visual elements
   - Interactive states (hover, active)

3. **Tablet Wireframe** (768px width)
   - Two-column layouts where appropriate
   - Adaptive navigation

4. **CSS/Tailwind Code** (optional but preferred)
   - Responsive utility classes
   - Breakpoint-specific styles
   - Component-specific styles

### Specific Page Notes

**Homepage:**
- Hero needs to be impactful on small screen
- Features section should use icons with text below
- Testimonials as horizontal scroll or carousel

**Products:**
- Product grid: 1 column mobile, 2 tablet
- Product cards with image, name, price
- Quick view or expand for details

**Training:**
- Program cards stacked vertically
- Video embeds responsive
- Impact statistics in a grid

**Contact:**
- Form fields full-width
- Map embed responsive
- Contact info cards stacked

**Blog:**
- Article cards full-width
- Featured image on top
- Read more button

### Quality Checklist

- [ ] All colors match exactly (#4A8C3F, #C4952A, #FDF6EC)
- [ ] Typography is consistent (Playfair Display headings, Inter body)
- [ ] Tribal art elements are preserved and scaled appropriately
- [ ] Touch targets are minimum 44px
- [ ] Text is readable without zooming (min 16px body text)
- [ ] Images are responsive and don't overflow
- [ ] Navigation is accessible and intuitive
- [ ] Forms are easy to fill on mobile
- [ ] Loading performance is optimized

---

## Usage Tips

1. **Upload all screenshots** at once for context
2. **Be specific** about which page you want redesigned first
3. **Request iterations** - start with homepage, then move to other pages
4. **Ask for code** - request Tailwind CSS or React Native code
5. **Test on real devices** - use browser dev tools to preview

## Example Follow-up Prompts

- "Now redesign the Products page mobile version"
- "Can you provide the Tailwind CSS code for this?"
- "Make the navigation a bottom tab bar instead"
- "Add a dark mode version"
- "Optimize this for performance"
