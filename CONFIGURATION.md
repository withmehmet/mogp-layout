# CONFIGURATION.md — MOGP Configuration Template

This file is a copy-paste template of every setting you can copy into `@use "mogp-layout" with (...)` and change. Each variable below matches, one-to-one, the real `$` name and real default value in the source SCSS.

Explanations of what each setting does are below the code block, grouped section by section into tables. For more detail, see the [Configuration](./README.md#configuration) and [Default Token Values](./README.md#default-token-values) sections in `README.md`.

This file is only a ready-made starting point; you don't need to change every field — just move the lines you need into your `with (...)` block, and the rest keep their `!default` value.

All values are validated at compile time. An invalid value (e.g. a unitless length, a breakpoint map in descending order, an auto-value map misaligned with `$breakpoints`) stops the build immediately with a clear error message.

```scss
@use "mogp-layout" with (

  $namespace: "mogp",
  $mogp-use-layer: false,
  $layer-namespace: "mogp",
  $layer-suffix: "core",
  $mogp-output-banner: true,
  $mogp-use-where: true,

  $grid-columns: 12,
  $breakpoints: (
    sm: 640px,
    md: 768px,
    lg: 1024px,
    xl: 1280px
  ),

  $container-max: 1280px,
  $container-padding-inline-auto: (
    base: 16px,
    sm: 24px,
    md: 24px,
    lg: 32px,
    xl: 40px
  ),
  $container-padding-inline-scale: (
    0: 0,
    16: 16px,
    24: 24px,
    32: 32px,
    40: 40px
  ),

  $gap-auto-values: (
    base: 16px,
    sm: 16px,
    md: 24px,
    lg: 24px,
    xl: 24px
  ),
  $gaps: (
    0: 0,
    8: 8px,
    16: 16px,
    24: 24px,
    32: 32px,
    40: 40px,
    48: 48px
  ),

  $mogp-output-padding-inline-utilities: true,
  $mogp-output-padding-inline-responsive: true,
  $mogp-output-gap-utilities: true,
  $mogp-output-gap-responsive: true,
  $mogp-output-gap-axis-utilities: true,
  $mogp-output-gap-axis-responsive: true,
  $mogp-output-col-start-utilities: true,
  $mogp-output-col-start-responsive: true,
  $mogp-output-col-end-utilities: true,
  $mogp-output-col-end-responsive: true,
  $mogp-output-offset-utilities: true,
  $mogp-output-offset-responsive: true

);
```

## Explanations

### 1. Namespace, Layer, Selector Mode

| Variable | Description |
|---|---|
| `$namespace` | Sets the namespace prefix. |
| `$mogp-use-layer` | Turns `@layer` usage on or off. |
| `$layer-namespace` | Sets the layer namespace. |
| `$layer-suffix` | Sets the layer name. |
| `$mogp-output-banner` | Adds a configuration summary to the CSS. |
| `$mogp-use-where` | Determines whether `:where()` is used in grid-child selectors (`span`, `offset`, `col-start`, `col-end`, `grid > *`). `container`, `grid`, and `gap-*`/`gi-*`/`gb-*` are not affected. |

### 2. Grid and Breakpoints

| Variable | Description |
|---|---|
| `$grid-columns` | Sets the grid column count. |
| `$breakpoints` | Sets the breakpoints. Keys must be safe CSS identifiers (letters, digits, hyphens; not starting with a digit; no spaces or symbols) and must match the `$container-padding-inline-auto` and `$gap-auto-values` maps. Must be in ascending order. |

### 3. Container

| Variable | Description |
|---|---|
| `$container-max` | Sets the container's max width (a single fixed value). |
| `$container-padding-inline-auto` | Sets `pi-auto`'s breakpoint-based values. Keys must match `$breakpoints` (except `base`). |
| `$container-padding-inline-scale` | Sets the spacing scale for `pi-{step}` classes. |

### 4. Gap

| Variable | Description |
|---|---|
| `$gap-auto-values` | Sets `gap-auto`'s breakpoint-based values. Keys must match `$breakpoints` (except `base`). |
| `$gaps` | Sets the shared spacing scale for `gap-{step}`, `gi-{step}`, `gb-{step}` (there is no separate scale). |

### 5. Output Control Flags

Core classes (`container`, `container-full`, `grid`, `span`, `pi-auto`, `gap-auto`) are not affected by these flags.

| Variable | Description |
|---|---|
| `$mogp-output-padding-inline-utilities` | Should the fixed `pi-{step}` classes be generated? |
| `$mogp-output-padding-inline-responsive` | Should the `pi-{breakpoint}-{step}` responsive variants be generated? |
| `$mogp-output-gap-utilities` | Should the fixed `gap-{step}` classes be generated? |
| `$mogp-output-gap-responsive` | Should the `gap-{breakpoint}-{step}` responsive variants be generated? |
| `$mogp-output-gap-axis-utilities` | Should the fixed `gi-{step}` and `gb-{step}` classes be generated? |
| `$mogp-output-gap-axis-responsive` | Should the `gi-{breakpoint}-{step}` and `gb-{breakpoint}-{step}` responsive variants be generated? |
| `$mogp-output-col-start-utilities` | Should the fixed `col-start-{N}` classes be generated? |
| `$mogp-output-col-start-responsive` | Should the `col-start-{breakpoint}-{N}` responsive variants be generated? |
| `$mogp-output-col-end-utilities` | Should the fixed `col-end-{N}` classes be generated? |
| `$mogp-output-col-end-responsive` | Should the `col-end-{breakpoint}-{N}` responsive variants be generated? |
| `$mogp-output-offset-utilities` | Should the fixed `offset-{N}` classes be generated? |
| `$mogp-output-offset-responsive` | Should the `offset-{breakpoint}-{N}` responsive variants be generated? |

## Notes

- Every value in this template is already defined as `!default` in the source SCSS. Only move the lines you want to change into your own `with (...)` block; you don't need to copy all of them.
- If you change the `$breakpoints` keys (e.g. `mobile`/`tablet` instead of `sm`/`md`), you must also update the keys of the `$container-padding-inline-auto` and `$gap-auto-values` maps (except `base`) with exactly the same names — otherwise the build fails with a validation error.
- `$container-max` is a single fixed value, not a map that varies by breakpoint.
- There is no separate scale for `gi-*` and `gb-*` — both share the `$gaps` map.
- When any output flag is turned off, the classes belonging to that group are never present in the compiled CSS — even if used in HTML, no style is applied at all.
