
# ZENITH 2026: Multi-Month Specification

## Project Identity
**ZENITH 2026** is a premium high-performance dashboard for nutritional and athletic synchronization, covering both **January** and **February 2026**.

---

## 1. Visual Design Evolution
The platform now supports dynamic theming based on the active month.

### January: Obsidian Gold
- **Accent**: Amber/Gold (#d4af37)
- **Vibe**: Tactical elegance.

### February: Rose Obsidian
- **Accent**: Rose/Pink (#f43f5e)
- **Vibe**: High-performance "February Aura" with warmth.

---

## 2. Navigation & State
- **Month Switcher**: A sticky, glassmorphic toggle in the header allows zero-latency switching between Jan and Feb protocols.
- **Current Day Highlighting**: Real-time detection of the system date. If the year is 2026, the current month and day are highlighted with an emerald glow and pulsing indicator.

---

## 3. Nutritional Logic (February Expansion)
- **Proteins**: Targeted focus on Beef, Pork, and Chicken.
- **Meal Structure**:
  - **Lunch**: Shifted to light, high-protein Sandwiches and Salads.
  - **Dinner**: Hearty, simple cooked meals with automated scaling (1.2x Alpha, 0.8x Beta).
- **Children's Protocols**: Spice-free adaptations of the main dinner meals, focusing on soft textures and nutrient density.

---

## 4. Technical Specifications
- **Persistence**: Enhanced `localStorage` keying (`[month]_[date]`) to prevent collision between weights across different months.
- **Recipe Engine**: Expanded to include 20+ performance recipes in `constants.ts`.
- **Responsive Handling**: Mobile calendar view hides descriptive tags but preserves "Today" and "Cooking Day" markers for high-speed reference.

---

## 5. Metadata
- **Storage Key**: `zenith_weight_tracker_2026`
- **Simulated Date Alignment**: 
  - Jan 1, 2026 = Thursday
  - Feb 1, 2026 = Sunday
