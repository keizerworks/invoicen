import { hash, verify } from "@node-rs/argon2";

const hashOptions = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export const hashPassword = async (password: string) =>
  await hash(password, hashOptions);

export const verifyPasswordHash = async (hash: string, password: string) =>
  await verify(hash, password);
