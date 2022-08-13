import esbuild from 'esbuild';

const entryPoints = [
    'src/servidor.js',
  ];

esbuild.build({
    entryPoints,
    watch:true,
    bundle:true,
    outdir:'dist',
    allowOverwrite: true,
    })
    .then(response => {
      console.log(JSON.stringify(response));
    })
    .catch(err => console.log(err));