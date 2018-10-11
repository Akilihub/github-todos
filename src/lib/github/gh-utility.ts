/**
 * function that returns basic repository properties from payload.
 */

import { Context } from "./types";

export default function getBasicRepoProps (context: Context): any {
  const owner = context.payload.repository.owner.login;
  const repo = context.payload.repository.name;
  const fields = { owner, repo };

  return fields;
}
