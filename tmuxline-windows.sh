#!/usr/bin/env bash

set -eu

main() {
  local out="$(tmux list-windows)"

  # Exit early if only one window
  # local windows="$(printf "$out\n" | wc -l | xargs)"
  # [ "$windows" == "1" ] && exit 0 

  local result="$(printf "$out" | awk '{ print $1, $2 }' | tr '\n' ' ' | sed -e "s/\([0-9]*\): /[\1]x /g")"
  # local result="$(printf "$out" | awk '{ print $2 }' | tr '\n' ' ' | sed -e "s/ $//g")"
  echo "${result}"
}

main
