const bcrypt = require("bcrypt");

async function test() {
  const password = "Top_secret_text";

  let start = performance.now();
  const hash10 = await bcrypt.hash(password, 10);
  let end = performance.now();

  console.log(`bcrypt 10: ${(end - start).toFixed(2)} ms`);

  start = performance.now();
  const hash12 = await bcrypt.hash(password, 12);
  end = performance.now();

  console.log(`bcrypt 12: ${(end - start).toFixed(2)} ms`);
}

test();
