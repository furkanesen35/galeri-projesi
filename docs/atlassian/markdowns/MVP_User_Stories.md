# MVP: User Stories

**Hinweis:** Der Erstellen-Knopf soll zentral in der Top-Navigation konzipiert werden, als ein Knopf für alle Erstellungsfunktionen.

## 1. Infrastruktur und Projektverwaltung

| Persona | User Story | Acceptance Criteria | Erklärung / Details |
| :--- | :--- | :--- | :--- |
| **Infrastruktur / DevOps** | Umgebungen (Dev, Staging, Prod) bereitstellen und versioniert verwalten. | • IaC (z. B. Terraform/CloudFormation) im Repo vorhanden.<br>• Dev/Stage/Prod sind automatisiert provisionierbar.<br>• Umgebungsparameter über Versionsverwaltung konfigurierbar.<br>• Zugangsbeschränkungen pro Umgebung vorhanden. | Basis für reproduzierbare Deployments und klare Trennung der Umgebungen. |
| **Entwickler / DevOps** | CI/CD-Pipelines für Builds, Tests und Deployments implementieren. | • Pipeline baut Artefakte, führt Unit- & Integrationstests aus und deployed automatisch nach Stage/Prod.<br>• Rollback-Mechanismus vorhanden.<br>• Pipeline-Lauf dokumentiert und auditiert. | Verkürzt Time2Market und reduziert menschliche Fehler. |
| **DevOps** | Deployments automatisieren (Blue/Green oder Rolling) inklusive Rollback. | • Deployments erfolgen ohne Downtime (oder mit definiertem Wartungsfenster).<br>• Automatischer Health-Check nach Deployment; bei Fehlern Rollback. | Erhöht Verfügbarkeit und reduziert Risiko bei Releases. |
| **Infrastruktur** | Infrastruktur pflegen und versionieren. | • Alle Cloud-Ressourcen sind als Code definiert.<br>• PR-Review für Änderungen.<br>• Änderungen sind rückrollbar. | Ermöglicht Nachvollziehbarkeit und Auditierbarkeit. |
| **Betriebsverantwortlicher** | Monitoring & Alerting einrichten. | • Basis-Metriken (CPU, RAM, Latency, Error-Rate) instrumentiert.<br>• Dashboards und Alerts mit Playbooks vorhanden. | Früherkennung von Problemen. |
| **Betriebsverantwortlicher** | Zentrales Logging und Search (z. B. ELK / Loki) bereitstellen. | • Log-Aggregation aktiv; Logs durchsuchbar.<br>• Log-Retention & Zugriffskontrolle definiert. | Erleichtert Debugging und forensische Analysen. |
| **Admin / Betriebsverantwortlicher** | Backups & Restore-Prozeduren implementieren und regelmäßig testen. | • Automatisierte Backups für DB & Dateispeicher.<br>• Restore-Test mind. 1x pro Quartal erfolgreich. | Garantiert Datenverfügbarkeit. |
| **Security** | Secrets Management & Zertifikate sicher verwalten. | • Zentraler Secrets-Store (z. B. Vault) verpflichtend.<br>• TLS/SSL-Zertifikate automatisch verwaltet. | Verhindert Leaks sensibler Daten. |
| **Security / Infrastruktur** | Security Hardening und Vulnerability Scans durchführen. | • Härtungsleitfaden implementiert.<br>• Automatisierte Scans (SCA/Container/Vuln) laufen; kritische Findings innerhalb SLA behandelt. | Schutz gegen bekannte Schwachstellen. |
| **DevOps / Architektur** | Skalierbarkeit & Auto-Scaling einrichten (Elastizität). | • Auto-Scaling-Richtlinien definiert und getestet.<br>• Lasttests zeigen akzeptables Verhalten. | Sicherstellung der Performance bei Lastspitzen. |
| **Netzwerk / Infrastruktur** | Netzwerkarchitektur (VPC, Subnets, Firewall, VPN) definieren und absichern. | • Netzwerksegmente nach Risiko getrennt.<br>• Firewall-Regeln dokumentiert und minimal.<br>• VPN/Private-Link für interne Dienste. | Minimiert Angriffsfläche. |
| **Entwickler / API-Owner** | API-Gateway & Rate-Limiting einrichten für öffentliche APIs. | • API-Gateway (Auth, Throttling, Routing) eingerichtet.<br>• Rate-Limiting pro Client/Tenant konfigurierbar. | Schützt Services vor Missbrauch. |
| **Admin / Security** | SSO / Identity Management integrieren (OAuth2 / SAML). | • SSO funktioniert mit mind. einem IdP.<br>• Rollen/Gruppen über IdP synchronisiert.<br>• MFA für Admins verpflichtend. | Einheitliches Identitätsmanagement. |
| **Compliance / Legal** | DSGVO/GDPR-Anforderungen implementieren. | • Retention-Policy dokumentiert.<br>• Lösch- und Anonymisierungsprozesse implementiert.<br>• Verarbeitungsverzeichnis geführt. | Erfüllt rechtliche Anforderungen. |
| **Betriebsverantwortlicher** | Disaster Recovery Plan (RTO, RPO) erstellen und Recovery testen. | • DR-Plan dokumentiert.<br>• Failover-Test erfolgreich durchgeführt. | Gewährleistet Wiederherstellbarkeit. |
| **Finance / Admin** | Kostenüberwachung & Budget-Alerts konfigurieren. | • Kosten-Dashboards und Tagging implementiert.<br>• Budget-Alerts aktiv. | Kostentransparenz. |
| **Tester / Performance** | Performance- und Lasttests durchführen und Baselines definieren. | • Lasttests durchgeführt.<br>• Performance-Baseline dokumentiert.<br>• SLAs definiert. | Absicherung gegen Performance-Regressionen. |

