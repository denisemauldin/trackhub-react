#!/usr/bin/env bash

if [[ -e "$PWD/dist" ]]; then
 rm -rf "$PWD/dist"
fi

if [[ -e "$PWD/node_modules" ]]; then
 rm -rf "$PWD/node_modules"
fi
