#!/bin/bash
cd api/
npm install
cd ../view/
npm install
(cd ../view/ && npm run dev) &
(cd ../api/ && npm run dev)
