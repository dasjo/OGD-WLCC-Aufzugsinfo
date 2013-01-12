# OGD WLCC Aufzugsinfo

Node.js basiertes Mashup der OGD Wien Aufzugsdaten mit Aufzugausfällen der Wiener Linien zum CreateCamp Wiener Linien/open3.at 2013.

## Motivation

Aktuell gibt es zwei verschiedene Quellen hinsichtlich Aufzugsinfos: statische Basisdaten von OGD Wien und aktuelle Aufzugsausfälle der Wiener Linien. Zusätzlich erschwert wird der Zugriff dadurch, dass beide Datenquellen unterschiedliche IDs verwenden, ein zusätzliches CSV-File dient derzeit dem Matching und erhöht die Zahl der Datenquellen somit auf 3. 

1. Die OGD Wien Aufzugsdaten stellen die Basis der statischen Stammdaten im GeoJSON format dar.
2. Die Aufzugausfälle der Wiener Linien bieten aktuelle Information.
3. Das CSV-File ermöglicht das Matching der beiden Quellen.

## Lösungsansatz

Ein zentrales GeoJSON Feed soll die derzeit verteilte Information einheitlich bereit stellen und somit visualisierenden Clients das Matching der Datensätze ersparen.

## Umsetzung

Als Experiment wurde ein node.js server umgesetzt, der die Quellen dynamisch abfrägt, verarbeitet und als kombiniertes GeoJSON Feed bereit stellt. 

Beispielausgabe: 

https://raw.github.com/dasjo/OGD-WLCC-Aufzugsinfo/master/example.json

## Developer Info
Install node.js, run 'node server.js' and fix all missing dependencies using 'npm'.

TODO: 

* Integrate dynamic update routine for data providers.

## References

CreateCamp Wiener Linien/open3.at 2013
http://www.barcamp.at/Wienerlinien_createcamp2013

Aufzüge in Stationen (OGD Wien)
http://data.wien.gv.at/katalog/aufzuege.html