# Design System — Manikstu Agro

## Color Palette

### Primary Colors (from Manikstu Logo)
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Manikstu Green | `#4A8C3F` | (74, 140, 63) | Primary buttons, links, logo |
| Leaf Dark | `#3A7030` | (58, 112, 48) | Header, footer, dark backgrounds |
| Leaf Light | `#5DAF4F` | (93, 175, 79) | Hover states, accents |
| Manikstu Red | `#D4342C` | (212, 52, 44) | CTA buttons, urgency, accents |
| Flame Dark | `#B82D25` | (184, 45, 37) | Red hover states |
| Flame Bright | `#E8533E` | (232, 83, 62) | Highlights, badges |

### Neutral Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| White | `#FFFFFF` | (255, 255, 255) | Primary background, cards |
| Cream Silk | `#FDF6EC` | (253, 246, 236) | Warm section backgrounds |
| Earth Beige | `#F5EDE0` | (245, 237, 224) | Subtle section backgrounds |
| Charcoal | `#1A1A1A` | (26, 26, 26) | Primary text, dark elements |
| Grey | `#5A5A5A` | (90, 90, 90) | Muted text, secondary content |
| Light Grey | `#E5E5E5` | (229, 229, 229) | Borders, dividers |

### Cultural Accent Colors
| Name | Hex | Origin | Usage |
|------|-----|--------|-------|
| Red Earth | `#9F5233` | Saura wall base | Saura pattern backgrounds |
| Rice White | `#F5F0E8` | Rice paste | Saura line work |
| Forest Green | `#2D5016` | Kalahandi forests | Deep nature accents |
| Bamboo Gold | `#C4952A` | Bamboo brush | Warm accents, highlights |
| Brass Bronze | `#8B6914` | Dhokra metalwork | Decorative accents |
| Indigo | `#2C3E6B` | Natural indigo dye | Cool accent |
| Terracotta | `#B85C38` | Clay pottery | Earthy warmth |
| Sage Green | `#6B7F5E` | Forest undergrowth | Muted nature tones |
| Vermilion | `#D94F30` | Ritual red | CTA, important accents |

### Color Usage Rules
| Element | Color | Hex |
|---------|-------|-----|
| Primary buttons | Manikstu Green | `#4A8C3F` |
| Primary button hover | Leaf Dark | `#3A7030` |
| CTA buttons | Manikstu Red | `#D4342C` |
| CTA button hover | Flame Dark | `#B82D25` |
| Header background | White | `#FFFFFF` |
| Footer background | Dark Green | `#3A7030` |
| Footer text | White | `#FFFFFF` |
| Hero overlay | Charcoal | `#1A1A1A` at 60% opacity |
| Card backgrounds | White | `#FFFFFF` |
| Warm sections | Cream Silk | `#FDF6EC` |
| Links | Dark Green | `#3A7030` |
| Link hover | Manikstu Red | `#D4342C` |
| Body text | Charcoal | `#1A1A1A` |
| Muted text | Grey | `#5A5A5A` |
| Success | Forest Green | `#2D5016` |
| Error | Manikstu Red | `#D4342C` |
| Warning | Bamboo Gold | `#C4952A` |

---

## Typography

### Font Stack
```
Headings: 'Playfair Display', Georgia, 'Times New Roman', serif
Body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
Odia (decorative): 'Noto Sans Oriya', 'Kalinga', sans-serif
```

### Font Loading
Self-hosted WOFF2 files in `/public/fonts/`. NOT Google Fonts CDN.
```
font-display: swap
preload: PlayfairDisplay-Bold.woff2, Inter-Regular.woff2
```

### Type Scale
| Level | Font | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|------|--------|-------------|----------------|-------|
| Display | Playfair Display | 48px / 3rem | 700 | 1.1 | -0.02em | Hero headlines |
| H1 | Playfair Display | 36px / 2.25rem | 700 | 1.2 | -0.01em | Page titles |
| H2 | Playfair Display | 30px / 1.875rem | 700 | 1.3 | 0 | Section headings |
| H3 | Playfair Display | 24px / 1.5rem | 700 | 1.4 | 0 | Sub-section headings |
| H4 | Inter | 20px / 1.25rem | 600 | 1.4 | 0 | Card titles |
| H5 | Inter | 18px / 1.125rem | 600 | 1.5 | 0 | Small headings |
| Body Large | Inter | 18px / 1.125rem | 400 | 1.6 | 0 | Intro text |
| Body | Inter | 16px / 1rem | 400 | 1.6 | 0 | Default body text |
| Body Small | Inter | 14px / 0.875rem | 400 | 1.5 | 0 | Captions, labels |
| Micro | Inter | 12px / 0.75rem | 500 | 1.4 | 0.02em | Badges, tags |

