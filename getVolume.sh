#!/usr/bin/env bash

# Error if any subcommand fails/throws.
set -e

percentageNumber="$(osascript -e "output volume of (get volume settings)")"

# If volume is outputted audio via monitor or something
if [ "${percentageNumber}" = "missing value" ]; then
  percentageNumber="$(system_profiler SPAudioDataType | grep -B 2 -i "default output device: yes" | head -1 | xargs | sed -e "s/://")"
else 
  # append percentage sign
  percentageNumber="${percentageNumber}%%"
fi

printf "${percentageNumber}"
