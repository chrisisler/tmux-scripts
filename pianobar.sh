#!/usr/bin/env bash

set -eu

getPandoraInfo() {
  local state="$(cat ~/.config/pianobar/custom-out | tr "\r" "\n")"

  local playing="$(printf "$state" | grep "|>" | tail -1 | sed -e "s/^.*\|>//" | tr "'" " " | xargs)"
  local song="$(printf "$playing" | sed -e "s/ by.*$//")"
  local artist="$(printf "$playing" | sed -e "s/ on.*$//" | sed -e "s/^.*by //")"

  local position="$(printf "$state" | grep "#" | tail -1 | sed -e "s/^.*-//")"

  local output="$song - $artist $position"
  # local output="$song - $artist"

  printf "$output"
}


main() {
  # Exit if Pianobar isn't running.
  ps xc | grep -qi "pianobar" || exit -1

  getPandoraInfo
}

main
