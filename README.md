# pnpm-wks-linking-issue

> pnpm version 5.15.1

- There is wks package `pkg` which has two deps
  - `@cycle/react` which has `xstream` in `peerDependencies`
  - `xstream` (peer for `@cycle/react`)

- There is wks package xstream what should be linked instead of npm dependency in pkg

- test.js - that first resolves `@cycle/react` in `pkg` and then tries to resolve `xstream` in its .pnpm location, which it should because `xstream` is peer of `@cycle/react`.


## To see that it works without workspace linking:

Check `xstream` is commented in `pnpm-workspace.yaml`:

```yaml
packages:
  - 'pkg'
  # - 'xstream'  
```

Run clean test (first it will remove all node_modules and lockfile and make fresh install):
```
pnpm clean-test 
```

```
Resolving xstream from:
 ...\node_modules\.pnpm\@cycle\react@2.9.0_xstream@11.14.0\node_modules\@cycle\react\lib\cjs

Resolved ok:
 ...\node_modules\.pnpm\xstream@11.14.0\node_modules\xstream\index.js
```

## To get resolve/linkage failure:

Check `xstream` is not commented in `pnpm-workspace.yaml`:

```yaml
packages:
  - 'pkg'
  - 'xstream'  
```

Run clean test:
```
pnpm clean-test
```

Get the output:
```
Resolving xstream from:
 ...\node_modules\.pnpm\@cycle\react@2.9.0\node_modules\@cycle\react\lib\cjs

Could not resolve!
```

### NB about link-workspace-packages
First it looked like issue relates to `link-workspace-packages=deep` set, but turns out that it is not.