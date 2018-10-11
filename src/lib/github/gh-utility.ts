/**
 * function that returns basic repository properties from payload.
 */

import { Context } from "./types";

interface RepoProps {
    owner: string;
    repo: string;
}

export default function getBasicRepoProps (context: Context): RepoProps {
  const owner = context.payload.repository.owner.login;
  const repo = context.payload.repository.name;
  const fields = { owner, repo };

  return fields;
}
