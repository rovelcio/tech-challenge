test("Jest is up & running!", () => {
  expect(process.env.JEST_WORKER_ID).not.toBe(undefined);
});
