# OGD WLCC Aufzugsinfo

Node.js basiertes Mashup der OGD Wien Aufzugsdaten mit Aufzugausfällen der Wiener Linien zum CreateCamp Wiener Linien/open3.at 2013.

Beispielausgabe: 

https://raw.github.com/dasjo/OGD-WLCC-Aufzugsinfo/master/example.json

## Developer Info

Install node.js, run 'node server.js' and fix all missing dependencies using 'npm'.

## Features

* server.js provides a '/' route on port '8080' that returns merged data as GeoJSON feed.
* server.js uses async to update data providers in parallel/series:
* timeStatic updates static data (ogd wien & mapping) providers  in parallel every 10min.
* timeLive updates live data (wiener linen) and calculates merged data in series every 2sec.
* the provider folder contains node modules that encapsulate update function for the data sources (mapping.js, ogd_static.js, wl_live.js and merged_data.js).

## TODO

* only process data when changed.
* error handling.

## References

CreateCamp Wiener Linien/open3.at 2013
http://www.barcamp.at/Wienerlinien_createcamp2013

Aufzüge in Stationen (OGD Wien)
http://data.wien.gv.at/katalog/aufzuege.html

## Motivation

Aktuell gibt es zwei verschiedene Quellen hinsichtlich Aufzugsinfos: statische Basisdaten von OGD Wien und aktuelle Aufzugsausfälle der Wiener Linien. Zusätzlich erschwert wird der Zugriff dadurch, dass beide Datenquellen unterschiedliche IDs verwenden, ein zusätzliches CSV-File dient derzeit dem Matching und erhöht die Zahl der Datenquellen somit auf 3. 

1. Die OGD Wien Aufzugsdaten stellen die Basis der statischen Stammdaten im GeoJSON format dar.
2. Die Aufzugausfälle der Wiener Linien bieten aktuelle Information.
3. Das CSV-File ermöglicht das Matching der beiden Quellen.

## Lösungsansatz

Ein zentrales GeoJSON Feed soll die derzeit verteilte Information einheitlich bereit stellen und somit visualisierenden Clients das Matching der Datensätze ersparen.

## Umsetzung

Als Experiment wurde ein node.js server umgesetzt, der die Quellen dynamisch abfrägt, verarbeitet und als kombiniertes GeoJSON Feed bereit stellt. Das originale GeoJSON Feed von OGD Wien wird gegebenenfalls um ein 'status'-Attribut erweitert, welches die Aufzuginfo von den Wiener Linien enthält.   