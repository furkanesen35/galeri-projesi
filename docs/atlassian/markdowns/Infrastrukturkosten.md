# Infrastrukturkosten

Wir planen ein cloudbasiertes Fahrzeugverwaltungssystem für Autohändler. Dabei fallen derzeit Kosten für einige externe Dienste und Schnittstellen an. Die Aufstellung gilt für den aktuellen Stand der Planung.

| Feature | Begründung | Kosten / Monat (Geschätzt) |
| :--- | :--- | :--- |
| **Cloud Hosting (AWS/Azure/GCP)** | Server + Datenbank + Netzwerk | 50-150 € |
| **Bildspeicherung (AWS S3, Azure Blob)** | Speicher + Requests werden berechnet; abhängig vom Volumen. | 5-30 € |
| **E-Mail-Service (AWS SES, SendGrid)** | SES extrem günstig; Free Tier für niedrigen Mailverkehr. | 0-10 € |
| **Digitale Signaturen (DocuSign/AdobeSign)** | Rechtsverbindliche Signaturen | 25-50 € pro Händler |
| **Bank-API (FinAPI, SaltEdge)** | PSD2-Datenzugriff | 50 € |
| **KI-Chat (OpenAI API)** | Preis pro Anfrage; abhängig von Nutzung. | 10-50 € |
| **Autobörsen (mobile.de, autoscout24)** | Inserate & API-Zugriff sind kostenpflichtig | Autohändler müssen ihre Accounts selbst managen |
| **SMS-Versand (Twilio, etc.)** | SMS werden pro Nachricht abgerechnet. | 0-20 € |
| **Summe** | | **140-360 € + Autobörsen** |

**Hinweise:**
* Die Kosten basieren auf den aktuell geplanten Modulen.
* Kostenfreie Komponenten: z. B. Kalender, Keycloak.
* Kostenpflichtige Komponenten: Digitale Signaturen, Bank-APIs, KI, Fahrzeugbörsen.
* Die Gesamtkosten hängen davon ab, ob Dienste zentral finanziert oder an Autohändler weiterberechnet werden.