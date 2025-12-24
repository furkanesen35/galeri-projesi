# Anforderungen & Abnahmekriterien

## Übersicht
1. Infrastruktur
2. Login & Authentifizierung
3. Fahrzeugverwaltung
4. Aufgabenverwaltung
5. Kundenverwaltung (CRM)
6. Dokumentenmanagement
7. Bankmanagement
8. Admin-Management
9. Kundenprofil (nach MVP)

## Epic Details

| Epic | Einschätzung | Objectives (Ziele) | Definition of Done (DoD) & Tech Stack |
| :--- | :--- | :--- | :--- |
| **Infrastruktur** | 20 PT | Sicherer, stabiler & skalierbarer Betrieb (Dev, Stage, Prod).<br>Monitoring, Logging, Alerting.<br>Backup & DR.<br>Security & Compliance. | **Engin:**<br>• Hosting: AWS Cloud (ECS/RDS/S3/CloudFront)<br>• Architekturentwurf<br>• IaC & CI/CD Pipelines aktiv<br>• Security Scans durchgeführt<br>• Kostenkontrolle & Alerts aktiv |
| **Login & Authentifizierung** | 5 PT | Sicherer Zugang für alle Rollen.<br>Einheitliches IAM.<br>2FA.<br>DSGVO-konform. | **Engin:**<br>• JWT, Rollen, Login/Logout<br>• Login UI & Admin UI<br>• SSO & MFA aktiv<br>• Audit-Logs vorhanden<br>• Tests erfolgreich |
| **Fahrzeugverwaltung** | 45 PT | Verwaltung aller Fahrzeuge (Lifecycle).<br>Schnelle Erfassung (VIN-Import).<br>Digitale Workflows (Verträge, Rechnungen). | **Engin:**<br>• CRUD, Status, Bilder (S3), DAT-Import<br>• Börsen-Integration<br>• Dokumentenmanagement (Angebot, E-Rechnung, Vertrag)<br>• DocuSign-Integration<br>• Speicherung in S3 |
| **Aufgabenverwaltung** | 5 PT | Strukturierte Aufgabenverwaltung.<br>Checklisten.<br>Transparenz. | **Engin:**<br>• CRUD Aufgaben inkl. UI<br>• Checklisten verknüpfbar<br>• (Werkstattplanung extra 10 PT)<br>• Tests erfolgreich |
| **Kundenverwaltung (CRM)** | 5 PT | Zentrale Kundenverwaltung.<br>Fahrzeug-Zuordnung.<br>Historie & Aktivitäten. | **Engin:**<br>• CRUD Kunden inkl. UI<br>• Fahrzeugverknüpfung<br>• Historie sichtbar<br>• DSGVO-konform |
| **Dokumentenmanagement** | 5 PT | Zentrale Verwaltung (Verträge, Rechnungen).<br>Filter & Suche.<br>DMS-Konformität. | **Engin:**<br>• Doku UI<br>• Listen mit Filter<br>• Export & Vorschau aktiv<br>• Audit-Logs |
| **Bankmanagement** | 7,5 PT | Übersicht über Zahlungen.<br>Korrekte Zuordnung.<br>Finanztransparenz. | **Engin:**<br>• Kontoauszüge (FinTS/CSV)<br>• Auto-Matching zu Rechnungen<br>• Export (CSV/DATEV) |
| **Admin-Management** | 7,5 PT | Nutzer- & Rechteverwaltung.<br>Bank- & Rechnungsstammdaten.<br>Sichere Administration. | **Engin:**<br>• Benutzerverwaltung, Rechte<br>• System- & Mail-Settings<br>• MFA für Admins |
| **Kundenprofil (nach MVP)** | - | Kunden pflegen eigene Daten.<br>Digitale Signaturen.<br>Kundenportal. | • Profilpflege validiert<br>• Kundenportal aktiv<br>• Änderungen protokolliert |