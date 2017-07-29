Ethereum Blockies PNG
=====================

[![npm version](https://badge.fury.io/js/ethereum-blockies-png.svg)](https://www.npmjs.com/package/ethereum-blockies-png)
[![Downloads](https://img.shields.io/npm/dm/ethereum-blockies-png.svg)](https://www.npmjs.com/package/ethereum-blockies-png)

A tiny library for generating Ethereum-variant of blocky identicons, in PNG format.

![Sample blockies image](sample.png "Blockies")

Use
---

```javascript
const blockies = require('ethereum-blockies-png')
const fs = require('fs')

// Generate a PNG binary
const buffer = blockies.createBuffer({ // All options are optional
  seed: '0x00d1f07af5501156a3dc81ed93f9eebd81d3e472', // ethereum address
  scale: 4  // width/height of each block in pixels, default: 4
})
fs.writeFileSync('out.png', b)

// or generate a Data URL:
const dataURL = blockies.createDataURL({ seed: '0x00d1f07af5501156a3dc81ed93f9eebd81d3e472' })
// => "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgC..."
```

License
-------

[WTFPL](http://www.wtfpl.net/)
