test("Jest is running specified tests", () => {
  expect(process.env.JEST_WORKER_ID).not.toBe(undefined);
});
