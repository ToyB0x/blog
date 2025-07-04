---
title: 'Optimizing Prisma Related Types: 100x Improvement'
description: 'Dramatically improve TypeScript type processing performance in Prisma clients. Learn the approach that achieved 100x improvement.'
publishDate: '01 July 2025'
recommend: false
tags: ['Prisma', 'TypeScript', 'Performance', 'Optimization']
---

## Notes

- The code used in this article can be viewed at:  
  https://github.com/ToyB0x/ts-bench/pull/211

---

When working with large database schemas in Prisma applications, a simple change in how you define types can dramatically improve TypeScript compilation performance. Let me start with the conclusion:

```typescript
// ❌ Direct PrismaClient type reference
type Client = PrismaClient;           // Types: 269,598 | Memory: 395MB | Time: 1.86s

// ✅ Runtime type inference with typeof  
type Client = typeof client;          // Types: 222     | Memory: 147MB | Time: 0.41s
```

| Metric | Direct Reference | typeof | Improvement |
|--------|------------------|--------|-------------|
| Types | 269,598 | 222 | **99.9% reduction** |
| Memory | 395MB | 147MB | **62% reduction** |
| Compile Time | 1.86s | 0.41s | **78% reduction** |

This single line change delivers massive performance gains. If you're interested in the details and implementation strategies, continue reading.

---


## The Challenge of Large Database Schemas

In enterprise applications with extensive database schemas—think e-commerce platforms with hundreds of product variants, financial systems with complex transaction hierarchies, or content management systems with intricate relationship webs—Prisma's generated types can become enormous. A schema with 50+ tables and deep relationships can generate TypeScript definitions spanning thousands of lines, leading to:

- Compilation times exceeding several minutes
- Memory usage climbing beyond 1GB during type checking
- IDE responsiveness degrading significantly
- CI/CD pipelines timing out on type checks

## Comparing Two Approaches

### Strategy 1: Direct PrismaClient Type Reference

```typescript
import { PrismaClient } from "@ts-bench/prisma-base";

type Arg = PrismaClient;
const saveFn = async (_prismaClient: Arg) => {};

const client = new PrismaClient({ datasourceUrl: "file:./sample.db" });
await saveFn(client);
```

**Compilation Metrics:**
- Types: 269,598
- Instantiations: 2,772,929
- Memory usage: 394,718K
- Compilation time: 1.86s

### Strategy 2: Runtime Type Inference with `typeof`

```typescript
import { PrismaClient } from "@ts-bench/prisma-base";

type Arg = typeof client;
const saveFn = async (_prismaClient: Arg) => {};

const client = new PrismaClient({ datasourceUrl: "file:./sample.db" });
await saveFn(client);
```

**Compilation Metrics:**
- Types: 222
- Instantiations: 152
- Memory usage: 146,854K
- Compilation time: 0.41s

## Performance Analysis

The difference between these approaches is striking:

- **99.9% reduction** in type instantiations (2.7M → 152)
- **62% reduction** in memory usage (395MB → 147MB)
- **78% reduction** in compilation time (1.86s → 0.41s)

## Why `typeof` Wins

The `typeof` operator creates a more efficient type resolution path by:

1. **Deferred Type Resolution**: Instead of immediately resolving the complete PrismaClient type tree, TypeScript defers resolution until actually needed
2. **Reduced Type Instantiation**: The compiler doesn't need to instantiate the entire Prisma type hierarchy upfront
3. **Memory Efficiency**: Less type information is held in memory during compilation

## Implementation Guidelines for Large Schemas

```typescript
// ❌ Problematic for large schemas
const createUser = async (prisma: PrismaClient, userData: UserData) => {
  return prisma.user.create({ data: userData });
};

// ✅ Optimized for large schemas
const client = new PrismaClient();
const createUser = async (prisma: typeof client, userData: UserData) => {
  return prisma.user.create({ data: userData });
};

// ✅ Repository pattern optimization
class UserRepository {
  constructor(private db: typeof client) {}
  
  async create(data: UserData) {
    return this.db.user.create({ data });
  }
}
```

## Advanced Patterns for Complex Schemas

In large applications, this optimization enables sophisticated architectural patterns:

```typescript
// Database client type for dependency injection
type DatabaseClient = typeof client;

// Generic repository base class
abstract class BaseRepository<TModel> {
  constructor(protected db: DatabaseClient) {}
  abstract getModel(): any;
}

// Transaction-aware service pattern
type TransactionClient = Parameters<Parameters<DatabaseClient['$transaction']>[0]>[0];

class OrderService {
  constructor(private db: DatabaseClient) {}
  
  async createOrderWithItems(
    orderData: OrderCreateInput,
    items: OrderItemCreateInput[]
  ) {
    return this.db.$transaction(async (tx: TransactionClient) => {
      const order = await tx.order.create({ data: orderData });
      await tx.orderItem.createMany({
        data: items.map(item => ({ ...item, orderId: order.id }))
      });
      return order;
    });
  }
}
```

## Measuring Impact in Large Schema Projects

For schemas with significant complexity, establish baseline metrics:

```bash
# Generate comprehensive diagnostics
tsc --noEmit --diagnostics --extendedDiagnostics

# Monitor specific metrics for large schemas:
# - Types: Should stay under 100K for reasonable performance
# - Instantiations: Target < 500K for large schemas
# - Memory: Aim to keep under 200MB
# - Time: Sub-second compilation for individual files
```

**Performance Thresholds for Large Schemas:**
- **Green Zone**: <50K types, <100K instantiations, <100MB memory
- **Yellow Zone**: 50K-150K types, 100K-1M instantiations, 100-300MB memory
- **Red Zone**: >150K types, >1M instantiations, >300MB memory

## Conclusion

When working with extensive database schemas, type definition strategy becomes a critical architectural decision. The `typeof` approach isn't just an optimization—it's an essential technique for maintaining development velocity as your application scales.

**Real-World Impact in Large Applications:**
- Reduced compilation times from minutes to seconds
- Decreased memory pressure on development machines
- Faster IDE response times during active development
- More reliable CI/CD pipelines with consistent build times
- Improved developer experience when working with complex data models

The 78% compilation time reduction demonstrated here scales exponentially with schema complexity. In a system with 100+ tables and deep relationships, this optimization can mean the difference between a 30-second type check and a 5-minute bottleneck.
