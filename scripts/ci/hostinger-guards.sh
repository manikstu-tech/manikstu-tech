#!/usr/bin/env bash
# Checks for the things that broke the first deploy to Hostinger (7 Nov 2026). Each one built fine on a laptop and failed, or
# served a broken page, only on the live server. DEPLOYMENT.md, "Hostinger: what it does differently", explains each.
set -uo pipefail
cd "$(dirname "$0")/../.."
failed=0
fail() { echo "::error::$1"; failed=1; }

# 1. Hostinger clones without Git LFS: an LFS file reaches the server as a 132-byte text pointer, not the image
if git ls-files -z | xargs -0 grep -l --binary-files=text -m1 "^version https://git-lfs.github.com/spec/v1" 2>/dev/null | grep -q .; then
  fail "Git LFS pointer files are committed. Hostinger cannot fetch LFS objects; commit the files themselves."
fi
if [ -f .gitattributes ] && grep -q "filter=lfs" .gitattributes; then
  fail ".gitattributes sends files to Git LFS. Hostinger cannot fetch LFS objects."
fi

# 2. Hostinger imports the config without a file extension, which only works for next.config.mjs in this "type": "module" package
[ -f next.config.mjs ] || fail "next.config.mjs is missing."
for other in next.config.ts next.config.js next.config.cjs; do
  [ -f "$other" ] && fail "$other exists. Keep the config in next.config.mjs (Hostinger cannot load the others here)."
done

# 3. The server's glibc is too old for Turbopack, so the build must use webpack
node -e 'process.exit(/--webpack/.test(require("./package.json").scripts.build) ? 0 : 1)' ||
  fail 'The build script must be "next build --webpack": Turbopack needs glibc 2.29 and the Hostinger server has 2.28.'

# 4. NODE_ENV=production skips devDependencies during Hostinger's install
node -e '
  const dev = Object.keys(require("./package.json").devDependencies ?? {})
  const needed = ["typescript", "tailwindcss", "@tailwindcss/postcss", "@types/node", "@types/react", "@types/react-dom"]
  const wrong = needed.filter((name) => dev.includes(name))
  if (wrong.length) { console.log(wrong.join(", ")); process.exit(1) }
' || fail "Build packages are in devDependencies, which Hostinger does not install. Move them to dependencies."

# 5. The image optimizer cannot reach its own server behind Hostinger's Passenger
grep -qE "unoptimized:\s*true" next.config.mjs ||
  fail "images.unoptimized must stay true: on Hostinger every /_next/image request fails with 400."

[ "$failed" = 0 ] && echo "Hostinger guards: all passed"
exit "$failed"
