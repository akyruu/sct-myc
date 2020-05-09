#!/bin/bash

DEST_PATH=apps/app/src/assets/themes
INPUT_PATH=apps/app/src/styles/themes/custom/

echo Building custom theme SCSS files.

# Get the files
FILES=$(find $INPUT_PATH -name "*.scss")

for FILE in $FILES
do
  FILENAME=${FILE#$INPUT_PATH}
  BASENAME=${FILENAME%.scss}
  $(npm bin)/node-sass $FILE > $DEST_PATH/$BASENAME.css
done

echo Finished building CSS.