### Typography Rules
- Maximum 2 font families (Playfair Display + Inter)
- Never use font sizes below 12px
- Line height: 1.6 for body, 1.1-1.4 for headings
- Letter spacing: normal for body, -0.02em for Display, -0.01em for H1
- Text alignment: left for body, center for hero text only
- Maximum line length: 70 characters for body text

---

## Spacing System

### Base Unit: 4px
| Token | Value | Rem |
|-------|-------|-----|
| `space-1` | 4px | 0.25rem |
| `space-2` | 8px | 0.5rem |
| `space-3` | 12px | 0.75rem |
| `space-4` | 16px | 1rem |
| `space-5` | 20px | 1.25rem |
| `space-6` | 24px | 1.5rem |
| `space-8` | 32px | 2rem |
| `space-10` | 40px | 2.5rem |
| `space-12` | 48px | 3rem |
| `space-16` | 64px | 4rem |
| `space-20` | 80px | 5rem |
| `space-24` | 96px | 6rem |

### Section Spacing
- Between sections: 80px desktop / 48px mobile
- Within sections: 48px between content blocks
- Card padding: 24px to 32px
- Page horizontal padding: 24px mobile / 64px desktop

---

## Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 4px | Buttons, inputs |
| `radius-md` | 8px | Cards |
| `radius-lg` | 12px | Modals |
| `radius-xl` | 16px | Hero sections |
| `radius-full` | 9999px | Avatars, badges |

---

## Shadows
| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1)` | Cards |
| `shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.1)` | Hero overlays |

---

## Component Styles (Frontend)

### Buttons
```
Primary:   bg #4A8C3F, text white, hover bg #3A7030, padding 12px 24px, radius 4px, font-weight 600
Secondary: bg #D4342C, text white, hover bg #B82D25, padding 12px 24px, radius 4px, font-weight 600
Outline:   bg transparent, border 2px #4A8C3F, text #4A8C3F, hover bg #4A8C3F, text white
Ghost:     bg transparent, text #4A8C3F, hover bg #4A8C3F at 10% opacity
```

### Cards
```
Background: white
Border: 1px solid #E5E5E5
Border-radius: 8px
Shadow: shadow-md
Padding: 24px
Hover: shadow-lg, translateY(-2px)
Tribal variant: Ikat border pattern, Godna texture background
```

### Forms
```
Input:      bg white, border 1px #E5E5E5, radius 4px, padding 12px 16px, font 16px Inter
Focus:      border #4A8C3F, ring 3px #4A8C3F at 20% opacity
Error:      border #D4342C, error text below
Select:     Same as input + custom dropdown arrow
Textarea:   Same as input, min-height 120px
```

### Navigation
```
Header:     bg white, height 80px, shadow-sm, bottom border Saura pattern
Nav links:  16px Inter Medium, color #1A1A1A, hover #4A8C3F
Active:     color #4A8C3F, border-bottom 2px #4A8C3F
Mobile:     slide-out from right, bg #3A7030, text white
```

### Footer
```
Background: #3A7030
Text: white
Links: white, hover Bamboo Gold #C4952A
Top border: Saura geometric pattern
4 columns on desktop, stacked on mobile
```

---

## Admin Panel Design (Laravel Blade)

### Admin Layout
```
┌─────────────────────────────────────────────────┐
│ SIDEBAR (250px)    │ TOP BAR                     │
│ bg: #3A7030        │ bg: white, height: 64px     │
│                    │ [Search] [Notifications] [Avatar]
│ Logo               ├─────────────────────────────┤
│ Nav items          │                             │
│   Dashboard        │    MAIN CONTENT AREA        │
│   Products         │    bg: #F5F5F5              │
│   Orders           │                             │
│   Customers        │    Page content here        │
│   Projects         │                             │
│   Enrollments      │                             │
│   Blog             │                             │
│   Press            │                             │
│   Gallery          │                             │
│   Team             │                             │
│   Enquiries        │                             │
│   Testimonials     │                             │
│   Settings         │                             │
│   Users            │                             │
│                    │                             │
│ User avatar        │                             │
│ Logout             │                             │
└────────────────────┴─────────────────────────────┘
```

### Admin Color Tokens
```
Sidebar bg:        #3A7030 (Leaf Dark)
Sidebar text:      #FFFFFF
Sidebar hover:     #4A8C3F (Manikstu Green)
Sidebar active:    #2D5016 (Forest Green)
Top bar bg:        #FFFFFF
Top bar border:    #E5E5E5
Content bg:        #F5F5F5 (Light grey)
Card bg:           #FFFFFF
Primary button:    #4A8C3F
Danger button:     #D4342C
Warning badge:     #C4952A
Success badge:     #2D5016
Info badge:        #2C3E6B (Indigo)
Text primary:      #1A1A1A
Text muted:        #5A5A5A
Border:            #E5E5E5
```

### Admin Components
```
Stat Card:
  bg: white
  border: 1px solid #E5E5E5
  border-radius: 8px
  padding: 24px
  shadow: shadow-sm
  Icon: 48x48, color based on type (green/red/blue/gold)
  Value: 28px, font-weight 700
  Label: 14px, text-muted

