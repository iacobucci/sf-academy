import path from 'path';
import fs from 'fs';

import React from 'react';
import { renderToString } from 'react-dom/server';

import express from 'express';
import { Request, Response } from 'express';

import App from '../App'

const PORT = process.env.PORT || 3006;
const app = express();

app.get('/', (req: Request, res: Response) => {

  const app = renderToString(React.createElement(App));
  const indexFile = path.resolve('../../build/index.html');

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });

});

app.use(express.static('./build'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
