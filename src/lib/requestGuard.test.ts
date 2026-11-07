import { test } from "node:test"
import assert from "node:assert/strict"
import { clientIp, rateLimiter, readBody, readJson } from "./requestGuard.ts"

const post = (body: string, headers: Record<string, string> = {}) =>
  new Request("http://localhost/api/test", { method: "POST", body, headers: { "Content-Type": "application/json", ...headers } })

test("clientIp takes the first x-forwarded-for entry", () => {
  assert.equal(clientIp(post("{}", { "x-forwarded-for": "1.2.3.4, 10.0.0.1" })), "1.2.3.4")
  assert.equal(clientIp(post("{}")), "unknown")
})

test("rateLimiter stops one visitor after its own limit", () => {
  const limited = rateLimiter({ perVisitor: 3, total: 100, windowMs: 60_000 })
  assert.deepEqual([1, 2, 3, 4].map(() => limited("a", 0)), [false, false, false, true])
  assert.equal(limited("b", 0), false, "another visitor is not affected")
})

test("rateLimiter's shared cap holds against a new made-up address every time", () => {
  const limited = rateLimiter({ perVisitor: 3, total: 5, windowMs: 60_000 })
  const results = Array.from({ length: 8 }, (_, i) => limited(`spoofed-${i}`, 0))
  assert.equal(results.filter((r) => !r).length, 5)
})

test("rateLimiter lets requests through again once the window has passed", () => {
  const limited = rateLimiter({ perVisitor: 1, total: 100, windowMs: 1000 })
  assert.equal(limited("a", 0), false)
  assert.equal(limited("a", 500), true)
  assert.equal(limited("a", 1001), false)
})

test("readJson returns an object body", async () => {
  const body = await readJson(post('{"name":"Asha"}'))
  assert.ok(body.ok)
  assert.equal(body.data.name, "Asha")
})

test("readJson refuses JSON that is not an object, and broken JSON", async () => {
  for (const raw of ["null", "[1]", '"text"', "{broken"]) {
    const body = await readJson(post(raw))
    assert.equal(body.ok, false, raw)
    if (!body.ok) assert.equal(body.response.status, 400, raw)
  }
})

test("readBody refuses a body over the cap, with or without a content-length", async () => {
  const big = "x".repeat(2048)
  const declared = await readBody(post(big, { "content-length": "2048" }), 1024)
  assert.equal(declared.ok, false)
  if (!declared.ok) assert.equal(declared.response.status, 413)

  const stream = new ReadableStream({ start: (c) => (c.enqueue(new TextEncoder().encode(big)), c.close()) })
  const undeclared = await readBody(new Request("http://localhost/", { method: "POST", body: stream, duplex: "half" } as RequestInit), 1024)
  assert.equal(undeclared.ok, false)
  if (!undeclared.ok) assert.equal(undeclared.response.status, 413)
})
