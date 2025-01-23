#!/bin/bash

# Définition des variables
VERSION=$(grep '"version"' src/manifest.json | cut -d'"' -f4)
CHROME_OUTPUT="xdm-chrome-v${VERSION}.zip"
FIREFOX_OUTPUT="xdm-firefox-v${VERSION}.zip"

echo "🎯 Création des packages pour XDM version ${VERSION}"

# Nettoyage des anciens packages
rm -f "${CHROME_OUTPUT}" "${FIREFOX_OUTPUT}"

# Package Chrome
echo "📦 Création du package Chrome..."
cd chrome/src
zip -r "../../${CHROME_OUTPUT}" . -x "*.DS_Store" -x "__MACOSX/*" -x "*.git*"
cd ../..

# Package Firefox
echo "📦 Création du package Firefox..."
cd src
zip -r "../${FIREFOX_OUTPUT}" . -x "*.DS_Store" -x "__MACOSX/*" -x "*.git*"
cd ..

echo "✅ Packages créés avec succès :"
echo "   - ${CHROME_OUTPUT}"
echo "   - ${FIREFOX_OUTPUT}"
echo ""
echo "Ces fichiers sont prêts à être soumis aux stores Chrome et Firefox."
