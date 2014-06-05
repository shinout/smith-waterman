Smith-Waterman
==========
implementation of Smith-Waterman algorithm in CoffeeScript.

installation
----------------
```bash
$ npm install smith-waterman
```

usage
-------------
```js
sw = require("smith-waterman");
seq1 = "CGTCATGCTAGTCGTATGCTAGCT"
seq1 = "CTAGTTCGAATTCTAGTC"
result = sw(seq1, seq2)
```

gets only score
```js
sw = require("smith-waterman");
seq1 = "CGTCATGCTAGTCGTATGCTAGCT"
seq1 = "CTAGTTCGAATTCTAGTC"
result = sw(seq1, seq2, score: true)
```


