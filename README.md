# ShopNet (JSF Online Shop Assignment)

**Author:** Tele Caster Nilsen<br/>
**Website:** [telecasternilsen.com](https://telecasternilsen.com)<br/>

**Table of Contents**

- [Technologies](#technologies)
- [Decisions](#decisions-explained)
- [Get Started](#get-started)
- [Resources](#resources)
- [AI Usage](#ai-usage)

---

## Technologies

- React
- Typescript
- Tanstack router
- Tailwind (styles)
  - Lucide Icons
  - shadcn component and styling principles

---

### Decisions Explained

**Why Tanstack Router?**<br/>
Simply because I like the idea of file-based routing and their type-safe approach.

**Why Redux Toolkit (RTK)?**<br/>
Currently, this applications first iteration holds a rather simple state management. But it's the kind of application that quickly scales into a complex ecosystem with payment and shipping methods, address data, promotions, inventory checks, and order history. Therefore, I chose to implement a system with RTK, so the app's scalability aligns with a growing app and developer team. Taking advantage of benefits such as:

- Developer experience (team work-alignment)
- Explicit business rules
- Feature-slice patterns

---

## Get Started

```bash
git clone XXX
cd XXX
code . # or IDE of choice
```

Run the project

```bash
npm run dev
```

**Available scripts**

```bash
npm run dev # runs the project in development mode
npm run build # builds the project for production
npm run lint # formats all relevant files
```

### Deployment

This application is (will be) deployed with Netlify, as a sub-domain to: `telecasternilsen.com`.

## Resources

- [Tanstack Router](https://tanstack.com/router/latest/docs/quick-start)
- [File-based-routing - the why](https://tanstack.com/router/latest/docs/decisions-on-dx)
- [File-based-routing - the how](https://tanstack.com/router/latest/docs/routing/file-based-routing)
- [Tanstack Router - LinkOptions](https://tanstack.com/router/latest/docs/guide/link-options)

---

## AI Usage

Go to [AI_LOG.md](AI_LOG.md)