Data Table:
  bg: white
  border: 1px solid #E5E5E5
  border-radius: 8px
  Header: bg #F5F5F5, font-weight 600, text-sm
  Rows: hover bg #F5F5F5
  Actions: icon buttons (view, edit, delete)

Status Badge:
  padding: 4px 12px
  border-radius: 9999px
  font-size: 12px, font-weight: 500
  pending:    bg #FFF3CD, text #856404
  confirmed:  bg #D1ECF1, text #0C5460
  processing: bg #D4EDDA, text #155724
  shipped:    bg #CCE5FF, text #004085
  delivered:  bg #D4EDDA, text #155724
  cancelled:  bg #F8D7DA, text #721C24
  new:        bg #D4EDDA, text #155724
  contacted:  bg #D1ECF1, text #0C5460
  converted:  bg #CCE5FF, text #004085
  closed:     bg #E2E3E5, text #383D41

Form Input:
  bg: white
  border: 1px solid #DEE2E6
  border-radius: 6px
  padding: 10px 12px
  font-size: 14px
  Focus: border #4A8C3F, ring 2px #4A8C3F at 25%
  Error: border #D4342C

Rich Text Editor:
  Toolbar: bg #F5F5F5, border bottom 1px #E5E5E5
  Content: min-height 400px, padding 16px
  Font: 16px, line-height 1.6
```

### Admin Responsive
| Breakpoint | Sidebar | Layout |
|------------|---------|--------|
| Desktop (>1024px) | Visible (250px) | Sidebar + content |
| Tablet (768-1024px) | Collapsed (64px) | Icons only + content |
| Mobile (<768px) | Hidden (overlay) | Full-width content + hamburger |

---

## Tribal Art Integration Rules

### Saura Patterns
- Used as: section borders, dividers, hero illustrations, icon set
- Colors: Red Earth (#9F5233) + Rice White (#F5F0E8) on warm backgrounds
- Style: Stick figures, geometric borders, fish-net approach
- Respect: Sacred art (devoted to deity Idital), use respectfully

### Godna Patterns
- Used as: background textures, card patterns, section fills
- Colors: Charcoal (#1A1A1A) on Cream (#FDF6EC)
- Style: Geometric tattoo motifs, agriculture/cattle themes

### Dhokra Elements
- Used as: icon set, decorative accents, frame borders
- Colors: Brass Bronze (#8B6914) for metallic feel
- Style: Braided wire, elephant/horse/peacock/morchimni

### Ikat Patterns
- Used as: section backgrounds, card borders
- Colors: Muted, blurred geometric tones
- Style: Blurred edges, textile-like texture

### Ghumura Elements
- Used as: loading animation, play buttons, circular motifs
- Colors: Manikstu Green (#4A8C3F) + Red (#D4342C)
- Style: Drum shape, circular rhythm, warrior energy

---

## Responsive Breakpoints
| Breakpoint | Width | Columns | Padding |
|------------|-------|---------|---------|
| Mobile | < 640px | 1 | 16px |
| Tablet | 640px - 1024px | 2 | 24px |
| Desktop | > 1024px | 4 | 64px |
| Large | > 1280px | 4 | auto (max-width 1280px) |
