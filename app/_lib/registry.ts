import type { InstallTarget, Project } from '../_data/projects';

/**
 * Reads current versions from PyPI, npm, and GitHub releases at build time (refreshed at most daily).
 * Any failure falls back to the committed value verified on 2026-09-29, so a build never invents a version.
 */

async function getJson(url: string): Promise<unknown | null> {
  try {
    const response = await fetch(url, { headers: { accept: 'application/json', 'user-agent': 'alexmercedai.com build' }, signal: AbortSignal.timeout(8000), next: { revalidate: 86400 } });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

const SEMVER = /^v?\d+\.\d+\.\d+(?:[-.][0-9A-Za-z.]+)?$/;

export async function registryVersion(target: InstallTarget): Promise<string> {
  if (target.registry === 'pypi') {
    const data = (await getJson(`https://pypi.org/pypi/${target.pkg}/json`)) as { info?: { version?: string } } | null;
    const version = data?.info?.version;
    return version && SEMVER.test(version) ? version : target.fallbackVersion;
  }
  const data = (await getJson(`https://registry.npmjs.org/${target.pkg}`)) as { 'dist-tags'?: { latest?: string } } | null;
  const version = data?.['dist-tags']?.latest;
  return version && SEMVER.test(version) ? version : target.fallbackVersion;
}

export async function latestReleaseTag(project: Project): Promise<string | null> {
  if (!project.releases) return null;
  const data = (await getJson(`https://api.github.com/repos/${project.owner}/${project.repo}/releases/latest`)) as { tag_name?: string } | null;
  const tag = data?.tag_name;
  return tag && SEMVER.test(tag) ? tag : project.releases.fallbackTag;
}

export type ResolvedProject = Project & { versions: string[]; releaseTag: string | null };

export async function resolveProjects(projects: Project[]): Promise<ResolvedProject[]> {
  return Promise.all(
    projects.map(async (project) => ({
      ...project,
      versions: await Promise.all(project.installs.map(registryVersion)),
      releaseTag: await latestReleaseTag(project),
    })),
  );
}
