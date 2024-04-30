## tmux-scripts

![Screenshot](assets/scrot.png)

The status bar can be positioned at bottom or top as per [Tmux documentation](https://github.com/tmux/tmux/wiki/Getting-Started).

Note: Your `~/.tmux.conf` file should include: `source ~/.tmux/tmuxline.conf` 

```
// ~/.tmux/tmuxline.conf

set -g status-left "#[fg=colour3,bg=]"
setw -ga status-left " #(tmux list-windows | awk '{ print $1$2 }' | xargs)"
# setw -ga status-left " #(~/.tmux/Status/tmuxline-windows.sh)"
# set -ga status-left " #(ts-node ~/.tmux/Status/task-timer/index.ts)"
set -ga status-left "  #(tail -1 ~/.tmux/Status/bash-task-timer/timer-out | node ~/.tmux/Status/bash-task-timer/convert.js)"
# set -ga status-left " #{?client_prefix,[PREFIX-PRESSED],}"

setw -g window-status-current-format "#[fg=colour15,bg=]" # REQUIRED. Sets middle string to empty.
setw -g window-status-format ""

set -g status-right ""
# set -g status-right "#[fg=colour15,bg=]"
# set -ga status-right "#{?client_prefix,[PREFIX-PRESSED],} "
# set -ga status-right "#[fg=colour9,bg=]"
set -ga status-right "#(~/.tmux/Status/pianobar.sh || ~/.tmux/Status/cmus.sh)   "
# set -ga status-right "#[fg=colour3,bg=]"
# set -ga status-right "#(~/.tmux/Status/tmuxline-info.sh)  "
# set -ga status-right "#[fg=colour5,bg=]"
# set -ga status-right "#(node ~/.tmux/Status/weather/weather.js)  "
# set -ga status-right "#[fg=colour6,bg=]"
# set -ga status-right "#(~/.tmux/Status/disk.sh) "
# set -ga status-right "#[fg=colour3,bg=]"
set -ga status-right "#(~/.tmux/Status/battery-2.sh)"
# set -ga status-right "#[fg=colour4,bg=]"
# set -ga status-right " #(~/.tmux/Status/getVolume.sh)vol  "
# set -ga status-right "#[fg=colour2,bg=]"
# setw -ga status-right "#(node ~/.tmux/Status/time-now.js)"
setw -ga status-right ""
# set -ga status-right "#(~/.tmux/Status/internet.sh)"
# set -ga status-right "#(~/.tmux/Status/docker.sh)"
# set -ga status-right "#(~/.tmux/Status/network.sh)"
# set -ga status-right "#(~/.tmux/Status/internet.sh)"
```
