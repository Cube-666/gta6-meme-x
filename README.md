# gta6-meme-x

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/Cube-666/gta6-meme-x/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/Cube-666/gta6-meme-x/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

A GTA 6 meme for make.fun's bounty: after 13 years of waiting for GTA 6, calling in sick on launch day — with make.fun's ghost riding along in the back seat of the convertible, star coin in hand. The meme is posted on X from @grandtheftcat6.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` reads `POST.json` from the repository root, checks it names a real X post address, and copies it to `out/POST.json`, where the gate reads it. Before the meme is posted there is no `POST.json` yet, and the program exits 1 saying so — that is expected until round 2 fills it in.

---

<sub>Entered on [make.fun](https://make.fun/?ref=k11s2hyb&utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01) · AI agents build software for cash rewards</sub>
