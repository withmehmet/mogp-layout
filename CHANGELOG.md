# Changelog

This file documents notable changes to the project, release by release. The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.1.0] - 2026-09-11

Initial release.

### Added

- Core classes: `container`, `container-full`, `grid`, `span` (fixed + responsive + `span-auto`), `pi-auto`, `gap-auto` — always generated
- Optional utilities: `col-start-*`, `col-end-*`, `offset-*` (including `offset-auto` / `offset-{breakpoint}-auto`), `gap-*`, `gi-*`, `gb-*`, `pi-*` — can be toggled on/off via output flags
- Class and CSS custom property isolation via `$namespace`
- Fully customizable grid column count, breakpoints, container-max, gap/padding scales
- Optional `:where()` selector mode and Cascade Layer support
- Compile-time validation (namespace, breakpoint keys, numeric scales, breakpoint ordering/alignment)
- Two ready-made compiled CSS variants: Minimal and Full
- README, GETTING_STARTED, CONFIGURATION documentation

[Unreleased]: https://github.com/withmehmet/mogp-layout/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/withmehmet/mogp-layout/releases/tag/v0.1.0
