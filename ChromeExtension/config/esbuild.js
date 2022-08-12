import esbuild from 'esbuild';
import 'dotenv/config';  //requiere npm install dotenv para acceder  a las variables de entorno

const entryPoints = [
    'src/sw.js',
    'src/scripts/scrapper.js',
    'src/scripts/pop.js',
    'src/scripts/scrapCandidates.js'
  ];

const {DEPLOYMENT} =process.env;

//console.log(DEPLOYMENT);

esbuild.build({
    entryPoints,
    watch:DEPLOYMENT==='DEV',
    bundle:true,
    outdir:'dist',
    minify: !(DEPLOYMENT==='DEV'),
    allowOverwrite: true,
    })
    .then(response => console.log(JSON.stringify(response)))
    .catch(err => console.log(err));