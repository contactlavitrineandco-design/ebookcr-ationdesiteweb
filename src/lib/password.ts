import "server-only";
import { randomBytes, scrypt, timingSafeEqual, createHash } from "node:crypto";

// scrypt (N=2^15, r=8, p=1) : recommandé par l'OWASP, natif dans Node, sans dépendance.
const N = 32768;
const KEYLEN = 64;
const MAXMEM = 64 * 1024 * 1024;

function derive(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) =>
    scrypt(password.normalize("NFKC"), salt, KEYLEN, { N, r: 8, p: 1, maxmem: MAXMEM }, (err, key) =>
      err ? reject(err) : resolve(key),
    ),
  );
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await derive(password, salt);
  return `scrypt$${N}$${salt.toString("base64")}$${key.toString("base64")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [algo, n, saltB64, keyB64] = stored.split("$");
  if (algo !== "scrypt" || Number(n) !== N) return false;
  const expected = Buffer.from(keyB64, "base64");
  const actual = await derive(password, Buffer.from(saltB64, "base64"));
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

// Hash factice : on vérifie quand même un mot de passe quand l'e-mail n'existe pas,
// pour que le temps de réponse ne révèle pas quels comptes existent.
let dummy: string | undefined;
export async function dummyVerify(password: string) {
  dummy ??= await hashPassword("charpente-dummy-password");
  await verifyPassword(password, dummy);
}

export function randomToken(bytes = 32): string {
  return randomBytes(bytes).toString("base64url");
}

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}
