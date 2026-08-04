const testString = "This is test string";

const stringBuffer = Buffer.from(testString, "utf8");

const base64String = stringBuffer.toString("base64");
const hexString = stringBuffer.toString("hex");

const base64ToBuffer = Buffer.from(base64String, "base64");
const base64BufferToOriginalString = base64ToBuffer.toString("utf8");

const hexToBuffer = Buffer.from(hexString, "hex");
const hexBufferToOriginalString = hexToBuffer.toString("utf8");

console.log({
  base64BufferToOriginalString,
  hexBufferToOriginalString,
});
