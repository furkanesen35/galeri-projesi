# Marketing Shell (Hero, Trust, CTA, Testimonials)

## Goal
Recreate the visible marketing surface: hero with video/CTA, trust logos, hotspot explainer, webinar strip, testimonial carousel, footer CTAs.

## Scope (frontend POC)
- Frontend-only: static/fixture-driven content; no CMS.
- Focus on visual parity with uniqueness cues from the reference site.

## Frontend Implementation (POC)
- Sections: hero (headline, subhead, primary/secondary CTA, background image/video thumb); trust logo bar; hotspot feature explainer with pulsating markers; webinar/event strip; testimonial carousel; cookie banner; footer nav + dual CTA.
- Components: CTA buttons, video modal (YouTube embed), logo grid, hotspots overlay, carousel, cookie banner with accept/decline, sticky top nav.
- State: fixture JSON for logos/testimonials/events; simple carousel timer; cookie banner localStorage flag.

## Edge/UX
- Responsive layout (desktop/tablet/mobile); ensure CTA visible above the fold.
- Respect autoplay rules (no auto-played audio); lazy-load video.
- Accessible focus states and motion-reduced mode for animations.
