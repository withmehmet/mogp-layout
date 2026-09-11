# MOGP Getting Started

For the full explanation of the concepts and design decisions, see `README.md` — this document only covers "how to write it."

## Introduction

MOGP is a SCSS system that provides layout needs like container, grid, span, gap, and offset through ready-made utility classes. All classes come with the `mogp-` prefix and can be customized by changing `$namespace`.

Throughout this document, the default configuration is used: a 12-column grid, with `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px) breakpoints.

Every example can be copied and used as-is.

## Installation

MOGP requires Dart Sass (it uses the `sass:map`, `sass:string`, `sass:math`, `sass:meta`, `sass:list` modules).

```scss
@use "mogp-layout" with (
  $namespace: "mogp"
);
```

If you want to use the compiled CSS directly, just include the `.css` output in your project; in that case no build step is needed. The repository provides two ready-made variants (core classes only / all utilities); see the "Compiled CSS Variants" section in `README.md` to see which one suits you.

## First Container

`mogp-container` centers content and applies a max width.

```html
<div class="mogp-container">
  <p>Content goes here.</p>
</div>
```

If you want a full-page-width wrapper, use `mogp-container-full`; it has the same behavior, with no max-width limit.

```html
<div class="mogp-container-full">
  <p>Edge-to-edge content.</p>
</div>
```

## First Grid

`mogp-grid` creates a 12-column CSS Grid container.

```html
<div class="mogp-grid">
  <div class="mogp-span-6">Left half</div>
  <div class="mogp-span-6">Right half</div>
</div>
```

`mogp-span-*` classes only work on a direct child of a `mogp-grid`.

## Span Utilities

Determines how many columns an element spans (`1` to `12`).

```html
<div class="mogp-grid">
  <div class="mogp-span-4">4 columns</div>
  <div class="mogp-span-4">4 columns</div>
  <div class="mogp-span-4">4 columns</div>
</div>
```

To reset an element's span, use `mogp-span-auto` (`grid-column: auto`).

## Responsive Span

Pattern: `mogp-span-{breakpoint}-{value}`.

```html
<div class="mogp-grid">
  <div class="mogp-span-12 mogp-span-md-6 mogp-span-lg-4">
    Full width on mobile, half on md, one-third on lg.
  </div>
</div>
```

Classes work mobile-first: the `md` class takes effect at the `md` breakpoint (768px) and above.

## Gap Utilities

`mogp-gap-*` sets both the row and column gap of the grid together.

```html
<div class="mogp-grid mogp-gap-24">
  <div class="mogp-span-6">A</div>
  <div class="mogp-span-6">B</div>
</div>
```

Available steps: `0, 8, 16, 24, 32, 40, 48`.

For gap between columns only, or between rows only, use `mogp-gi-*` (gap-inline) and `mogp-gb-*` (gap-block) — they share the same step values (`0, 8, 16, 24, 32, 40, 48`):

```html
<div class="mogp-grid mogp-gi-16 mogp-gb-32">
  <div class="mogp-span-6">A</div>
  <div class="mogp-span-6">B</div>
</div>
```

## Gap Auto

`mogp-gap-auto` applies a gap that automatically scales by breakpoint, instead of a fixed value.

```html
<div class="mogp-grid mogp-gap-auto">
  <div class="mogp-span-6">A</div>
  <div class="mogp-span-6">B</div>
</div>
```

With the default configuration: `base/sm: 16px`, `md/lg/xl: 24px`.

## Container Padding Utilities

`mogp-pi-*` sets the container's horizontal padding (`padding-inline`) to a fixed scale step. Only works on the same element together with `mogp-container` or `mogp-container-full`.

```html
<div class="mogp-container mogp-pi-24">
  <p>24px horizontal padding.</p>
</div>
```

Available steps: `0, 16, 24, 32, 40`. Responsive variant: `mogp-pi-{breakpoint}-{value}`.

## pi-auto

`mogp-pi-auto` automatically adjusts the container's padding per breakpoint.

```html
<div class="mogp-container mogp-pi-auto">
  <p>Automatic padding based on screen size.</p>
</div>
```

With the default configuration: `base: 16px`, `sm/md: 24px`, `lg: 32px`, `xl: 40px`.

## Offset

`mogp-offset-*` pushes an element to the right by the specified number of columns (`1` to `11`).

```html
<div class="mogp-grid">
  <div class="mogp-span-8 mogp-offset-2">Centered 8-column block</div>
</div>
```

Responsive variant: `mogp-offset-{breakpoint}-{value}`.

To cancel an offset applied at a smaller breakpoint, use `mogp-offset-{breakpoint}-auto` — it resets the element back to normal auto-placement (`grid-column-start: auto`).

```html
<div class="mogp-grid">
  <div class="mogp-span-8 mogp-offset-2 mogp-offset-lg-auto">
    Offset by 2 columns until lg, no offset from lg onward.
  </div>
</div>
```

## col-start / col-end

Directly sets an element's starting and ending column line (`1` to `13`).

```html
<div class="mogp-grid">
  <div class="mogp-col-start-3 mogp-col-end-9">From line 3 to line 9</div>
</div>
```

Responsive variants: `mogp-col-start-{breakpoint}-{value}`, `mogp-col-end-{breakpoint}-{value}`.

## Full Responsive Layout Example

An example combining container, automatic padding, grid, automatic gap, and responsive span together:

```html
<div class="mogp-container mogp-pi-auto">
  <div class="mogp-grid mogp-gap-auto">
    <div class="mogp-span-12 mogp-span-md-6 mogp-span-lg-4">
      <!-- Card 1 -->
    </div>
    <div class="mogp-span-12 mogp-span-md-6 mogp-span-lg-4">
      <!-- Card 2 -->
    </div>
    <div class="mogp-span-12 mogp-span-md-12 mogp-span-lg-4">
      <!-- Card 3 -->
    </div>
  </div>
</div>
```

## Common Patterns

**Sidebar + content (3/9 ratio):**

```html
<div class="mogp-grid mogp-gap-lg-40">
  <aside class="mogp-span-12 mogp-span-lg-3">Sidebar</aside>
  <main class="mogp-span-12 mogp-span-lg-9">Content</main>
</div>
```

**Three-card row, single column on mobile:**

```html
<div class="mogp-grid mogp-gap-24">
  <div class="mogp-span-12 mogp-span-sm-6 mogp-span-lg-4">Card 1</div>
  <div class="mogp-span-12 mogp-span-sm-6 mogp-span-lg-4">Card 2</div>
  <div class="mogp-span-12 mogp-span-sm-6 mogp-span-lg-4">Card 3</div>
</div>
```

**Centered narrow text block (using col-start):**

```html
<div class="mogp-grid">
  <div class="mogp-span-12 mogp-span-md-8 mogp-col-start-md-3">
    A narrow reading column, centered on wide screens.
  </div>
</div>
```

**Temporarily overriding auto at a specific breakpoint:**

```html
<div class="mogp-container mogp-pi-auto mogp-pi-lg-40">
  <p>Automatic up to lg, fixed at 40px from lg onward.</p>
</div>
```

## Next Steps

This document only shows how to use the classes. See `README.md` for:

- Changing the grid column count, breakpoints, and namespace
- How to customize `pi-auto` / `gap-auto` values
- Which utility groups can be disabled at build time (`$mogp-output-*` flags)
- The difference between the ready-made Minimal / Full compiled CSS files
- Compile-time validation rules
- Class compatibility and `:where()` specificity behavior