## 2. Login & Authentifizierung

| Persona | User Story | Acceptance Criteria | Erklärung / Details |
| :--- | :--- | :--- | :--- |
| **Nutzer (alle)** | Als Benutzer möchte ich mich mit Benutzername/E-Mail und Passwort einloggen. | • Login-Formular mit Pflichtfeldern.<br>• Eingaben validiert.<br>• Erfolgreiches Login führt in personalisierten Bereich. | Basisfunktion für jede Rolle. |
| **Admin, Vertrieb, Kunde** | Lockout nach mehreren fehlgeschlagenen Login-Versuchen. | • Lockout nach X Fehlversuchen.<br>• Entsperrung (Zeit oder Admin) möglich. | Brute-Force-Schutz. |
| **Nutzer (alle)** | Als Nutzer möchte ich mein Passwort zurücksetzen können. | • Reset via E-Mail mit Token.<br>• Neues Passwort muss Policy erfüllen. | Erhöht Benutzerfreundlichkeit. |
| **Admin** | MFA für sensible Rollen (Finanz, Admin) erzwingen. | • MFA verpflichtend für definierte Rollen.<br>• Audit-Log dokumentiert MFA-Status. | Schutz vor Account-Übernahmen. |
| **Nutzer (alle)** | Single Sign-On (SSO) nutzen (Firmen- oder Social-Accounts). | • Login via IdP (OAuth2, OIDC, SAML).<br>• Rollen werden korrekt übernommen. | Einheitliches IAM und Komfort. |
| **Security / Admin** | Logging aller Logins zur Nachvollziehbarkeit. | • Login/Logout mit Zeit, Nutzer, IP gespeichert.<br>• Verdächtige Versuche markiert. | Grundlage für Audits. |
| **Nutzer (alle)** | Automatischer Logout bei Inaktivität (Session-Timeout). | • Timeout nach definierter Dauer.<br>• Erneutes Login notwendig. | Schutz vor unbefugtem Zugriff. |
| **Kunde** | Datenschutzeinwilligung beim ersten Login bestätigen. | • Einwilligungs-Dialog beim ersten Login (Zwang).<br>• Speicherung mit Zeitstempel.<br>• Widerrufsmöglichkeit. | Erfüllt DSGVO-Anforderungen. |

