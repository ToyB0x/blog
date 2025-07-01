---
title: Optimizing Prisma Related Type, A 100x Improvement Approach
description: Dramatically improve TypeScript type processing performance in Prisma clients. Learn the approach that achieved 100x speedup in real-world measurements
publishDate: 2025-07-01
recommend: false
tags: ['Prisma', 'TypeScript', 'Performance', 'Optimization']
---

## Notes

- This article is a rewrite of [Zenn Japanese article](https://zenn.dev/toyb0x/articles/b43251f6ce65fb).
- This text is a simplified and AI-translated version of the original Japanese article.
- The code used in this article can be viewed at:  
  https://github.com/ToyB0x/ts-bench/pull/190

## TL;DR

- Type processing approaches during Prisma client extension dramatically affect TypeScript compilation performance
- Optimization achieved 99.8% type reduction, 99.96% type instantiation reduction, and 100x execution time improvement
- Interface constraints and typeof utilization are highly effective

## Introduction

In enterprise-grade application development, increasing TypeScript compilation times pose a serious challenge that significantly reduces developer productivity. Particularly in Prisma projects with complex database schemas, type processing bottlenecks often impede development workflows.

This article shares experiences from analyzing and optimizing type processing performance using a scientific approach, starting from actual production environment performance issues. The methods that achieved **99.8% type reduction** and **100x performance improvement** are explained in a reproducible manner.

## Technical Challenge Discovery

In a Prisma schema with complex 30-layer nested relations, the following issues became apparent:

- Exponential increase in TypeScript compilation time
- Degraded responsiveness of IDE type checking features
- Increased build times in CI/CD pipelines

We identified that the approach to extending PrismaClient with Extensions directly impacts these performance issues and conducted quantitative verification.

## Performance Comparison Results

### 1. Heavy Approach (Baseline)
```typescript
const extendPrisma = (PrismaClient: PrismaClient) => {
  console.log("Extend PrismaClient with some logger and other features...");
  return PrismaClient;
};

const client = new PrismaClient({ datasourceUrl: "file:./sample.db" });
const extendedClient = extendPrisma(client);
```

**Results:**
- Type count: 269,668
- Type instantiations: 2,773,122
- Execution time: 1.84 seconds

### 2. Interface Approach
```typescript
interface IPrismaClient {
  $extends: PrismaClient['$extends']
}

const extendPrisma = <T extends IPrismaClient>(prisma: T): T => {
  return prisma.$extends({
    // extension logic
  });
};
```

**Results:**
- Type count: 3,004 (96% reduction)
- Type instantiations: 19,098 (99.3% reduction)
- Execution time: 0.45 seconds

### 3. Typeof Approach (Recommended)
```typescript
const basePrisma = new PrismaClient();

const extendPrisma = (prisma: typeof basePrisma) => {
  return prisma.$extends({
    // extension logic
  });
};
```

**Results:**
- Type count: 648 (99.8% reduction)
- Type instantiations: 972 (99.96% reduction)
- Execution time: 0.43 seconds

## Optimization Techniques

### 1. Minimal Interface Design
Limit type scope and prevent unnecessary type expansion

### 2. Typeof Constraint Utilization
Appropriately constrain type inference to reduce type system load

### 3. Avoid Direct PrismaClient Type Passing
Avoid passing entire PrismaClient types within Extensions

## Practical Recommendations

**When developing Prisma Extensions:**
- Actively utilize typeof constraints
- Design minimal necessary interfaces
- Implement with awareness of type scope

**For large-scale applications:**
- Regular monitoring of type processing performance
- Validation with complex schemas
- Continuous optimization of compilation times

## Conclusion

Prisma type processing can achieve dramatic performance improvements with the right approach. Particularly through typeof constraint utilization, significant reductions in type count and type instantiations, along with 100x execution time speedup, can be realized.

In large-scale Prisma projects, being mindful of type processing performance during Extension design can lead to substantial improvements in developer experience.
