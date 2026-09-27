# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` & editing 


```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

---

<div align="center">

<a href="https://github.com/santheesh73">
  <img src="https://img.shields.io/badge/Author-Santheesh%20S-181717?style=for-the-badge&logo=github&logoColor=white" alt="Author" />
</a>
<a href="https://github.com/santheesh73?tab=repositories">
  <img src="https://img.shields.io/badge/Portfolio-Projects-DC2626?style=for-the-badge&logo=git&logoColor=white" alt="Projects" />
</a>

<br>

<sub>Developed for the Education purpose</sub><br>
<sub>Crafted with care by <a href="https://github.com/santheesh73"><b>Santheesh S</b></a></sub>

</div>