## 3. Fahrzeugverwaltung

| Persona | User Story | Acceptance Criteria | Erklärung / Details |
| :--- | :--- | :--- | :--- |
| **Vertriebler** | Fahrzeug manuell anlegen. | • Formular mit Pflichtfeldern (Marke, Modell, VIN, KM, Preis).<br>• Validierung.<br>• Eindeutige Fahrzeug-ID. | Basisfunktion. |
| **Vertriebler** | Fahrzeug per VIN über DAT importieren. | • Eingabe der VIN.<br>• System ruft DAT-Schnittstelle auf und ergänzt Daten. | Spart Zeit, verhindert Tippfehler. |
| **Vertriebler** | Bilder zu einem Fahrzeug hochladen. | • Mehrfach-Upload (jpg, png, webp).<br>• Limit (z. B. 20 Bilder).<br>• Sortierbar. | Wichtig für Vermarktung. |
| **Vertriebler** | Fahrzeug auf externe Börsen exportieren (Mobile.de, Autoscout24). | • Auswahl der Börsen über UI.<br>• Datenkonvertierung und Übertragung.<br>• Statusanzeige. | Kernfunktion für den Verkauf. |
| **Vertriebler** | Status eines Fahrzeugs verfolgen. | • Statusfelder (angelegt, in Export, online, verkauft).<br>• Historie mit Zeitstempel. | Transparenz über Lebenszyklus. |
| **Vertriebler** | Fahrzeuge auflisten und filtern. | • Such- und Filteroptionen.<br>• Liste oder Grid.<br>• Export (CSV/PDF). | Macht das System im Alltag benutzbar. |
| **Vertriebler** | Kosten für ein Fahrzeug anlegen. | • Eingabeformular für Kostenarten.<br>• Beleg-Upload.<br>• Summenberechnung. | Wichtig für Margenkalkulation. |
| **Vertriebler** | Verträge zu einem Fahrzeug hochladen. | • Uploadfunktion (PDF/DOCX).<br>• Metadaten (Typ, Datum). | Digitales DMS. |
| **Vertriebler** | Digitale Verträge im System erstellen (aus Vorlagen). | • Vertragsvorlagen verfügbar.<br>• Auto-Befüllung mit Fahrzeug-/Kundendaten.<br>• PDF-Generierung. | Spart Zeit und sorgt für Einheitlichkeit. |
| **Vertriebler** | Verträge unterschreiben lassen (Tablet/Pad). | • Signaturfeld eingebettet.<br>• Unterschrift rechtsgültig digital gespeichert.<br>• Audit-Log. | Rechtssicherheit & moderne CX. |
| **Vertriebler** | Elektronische Rechnung für ein Fahrzeug erstellen. | • Steuer- & Pflichtfelder nach GoBD/UStG.<br>• (Optional) DATEV-Schnittstelle.<br>• Export als PDF. | Korrekte Verkaufsabwicklung. |
| **Vertriebler** | Angebote anlegen und Fahrzeugen zuordnen. | • Formular für Angebotsdaten.<br>• Verknüpfung mit Fahrzeug.<br>• Generierung als PDF. | Erleichtert Vertriebsprozesse. |

## 4. Aufgabenverwaltung

| Persona | User Story | Acceptance Criteria | Erklärung / Details |
| :--- | :--- | :--- | :--- |
| **Vertriebler** | Aufgabe anlegen. | • Formular mit Pflichtfeldern (Titel, Beschreibung, Fälligkeit, Assignee). | Task-Management. |
| **Vertriebler** | Checkliste anlegen. | • Checkliste benennen, Einträge definieren.<br>• Reihenfolge änderbar. | Standardisierung von Abläufen. |
| **Vertriebler** | Checkliste mit Aufgaben verknüpfen. | • Verknüpfung Checkliste <-> Aufgabe.<br>• Unteraufgaben abhakbar. | Effizienz bei Routineprozessen. |

