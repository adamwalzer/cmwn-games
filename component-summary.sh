#!/usr/local/bin/bash
declare -A games
components="Where are components used?"$'\n\n'
for file in ./library/shared/components/**/*.js;
do
  component=$(echo ${file:28} | sed 's/\.js//g')
  components=$components$component
  files=$(grep -oR "$component" library/**/components/*.js)
  files=$(echo $files | sed 's/library\///g' | sed 's/\/components\/[^ ]*//g')
  files=$(echo $files | xargs -n1 | sort -u)
  for game in $files;
  do
    games[$game]="${games[$game]} $component"
  done
  components=$components$'\n'$files$'\n\n'
done
components=$components$'\n\n'

components=$components"What components are games using?"$'\n\n'
for game in ./library/**/index.js;
do
  game=$(echo $game | sed 's/\.\/library\///g' | sed 's/\/index\.js//g')
  if [[ $game != 'game' ]]; then
    components=$components$game$'\n'$(echo ${games[$game]} | xargs -n1 | sort -u)$'\n\n'
  fi
done
echo "$components" >> build/component-summary.txt
