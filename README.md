# MOGP Layout System

**v0.1.0 — Early Release**

> The project is in an early release stage. The public API is not yet considered stable; changes may occur between versions. It's recommended to follow the release notes before using this in production.

MOGP is a minimal system built on top of SCSS, designed to solve only **layout** problems.

It provides core layout needs — container, grid, span, gap, and offset — through utility classes that are fully configurable at compile time and generated automatically for responsive use.

## Why MOGP?

- Layout only
- Namespace support
- Compile-time customizable
- Responsive utilities
- Automatic spacing utilities
- Compile-time validation
- Optional utility generation
- CSS variable–based architecture

**Out of scope**

- Flex utilities
- Display utilities
- Typography
- Color systems
- Components
- Margin utilities
- General padding utilities beyond container padding-inline
- Animations

## Table of Contents

- [Why MOGP?](#why-mogp)
- [Project Overview](#project-overview)
- [What MOGP Solves](#what-mogp-solves)
- [Features](#features)
- [Installation](#installation)
- [Compiled CSS Variants](#compiled-css-variants)
- [Related Documentation](#related-documentation)
- [Quick Start](#quick-start)
- [Core Concepts](#core-concepts)
- [Class Naming](#class-naming)
- [Class Compatibility](#class-compatibility)
- [Responsive](#responsive)
- [Auto Utilities](#auto-utilities)
- [Customization](#customization)
- [Namespace](#namespace)
- [Configuration](#configuration)
- [Utility Output](#utility-output)
- [Validation](#validation)
- [Design Philosophy](#design-philosophy)
- [Browser Support](#browser-support)
- [Development Process](#development-process)
- [License](#license)

## Project Overview

MOGP is a SCSS layout system that provides the most fundamental building blocks needed to lay out a page: container, grid, span, gap, offset.

The problem it solves is clear: turning the container/grid/gap code that gets rewritten project after project into a consistent, configurable API.

MOGP deliberately focuses only on layout. It does not produce flex utilities, display utilities, typography, color, margin, padding (other than container padding-inline), components, or animations. These boundaries are not accidental; they keep the system small, predictable, and easy to maintain.

## What MOGP Solves

| Problem | Solution |
|---|---|
| CSS class name collisions | Isolates all class and CSS custom property names with a configurable namespace. |
| Every project needing a different grid | The grid column count is fully configurable. |
| Different projects using different breakpoint systems | Breakpoint names and values are customizable. |
| Needing many utility classes for responsive spacing | `pi-auto` and `gap-auto` apply an automatic value per breakpoint with a single class. |
| Unused utilities generating unnecessary CSS | Utility groups can be optionally generated via output flags. |
| Misconfigurations going unnoticed | Compile-time validation catches incorrect settings with clear error messages during the build. |
| CSS specificity issues | Specificity can be reduced with the optional `:where()` selector mode. |
| Difficulty integrating into existing projects | Can be used alongside existing CSS architectures thanks to namespacing and optional Cascade Layer support. |

## Features

**Core**

- Container
- Container Full
- Grid

**Layout**

- Span (fixed and responsive)
- Offset
- Col Start
- Col End

**Spacing**

- Gap
- Gap Inline
- Gap Block
- `pi` (container padding-inline)
- `pi-auto`
- `gap-auto`

**Developer Experience**

- Compile-time validation
- Namespace
- Layer
- `:where()` support

## Installation

> **Requirement:** MOGP uses the `sass:map`, `sass:string`, `sass:math`, `sass:meta`, and `sass:list` modules. Because of this, it requires **Dart Sass**. It cannot be compiled with LibSass or `node-sass`.

MOGP is not distributed via a package manager. You download the `.scss` source file or the compiled `.css` output and include it in your project.

**Usage with SCSS:**

```scss
// Override settings with @use, then include the file in your project
@use "mogp-layout" with (
  $namespace: "mogp",
  $grid-columns: 12
);
```

**Usage with compiled CSS:**

Include the `.css` file you downloaded directly in your project. In this case, the configuration cannot be changed without recompiling and re-downloading the file. See [Compiled CSS Variants](#compiled-css-variants) to find out which ready-made file suits you.

## Compiled CSS Variants

If you don't want to compile the SCSS yourself, the repository provides ready-made compiled CSS in two different configurations. Both are built with the default settings (12 columns, `sm/md/lg/xl` breakpoints, namespace `mogp`), except `$mogp-use-where: false` — both ready-made files use plain `.mogp-grid > .mogp-span-6` selectors instead of `:where()`-wrapped ones, so grid-child classes (span, offset, col-start, col-end) carry normal specificity out of the box. If you need `:where()`'s low-specificity behavior, compile your own SCSS build with `$mogp-use-where: true` (the SCSS default) — see [Customization](#customization). Aside from that, the only difference between the two ready-made files is which `$mogp-output-*` flags are enabled.

### Minimal (`mogp-layout-core.css`) — offset enabled, all other output flags `false`

Contains the always-generated core classes, plus `offset`:

- `container`, `container-full`
- `grid`
- `span` (fixed + responsive + `span-auto`)
- `pi-auto`
- `gap-auto`
- `offset` (fixed + responsive + `offset-auto`)

**Not included** in this file: manual `pi-*`, manual `gap-*`, `gi-*`/`gb-*`, `col-start-*`, `col-end-*`. It works with `pi-auto`/`gap-auto` for spacing, positions columns via `span` and `offset`, and stays close to the smallest possible file size while still covering the most common column-positioning need.

### Full (`mogp-layout-full.css`) — all output flags `true`

In addition to everything in the Minimal version, this includes all remaining optional groups from the [Utility Output](#utility-output) table — container padding-inline utilities, gap utilities, gap axis utilities (`gi`/`gb`), col-start, col-end — with both fixed and responsive variants. The entire API described in this `README.md` is available in this file.

### Which One to Choose

| Need | Recommendation |
|---|---|
| container + grid + span + offset (+ auto rhythm) | Minimal |
| col-start/col-end, manual gap/pi steps will be used | Full |
| File size is critical, no unused CSS wanted | Minimal, or your own SCSS build with your own flag combination |

If you need a flag combination specific to your project (e.g. offset disabled, col-start enabled), doing your own SCSS build as described in [Customization](#customization) will always give the most optimized result, rather than using one of the two ready-made files.

## Related Documentation

This README is the full explanation of the concepts and design decisions. If you're looking for a quicker reference for a specific need:

| Document | What It's For |
|---|---|
| [`GETTING_STARTED.md`](./GETTING_STARTED.md) | An example-heavy quick reference that only shows how to use the classes. |
| [`CONFIGURATION.md`](./CONFIGURATION.md) | A copy-paste template of all compile-time settings with their real names and default values. |
| [`CHANGELOG.md`](./CHANGELOG.md) | The record of changes between releases. |

## Quick Start

A realistic example showing container, automatic padding, grid, automatic gap, and responsive span together:

```html
<div class="mogp-container mogp-pi-auto">
  <div class="mogp-grid mogp-gap-auto">
    <div class="mogp-span-12 mogp-span-md-6 mogp-span-lg-4">
      <!-- Content -->
    </div>
    <div class="mogp-span-12 mogp-span-md-6 mogp-span-lg-4">
      <!-- Content -->
    </div>
    <div class="mogp-span-12 mogp-span-md-12 mogp-span-lg-4">
      <!-- Content -->
    </div>
  </div>
</div>
```

In this example:

- `mogp-container` centers the page and applies a max width.
- `mogp-pi-auto` automatically adjusts the horizontal padding per breakpoint.
- `mogp-grid` creates a 12-column grid.
- `mogp-gap-auto` automatically adjusts the grid gap per breakpoint.
- `mogp-span-*` classes determine how many columns the element spans, based on screen size.

## Core Concepts

| Concept | Description |
|---|---|
| **Container** | A wrapper that centers content, with its max width limited by `$container-max`. |
| **Container Full** | Behaves the same as Container, but has no max-width limit (`max-inline-size: none`). |
| **Grid** | A grid container using `display: grid`, creating as many equal columns as `$grid-columns`. |
| **Span** | Determines how many columns a grid child spans (`grid-column`). `span-auto` resets this value back to `grid-column: auto` — used especially to cancel a span after a certain breakpoint. |
| **Offset** | Pushes a grid child to the right by the specified number of columns; a user-friendly alias for `col-start`. `offset-auto` resets this back to `grid-column-start: auto`, cancelling a previously applied offset. |
| **Col Start** | Sets the starting column line of a grid child (`grid-column-start`). |
| **Col End** | Sets the ending column line of a grid child (`grid-column-end`). |
| **Gap** | Sets both the row and column gap of the grid together. |
| **Gap Inline** | Sets only the gap between columns (horizontal) in the grid. |
| **Gap Block** | Sets only the gap between rows (vertical) in the grid. |
| **pi** (padding-inline) | Sets the container's horizontal padding to a fixed scale step (e.g. `pi-24`). For other abbreviations (`gi`, `gb`), see [Class Naming](#class-naming); for automatic/breakpoint-based behavior, see [Auto Utilities](#auto-utilities). |

> **Note:** The `mogp-grid` class automatically applies `min-inline-size: 0` to its direct children. This fixes a well-known CSS Grid behavior related to overflowing content (e.g. long text, `nowrap`, or fixed-width elements) and cannot be disabled. The selector for this rule is also affected by the `$mogp-use-where` setting (see [Class Compatibility](#class-compatibility)).

> **Note:** If a grid child is itself a flex container, this behavior requires attention. `min-inline-size: 0` only allows the outer flex container to shrink within the grid track — the flex items **inside** the flex container still carry the default `min-width: auto` behavior. When the track narrows, these inner items may unexpectedly squeeze or overflow. In that case, you may need to add your own `min-width: 0` (or an equivalent fix) to the flex items as well; this is outside MOGP's scope.

> **Note:** `col-start` and `col-end` are generated from `1` to `$grid-columns + 1` (inclusive of the last column line). `offset` is generated from `1` to `$grid-columns - 1`, because `offset-$grid-columns` would push the element entirely outside the grid, which is meaningless. So, for example, in a 12-column grid, the class `mogp-offset-12` is not generated, but `mogp-col-start-13` is.

> **Note:** `offset-auto` resets `grid-column-start` back to `auto`, cancelling any offset previously applied at a smaller breakpoint — the same role `span-auto` plays for `span`. This is the correct way to remove an offset at a larger breakpoint (e.g. `mogp-offset-2 mogp-offset-lg-auto`); setting a numeric offset of `0` would instead force the element to column line `1`, which isn't the same thing and can conflict with the grid's normal auto-placement.

## Class Naming

All classes follow a single pattern:

```
mogp-{utility}-{value}
mogp-{utility}-{breakpoint}-{value}
```

The `mogp-` prefix can be replaced with `$namespace`, and applies the same way to every class in the system (fixed or responsive alike). Separately: the `{breakpoint}` segment only appears in responsive variants, not in fixed classes.

**Abbreviations:**

| Abbreviation | Stands For | Corresponding CSS |
|---|---|---|
| `pi` | padding-inline | `padding-inline` (container horizontal padding) |
| `gi` | gap-inline | `column-gap` (grid gap between columns) |
| `gb` | gap-block | `row-gap` (grid gap between rows) |

| Class | Meaning |
|---|---|
| `mogp-span-6` | The element always spans 6 columns. |
| `mogp-span-md-6` | The element spans 6 columns starting at the `md` breakpoint. |
| `mogp-gap-24` | The grid gap value always equals step `24` ($gaps). |
| `mogp-gap-lg-32` | The grid gap value equals step `32` starting at the `lg` breakpoint. |
| `mogp-pi-24` | The container's horizontal padding always equals step `24` ($container-padding-inline-scale). |
| `mogp-gi-16` | The grid's column gap always equals step `16`; row gap (`gap-block`) is unaffected. |
| `mogp-gb-md-32` | The grid's row gap equals step `32` starting at the `md` breakpoint; column gap (`gap-inline`) is unaffected. |
| `mogp-col-start-5` | The element starts at the grid's 5th column line. |
| `mogp-offset-2` | The element is pushed 2 columns to the right in the grid. |
| `mogp-offset-lg-auto` | Starting at the `lg` breakpoint, any previously applied offset is cancelled (`grid-column-start: auto`). |

## Class Compatibility

MOGP classes don't work in isolation; some only take on meaning in a specific position, together with a specific accompanying class. When used incorrectly, they **don't throw errors** — the class simply has no visual effect, because the relevant CSS custom property is never set.

| Class Group | Where It Works | Example (Correct) | Example (Doesn't Work) |
|---|---|---|---|
| `pi-*`, `pi-auto` (+ responsive) | Only **on the same element** together with `container` or `container-full` | `<div class="mogp-container mogp-pi-24">` | `<div class="mogp-pi-24">` — no `container`, nothing is applied |
| `gap-*`, `gap-auto`, `gi-*`, `gb-*` (+ responsive) | Only **on the same element** together with `grid` | `<div class="mogp-grid mogp-gap-24">` | `<div class="mogp-gap-24">` — no `grid`, nothing is applied |
| `span-*`, `span-auto`, `offset-*`, `col-start-*`, `col-end-*` (+ responsive) | Only on a **direct child** of an element with the `grid` class (`.grid > .class`) | `<div class="mogp-grid"><div class="mogp-span-6">` | `<div class="mogp-span-6">` on its own, or on a grandchild of `grid` (a child's child) — nothing is applied |

**Nested grid usage:** If a `grid` is used inside another `grid`, the span/offset/col-start/col-end classes only apply relative to their **own direct parent** grid. That is, the children of the inner grid are positioned according to the inner grid's column system, not the outer grid's.

```html
<!-- Correct: each span works relative to its own direct grid parent -->
<div class="mogp-grid">
  <div class="mogp-span-8">
    <div class="mogp-grid">
      <div class="mogp-span-6"></div> <!-- 6 columns relative to the inner grid -->
    </div>
  </div>
</div>
```

**Specificity note:** `$mogp-use-where: true` generates the grid-child classes in the third row of the table above (`span-*`, `offset-*`, `col-start-*`, `col-end-*`) **and** the grid-child reset rule (`min-inline-size: 0` on `grid > *`, see [Core Concepts](#core-concepts)) with low specificity. The `pi-*` classes that work together with `container`/`container-full`, and the `gap-*`/`gi-*`/`gb-*` classes that work together with `grid`, always use standard specificity; `:where()` does not affect them. See [Validation](#validation) for details. Note that the ready-made `mogp-layout-core.css` and `mogp-layout-full.css` are compiled with `$mogp-use-where: false` (see [Compiled CSS Variants](#compiled-css-variants)), so grid-child classes carry standard specificity in those files unless you compile your own build.

## Responsive

Every utility group (span, gap, col-start, col-end, offset, container padding-inline) can optionally be generated with responsive variants.

Responsive classes work mobile-first: they're generated as `min-width` media queries, in the order defined in the `$breakpoints` map.

Class naming pattern:

```
mogp-{utility}-{breakpoint}-{value}
```

Example:

```html
<div class="mogp-span-6 mogp-span-md-4 mogp-span-lg-3"></div>
```

By default this element spans 6 columns, 4 columns at `md` and above, and 3 columns at `lg` and above.

Responsive output is automatically generated from the `$breakpoints` map; adding or removing a breakpoint automatically propagates to all related utility groups.

Responsive works the same way not just for span, but for every utility group left enabled (gap, gap inline/block, col-start, col-end, offset, container padding-inline):

```html
<div class="mogp-container mogp-pi-16 mogp-pi-lg-40">
  <div class="mogp-grid mogp-gap-16 mogp-gap-lg-32">
    <div class="mogp-span-12 mogp-span-lg-6"></div>
    <div class="mogp-span-12 mogp-span-lg-6"></div>
  </div>
</div>
```

In this example, starting at the `lg` breakpoint, the container's padding, the grid's gap, and the elements' span all change at the same time.

## Auto Utilities

`pi-auto` and `gap-auto` are classes that apply automatically scaled values per breakpoint, instead of a fixed value.

- **`pi-auto`**: Automatically adjusts the container's horizontal padding according to the breakpoint-based values in the `$container-padding-inline-auto` map.
- **`gap-auto`**: Automatically adjusts the grid's gap value according to the breakpoint-based values in the `$gap-auto-values` map.

### Why Use Auto Utilities

**Fewer classes, cleaner HTML.** If you wanted to set up the same responsive behavior with manual classes, you'd need a separate class for every breakpoint:

```html
<!-- Manual: a separate class for every breakpoint -->
<div class="mogp-container mogp-pi-16 mogp-pi-sm-16 mogp-pi-md-24 mogp-pi-lg-32 mogp-pi-xl-40">

<!-- Auto: one class, same result -->
<div class="mogp-container mogp-pi-auto">
```

The same difference applies to `gap-*` as well.

**A design rhythm managed from a single source.** With the manual approach, when you want to change the spacing rhythm, you have to go through every `container` in the project and update its classes one by one. With the auto approach, the `$container-padding-inline-auto` or `$gap-auto-values` map is updated once, on the SCSS side; every place using `pi-auto`/`gap-auto` automatically switches to the new rhythm. The HTML is never touched.

**Independent usage.** `pi-auto` and `gap-auto` each work independently, on their own, in every instance of `container`/`container-full` or `grid`. If a page has more than one container or grid, each one automatically gets the same consistent rhythm with `pi-auto`/`gap-auto` — there's no need to establish any relationship or match values between them:

```html
<header class="mogp-container mogp-pi-auto">...</header>

<main class="mogp-container-full mogp-pi-auto">
  <div class="mogp-grid mogp-gap-auto">...</div>
</main>

<section class="mogp-container mogp-pi-auto">
  <div class="mogp-grid mogp-gap-auto">...</div>
</section>
```

**A customization escape hatch: auto and manual can be used together.** `pi-auto`/`gap-auto` doesn't impose a fixed rule across all breakpoints. If you add a manual class for a specific breakpoint to the same element, the manual value only takes effect at that breakpoint; the auto behavior continues at all remaining breakpoints:

```html
<div class="mogp-container mogp-pi-auto mogp-pi-lg-40">
```

In this example, the container follows `pi-auto`'s automatic rhythm up to `lg`; at `lg` and above, it switches to the fixed value `40`. This works because both classes target the same CSS custom property, and manual utilities are generated **after** auto utilities in the output — at the same specificity, the last-defined rule wins. In other words, you can use auto as the project-wide default, and make a precise override for a single exceptional page or section.

### Different Auto Values for Different Containers/Sections

`pi-auto` and `gap-auto` rely on CSS custom properties that read a single value per breakpoint: `--{namespace}-container-pi-base/sm/md/lg/xl` for `pi-auto`, and `--{namespace}-gap-auto-base/sm/md/lg/xl` for `gap-auto`. These values are defined by default on `:root`, and are the same everywhere `pi-auto`/`gap-auto` is used.

However, because these are CSS custom properties, they can be overridden locally on a specific container or section — the `pi-auto`/`gap-auto` class stays the same, only the value that element reads changes:

```html
<style>
  .hero{
    --mogp-container-pi-base: 40px;
    --mogp-container-pi-lg: 96px;
  }
  .card-grid{
    --mogp-gap-auto-base: 8px;
    --mogp-gap-auto-lg: 16px;
  }
</style>

<section class="mogp-container mogp-pi-auto hero">
  <!-- This container uses a different pi-auto rhythm than the rest of the site -->
</section>

<div class="mogp-grid mogp-gap-auto card-grid">
  <!-- This grid uses a different gap-auto rhythm than the rest of the site -->
</div>
```

This lets you define a different scale for a specific section (e.g. a hero area or a dense card grid) without giving up the "consistent rhythm managed from a single point" advantage of `pi-auto`/`gap-auto`. The global defaults on `:root` remain unchanged; only the value read by the overridden element (and its children) changes.

## Customization

All configuration happens at compile time, by overriding SCSS variables. There is no runtime configuration option.

```scss
@use "mogp-layout" with (
  $namespace: "layout",
  $grid-columns: 16,
  $breakpoints: (
    sm: 600px,
    md: 900px,
    lg: 1200px,
    xl: 1536px
  ),
  $container-max: 1440px,
  $mogp-output-col-start-utilities: false,
  $mogp-output-col-end-utilities: false
);
```

In this example, the namespace has been changed to `layout`, the grid has been expanded to 16 columns, breakpoints have been customized, and col-start/col-end utility generation has been completely disabled. Core classes like span, offset, and gap are automatically affected by these changes; no manual synchronization is needed.

### Grid Column Count Is Fully Flexible

`$grid-columns` is not a fixed value in MOGP, but a single SCSS setting. While `12` is the default, you can use any positive integer based on your project's needs:

```scss
@use "mogp-layout" with (
  $grid-columns: 24
);
```

This one-line change is enough. All span classes from `span-1` to `span-24`, all col-start/col-end classes from `col-start-1` to `col-start-25`, and all offset classes from `offset-1` to `offset-23` (plus `offset-auto`) — with both fixed and responsive variants — are automatically regenerated. There's no second place that needs manual updating.

As the column count increases, the number of responsive variants also increases (proportional to `$bp-steps × $grid-columns`); so at high column counts, disabling groups you don't need (`$mogp-output-col-start-utilities`, `$mogp-output-offset-responsive`, etc.) helps keep the CSS size under control (see [Utility Output](#utility-output)).

### Breakpoint Naming Is Also Customizable

`sm`/`md`/`lg`/`xl` are not fixed names; they are the keys of the `$breakpoints` map, and can be renamed to whatever fits your project — as long as each name is a safe CSS identifier (letters, digits, and hyphens, not starting with a digit; no spaces or symbols like `.`/`#`/`/`). This constraint exists because these names are reflected directly both in class names (`span-{name}-6`) and in custom property names (`--{namespace}-container-pi-{name}`); an unsafe name would produce broken CSS, so it's rejected at compile time instead (see [Validation](#validation)):

```scss
@use "mogp-layout" with (
  $breakpoints: (
    mobile: 480px,
    tablet: 768px,
    desktop: 1200px
  ),
  $container-padding-inline-auto: (
    base: 16px,
    mobile: 16px,
    tablet: 24px,
    desktop: 40px
  ),
  $gap-auto-values: (
    base: 16px,
    mobile: 16px,
    tablet: 24px,
    desktop: 24px
  )
);
```

```html
<div class="mogp-span-12 mogp-span-tablet-6 mogp-span-desktop-4"></div>
```

**Important:** If you change the `$breakpoints` keys, you must also update the keys of the `$container-padding-inline-auto` and `$gap-auto-values` maps (except `base`) with exactly the same names. These two maps must be fully aligned with `$breakpoints`; otherwise the build fails with a validation error (see [Validation](#validation)).

## Namespace

`$namespace` controls not just the class prefix, but **all** generated CSS Custom Property names. This means MOGP can be used alongside another CSS framework or an existing corporate style infrastructure already in use in the project, without any naming collisions:

```scss
@use "mogp-layout" with (
  $namespace: "layout"
);
```

With this configuration, the generated classes are not `.container` but `.layout-container`, and the custom properties are not `--container-max` but `--layout-container-max`. This removes any risk of short, generic names like `container`, `grid`, `span` colliding with another library.

Multiple MOGP outputs compiled separately with different `$namespace` values (e.g. `admin-mogp` in an admin panel, `mogp` on the general site) can coexist on the same page without affecting each other. This allows different teams or different product areas within the same project (e.g. multiple apps within a monorepo) to carry their own MOGP configuration.

## Configuration

| Setting | Type | Default | Description |
|---|---|---|---|
| `$namespace` | string | `"mogp"` | Determines the generated class and custom property prefix. |
| `$mogp-use-layer` | bool | `false` | When `true`, the output is wrapped in a `@layer` block. |
| `$layer-namespace` | string | `"mogp"` | The first component of the layer name. |
| `$layer-suffix` | string | `"core"` | The second component of the layer name. |
| `$mogp-use-where` | bool | `true` | If `true`, grid child selectors are generated with low specificity using `:where()`. |
| `$grid-columns` | number | `12` | The number of columns in the grid; span/col-start/col-end/offset are generated based on this value. |
| `$breakpoints` | map | `sm, md, lg, xl` | The breakpoint map used for responsive generation; must be in ascending order. |
| `$container-max` | length | `1280px` | The max width of the `.container` class. |
| `$container-padding-inline-auto` | map | breakpoint-based | The automatic values used by the `pi-auto` class. |
| `$container-padding-inline-scale` | map | `0, 16, 24, 32, 40` | The value scale for the fixed `pi-{step}` utilities. |
| `$gap-auto-values` | map | breakpoint-based | The automatic values used by the `gap-auto` class. |
| `$gaps` | map | `0, 8, 16, 24, 32, 40, 48` | The value scale for the fixed `gap-{step}` / `gi-{step}` / `gb-{step}` utilities. |
| `$mogp-output-banner` | bool | `true` | Adds a summary info banner to the top of the compiled CSS (`/*! ... */` comments). By embedding the active settings — version, column count, breakpoints, selector mode, which utility groups were generated — into the CSS output, it lets anyone looking at the compiled file see the configuration without going back to the SCSS source. Documentation-only; has no effect on any styling. |
| `$mogp-output-*-utilities` | bool | `true` | Determines whether the fixed (non-responsive) classes of the relevant utility group are generated. |
| `$mogp-output-*-responsive` | bool | `true` | Determines whether the responsive variants of the relevant utility group are generated. |

### Default Token Values

The table above shows what each setting does; the tables below list the **explicit default values** of each scale. All of them can be customized by overriding the relevant SCSS variable — what's shown here is only the factory defaults.

**Breakpoints** — `$breakpoints`

| Breakpoint | Value |
|---|---|
| `sm` | `640px` |
| `md` | `768px` |
| `lg` | `1024px` |
| `xl` | `1280px` |

**Container** — `$container-max`, `$grid-columns`

| Setting | Value |
|---|---|
| Max container width | `1280px` |
| Grid column count | `12` |

**Container padding-inline scale** — `$container-padding-inline-scale` (for fixed `pi-{step}` classes)

| Step | Value |
|---|---|
| `0` | `0` |
| `16` | `16px` |
| `24` | `24px` |
| `32` | `32px` |
| `40` | `40px` |

**`pi-auto` values** — `$container-padding-inline-auto` (breakpoint-based)

| Breakpoint | Value |
|---|---|
| `base` | `16px` |
| `sm` | `24px` |
| `md` | `24px` |
| `lg` | `32px` |
| `xl` | `40px` |

**Gap scale** — `$gaps` (for fixed `gap-{step}` classes)

| Step | Value |
|---|---|
| `0` | `0` |
| `8` | `8px` |
| `16` | `16px` |
| `24` | `24px` |
| `32` | `32px` |
| `40` | `40px` |
| `48` | `48px` |

> **Note:** There is no separate scale for `gi-{step}` (gap-inline) and `gb-{step}` (gap-block) — both use the same `$gaps` map above. `mogp-gi-24` and `mogp-gb-24` apply the same `24` step to column-only and row-only gap, respectively.

**`gap-auto` values** — `$gap-auto-values` (breakpoint-based)

| Breakpoint | Value |
|---|---|
| `base` | `16px` |
| `sm` | `16px` |
| `md` | `24px` |
| `lg` | `24px` |
| `xl` | `24px` |

Every value in these tables can be changed by overriding the SCSS variable of the same name with `@use ... with (...)` (see [Customization](#customization)). For example, to change only the gap scale:

```scss
@use "mogp-layout" with (
  $gaps: (
    0: 0,
    12: 12px,
    20: 20px,
    28: 28px
  )
);
```

## Utility Output

> **Note:** Core classes (`container`, `container-full`, `grid`, `span`, `pi-auto`, `gap-auto`) are always generated and cannot be disabled.

The following groups are optional and can be turned off by setting the relevant flag to `false`:

| Utility Group | Fixed Flag | Responsive Flag |
|---|---|---|
| Container padding-inline | `$mogp-output-padding-inline-utilities` | `$mogp-output-padding-inline-responsive` |
| Gap | `$mogp-output-gap-utilities` | `$mogp-output-gap-responsive` |
| Gap Inline / Gap Block | `$mogp-output-gap-axis-utilities` | `$mogp-output-gap-axis-responsive` |
| Col Start | `$mogp-output-col-start-utilities` | `$mogp-output-col-start-responsive` |
| Col End | `$mogp-output-col-end-utilities` | `$mogp-output-col-end-responsive` |
| Offset | `$mogp-output-offset-utilities` | `$mogp-output-offset-responsive` |

Unused groups can be disabled to reduce the compiled CSS size.

> **Note:** `0` is also a valid step in the `$gaps` and `$container-padding-inline-scale` scales. Classes like `mogp-gap-0` or `mogp-pi-0` can be used to explicitly zero out the gap/padding at a given breakpoint — e.g. `mogp-pi-0 mogp-pi-lg-32` removes the padding entirely on small screens and reintroduces it starting at `lg`.

## Validation

MOGP catches misconfigurations at compile time and stops with meaningful error messages. The main things checked:

- Invalid CSS identifiers for `$namespace`, `$layer-namespace`, `$layer-suffix`, and `$breakpoints` keys (spaces, symbols, starting with a digit, empty string).
- Non-numeric, unit-bearing, zero, or negative values for `$grid-columns`.
- Unitless, zero/negative, or non-ascending values within `$breakpoints`.
- Unitless, zero, or negative values for `$container-max`.
- Unitless or negative values in the `$gaps`, `$container-padding-inline-scale`, `$container-padding-inline-auto`, `$gap-auto-values` maps.
- Breakpoint-based maps (`$container-padding-inline-auto`, `$gap-auto-values`) not matching `$breakpoints` exactly (missing or extra keys).
- Values other than `true`/`false` for the `$mogp-use-layer`, `$mogp-use-where`, and `$mogp-output-*` flags.

Thanks to these checks, an invalid configuration doesn't silently produce broken CSS; it throws an explicit error at build time.

> **Note:** `$mogp-use-where: true` affects the grid child selectors (`span`, `offset`, `col-start`, `col-end`) **and** the grid-child reset rule (`min-inline-size: 0` on `grid > *`). Container selectors (`container`, `container-full`, `pi-*`) and gap classes (`gap-*`, `gi-*`, `gb-*`) are always generated with standard specificity; `:where()` doesn't affect these classes.

## Design Philosophy

MOGP is not a utility framework.

MOGP is not a CSS framework.

MOGP is only a layout system.

Its scope is deliberately limited, and these boundaries will not be expanded: flex utilities, display utilities, typography, color, margin, padding (other than container padding-inline), components, or animations will not be added.

The goal is to provide a powerful and predictable layout system with the smallest possible API.

MOGP doesn't try to do everything. It solves the layout problem, and stops there.

## Browser Support

MOGP targets modern browsers that support the following features:

- CSS Grid
- CSS Custom Properties
- Logical Properties (`inline-size`, `margin-inline`, `padding-inline`)
- `@layer` (optional — only required when `$mogp-use-layer: true`)
- `:where()` (optional — only required when `$mogp-use-where: true`)

Even when `$mogp-use-layer` and `$mogp-use-where` are set to `false`, the use of Logical Properties and CSS Custom Properties is mandatory; these two features form the foundation of the framework and cannot be disabled.

## Development Process

MOGP's design decisions and architectural boundaries were determined by a human; the code was written and tested with the help of AI assistants.

## License

MIT
