var fs = require('fs');

const datafiles = [
  'packages/bradom-docfrag/data.js',
  'packages/bradom-innerhtml/data.js',
  'packages/bradom-react/src/data.js',
  'packages/bradom-vdom/src/data.js',
];

const writeStreams = datafiles.map(filepath => 
    fs.createWriteStream(filepath));

// to alpha
const toa = (n) => String.fromCharCode(65 + n);

const letters = 3;

writeStreams.forEach(stream => {
  stream.write('export default [');
})

// 3**9 = 19683
for (let i = 0; i < letters; i++)
  for (let j = 0; j < letters; j++)
    for (let k = 0; k < letters; k++)
      for (let l = 0; l < letters; l++)
        for (let m = 0; m < letters; m++)
          for (let n = 0; n < letters; n++)
            for (let o = 0; o < letters; o++)
              for (let p = 0; p < letters; p++)
                for (let q = 0; q < letters; q++) {
                  writeStreams.forEach(stream => {
                    stream.write(
                      `"${toa(i)}${toa(j)}${toa(k)}${toa(l)}${toa(m)}${toa(n)}${toa(o)}${toa(p)}${toa(q)}"`
                    )
                    if (i+j+k+l+m+n+o+p+q !== 9*letters) {
                      stream.write(', ');
                    }
                  });                  
                }


writeStreams.forEach(stream => {
  stream.write('];');
})


