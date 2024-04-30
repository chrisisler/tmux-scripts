#!/usr/bin/env bash

set -eu

# printf " ⑇${qualityPercentage}"
# ⋅⋮○●
# printf " ${networkName} ${qualityPercentage}▽"

wifi() {
  local wifiConfig="$(ifconfig -uv en0)"
  local qualityPercentage="$(printf "$wifiConfig" | grep "link quality" | sed -e "s/^.*://" | awk '{ print $1 }' | tr -d ' ')"

  # local cwd="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  local networkWifiInfo="$(/System/Library/PrivateFrameworks/Apple80211.framework/Versions/A/Resources/airport -I)"
  local networkName="$(printf "$networkWifiInfo" | grep -E "\bSSID\b" | awk '{ print $2 }')"
  local networkSpeed="$(printf "$networkWifiInfo" | grep -i "lastTxRate" | awk '{ print $2 }' | sed -e "s/$/mbps/")"

  # if [[ "$qualityPercentage" -eq "100" ]]; then
  #   # exit if networkName does not exist
  #   if [[ -z "$networkName" ]]; then
  #     exit 0
  #   fi
  #   printf "[$networkName]"
  #   # printf "[$networkName::$networkSpeed]"
  # else
    # printf "[$networkName|$qualityPercentage|$networkSpeed]"
  # fi
  # printf "$networkSpeed $qualityPercentage%%"
  printf "$networkSpeed"
}

main() {
  # wifi
  # write to save file with prepended thing
  # write to stdout with non-prepended
  local timestamp="$(date +%s)"
  local output="$(wifi)"
  echo "$output" | sed "s/^/${timestamp} /" >> ~/.tmux/Status/network.sh.output.txt
  echo "$output"
}
main