## 5. Kundenverwaltung (CRM)

| Persona | User Story | Acceptance Criteria | Erklärung / Details |
| :--- | :--- | :--- | :--- |
| **Vertriebler** | Kunde manuell anlegen. | • Formular (Name, Adresse, Tel, E-Mail).<br>• Validierung.<br>• Eindeutige ID. | Basisfunktion. |
| **Vertriebler** | Kunden auflisten und filtern. | • Filter (Name, Nr, Fahrzeug, Status).<br>• Export. | Suche und Reporting. |
| **Vertriebler** | Fahrzeuge Kunden zuordnen. | • Auswahl Fahrzeuge.<br>• Anzeige im Profil. | 360°-Sicht auf Kunde. |
| **Vertriebler** | Kundenhistorie anzeigen. | • Timeline mit Vorgängen. | Nachvollziehbarkeit. |

## 6. Dokumentenmanagement

| Persona | User Story | Acceptance Criteria | Erklärung / Details |
| :--- | :--- | :--- | :--- |
| **Admin / Vertriebler** | Verträge auflisten und filtern. | • Filter (Kunde, Fahrzeug, Typ, Datum). | Schnelle Suche. |
| **Admin / Vertriebler** | Rechnungen auflisten und filtern. | • Filter (Rechnungsnr, Kunde, Zeitraum).<br>• Export (DATEV-kompatibel). | Buchhaltung & Compliance. |
| **Admin / Vertriebler** | Angebote auflisten und filtern. | • Filter (Kunde, Fahrzeug, Status). | Transparenz im Vertrieb. |

## 7. Bankmanagement

| Persona | User Story | Acceptance Criteria | Erklärung / Details |
| :--- | :--- | :--- | :--- |
| **Admin** | Übersicht aller Banküberweisungen anzeigen. | • Filter (Zeitraum, Betrag, Gegenkonto).<br>• Detailansicht. | Transparenz über Finanzflüsse. |
| **Admin** | Banküberweisungen zu Rechnung/Fahrzeug zuordnen. | • Automatisches Matching.<br>• Manuelle Zuordnung möglich. | Korrekte Buchhaltung. |

## 8. Admin-Management

| Persona | User Story | Acceptance Criteria | Erklärung / Details |
| :--- | :--- | :--- | :--- |
| **Admin** | Benutzer anlegen und löschen. | • Formular (Name, E-Mail, Rolle).<br>• Einladung per E-Mail.<br>• Audit-Log. | Sicherheit und Ordnung. |
| **Admin** | Rechte verwalten (Rollenmodell). | • Anpassbare Rechte.<br>• Änderungen greifen sofort. | Datenschutz & Compliance. |
| **Admin** | Bankdaten managen (Stammdaten). | • IBAN, BIC, Inhaber.<br>• Validierung. | Für Zahlungsverkehr. |
| **Admin** | Rechnungsdaten managen (Nummernkreise, Layout). | • Anpassung Pflichtfelder, Logo.<br>• Nummernkreise verwalten. | Steuerkonforme Rechnungen. |

## 9. Kundenprofil (nach MVP)

| Persona | User Story | Acceptance Criteria | Erklärung / Details |
| :--- | :--- | :--- | :--- |
| **Kunde** | Basisinformationen im Profil pflegen. | • Formular, Validierung. | Self-Service. |
| **Kunde** | Digitale Unterschrift hochladen. | • Upload oder direkte Eingabe.<br>• Einsetzbar in Verträgen. | Grundlage für digitale Abschlüsse. |
| **Kunde** | Profilbild hochladen. | • Upload, Crop, Speicherung. | UX. |
| **Kunde** | Fahrzeuge mit Profil verknüpfen. | • Auswahl per VIN oder Suche. | Transparenz für Kunden. |
| **Kunde** | Kundenportal nutzen. | • Login, Vorgänge sichtbar (Rechnungen, Angebote). | Kundenbindung. |