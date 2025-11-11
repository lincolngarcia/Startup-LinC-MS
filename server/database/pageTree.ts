/**
 * Utility to build a nested tree from page paths (keys of PageDB).
 *
 * Example input keys: ["/home/about", "/home", "/other/new/page"]
 * Produces:
 * {
 *   home: { children: { about: { children: {}, isEndpoint: true, path: '/home/about' } }, isEndpoint: true, path: '/home' },
 *   other: { children: { new: { children: { page: { children: {}, isEndpoint: true, path: '/other/new/page' } } } } }
 * }
 */

export type PathNode = {
  // segment name (e.g. 'home', 'about')
  name: string;
  // original full path for nodes that correspond to an endpoint
  path?: string;
  // whether this node corresponds to an exact path in the PageDB keys
  isEndpoint?: boolean;
  // children keyed by segment name
  children: Record<string, PathNode>;
};

/**
 * Build a nested path tree from an array of path strings or from the keys of a PageDB-like object.
 * Leading and trailing slashes are ignored; root path `/` will be represented by the special key `"/"`.
 *
 * @param pathsOrObj - either an array of path strings or an object whose keys are paths
 */
export function buildPathTree(pathsOrObj: string[] | Record<string, any>): Record<string, PathNode> {
  const paths: string[] = Array.isArray(pathsOrObj) ? pathsOrObj : Object.keys(pathsOrObj);

  const root: Record<string, PathNode> = {};

  for (const rawPath of paths) {
    // normalize: keep `/` as special case
    if (rawPath === "/") {
      // create a root entry under the key "/" to represent the homepage
      root['/'] = root['/'] || { name: '/', children: {}, isEndpoint: true, path: '/' };
      root['/'].isEndpoint = true;
      root['/'].path = '/';
      continue;
    }

    // split into segments, remove empty strings
    const segments = rawPath.split('/').filter(Boolean);
    if (segments.length === 0) continue;

    let cursor = root;
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      if (!cursor[seg]) {
        cursor[seg] = { name: seg, children: {} } as PathNode;
      }

      // if last segment, mark endpoint and store full path
      if (i === segments.length - 1) {
        cursor[seg].isEndpoint = true;
        cursor[seg].path = rawPath;
      }

      // descend
      cursor = cursor[seg].children;
    }
  }

  return root;
}

export default buildPathTree;

// Example (uncomment to run quick test in Node):
// const example = ["/home/about", "/home", "/other/new/page", "/"];
// console.log(JSON.stringify(buildPathTree(example), null, 2));
