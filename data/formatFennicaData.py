from rdflib import Graph, RDF, URIRef, Literal
import csv
import json, re, simplejson

g = Graph().parse('yso-skos.ttl', format='turtle')
            
with open('data.csv', newline='', encoding='utf-8') as f:
    reader = csv.reader(f)
    i = 0
    fennica_grouped = {}
    fennica_all = {}
    for row in reader:
        i += 1
        pub_uri = row[1]
        year = row[2]
        match = re.search('\d+', year)
        if match is None:
            continue # no year found, skip
        year = match.group(0)
        year = year[0:4]
        yso_uris = row[3]
        for uri in yso_uris.split(', '):
            group_labels = []
            for s,p,o in g.triples((None, URIRef('http://www.w3.org/2004/02/skos/core#member'), URIRef(uri))):
                if (URIRef(s), RDF.type ,URIRef('http://purl.org/iso25964/skos-thes#ThesaurusArray')) in g:
                    continue
                pref = g.preferredLabel(URIRef(s), 'en')
                if len(pref) > 0:
                    group_labels.append(str(pref[0][1]))
            for group in group_labels:
                if group not in fennica_grouped:
                    fennica_grouped[group] = {}
                pref = g.preferredLabel(URIRef(uri), 'en')
                if len(pref) > 0:
                    pref_str = str(g.preferredLabel(URIRef(uri), 'en')[0][1])
                    ## add to grouped data
                    if year not in fennica_grouped[group]:
                        fennica_grouped[group][year] = {}
                    yearData = fennica_grouped[group][year]
                    labelAmount = yearData[pref_str] + 1 if pref_str in yearData else 1
                    yearData[pref_str] = labelAmount
                    fennica_grouped[group][year] = yearData
                    ## add to all data
                    if year not in fennica_all:
                        fennica_all[year] = {}
                    labelAmount = fennica_all[year][pref_str] + 1 if pref_str in fennica_all[year] else 1
                    fennica_all[year][pref_str] = labelAmount
        if i % 10000 == 0: # to see progress
            print(i)

combined = {"fennica-grouped": fennica_grouped, "fennica-all": fennica_all}
json_str = json.dumps(combined)

with open('all-data-pretty.json', 'w') as outfile:
    outfile.write(simplejson.dumps(simplejson.loads(json_str), indent=2, sort_keys=True))
    outfile.close()