# Project Summary: Autohaus-App (Vehicle Management System)

## Executive Overview

**Project Type:** Digital Solution for Automotive Dealerships  
**Timeline:** December 2025 - MVP Completion  
**Budget:** €43,000 (Development) + €140-360/month (Infrastructure)  
**Partners:** Berkan Kelleci (Investor) & Ahmet Kilic (Technical Partner)  
**Ownership:** 50/50 split (to be reviewed post-MVP)

---

## Business Goals

The Autohaus-App aims to modernize and optimize automotive dealership operations and customer interactions through:

1. **Digital Transformation** - Replace paper-based processes with digital workflows
2. **Operational Efficiency** - Streamline vehicle lifecycle management
3. **Customer Experience** - Enable digital contracts, signatures, and self-service portals
4. **Financial Transparency** - Automated invoicing, payment matching, and cost tracking
5. **Market Integration** - Seamless export to vehicle marketplaces (mobile.de, autoscout24)

---

## Core Features (MVP Scope)

### 1. Infrastructure (20 PT)
**Objective:** Secure, stable, and scalable operation across Dev, Stage, and Prod environments

**Key Components:**
- AWS Cloud Hosting (ECS/RDS/S3/CloudFront)
- Infrastructure as Code (IaC) & CI/CD Pipelines
- Monitoring, Logging, and Alerting
- Security Scans & Compliance
- Backup & Disaster Recovery
- Cost Control & Budget Alerts

**Tech Stack:** AWS, Terraform/CloudFormation, ELK/Loki, Vault for Secrets Management

---

### 2. Login & Authentication (5 PT)
**Objective:** Secure access for all user roles with GDPR compliance

**Key Features:**
- JWT-based authentication with role-based access control (RBAC)
- Multi-Factor Authentication (MFA) for admins
- Single Sign-On (SSO) support (OAuth2, OIDC, SAML)
- Password reset functionality
- Account lockout after failed attempts
- Session timeout and auto-logout
- Comprehensive audit logs
- GDPR consent management

---

### 3. Vehicle Management (45 PT) ⭐ Core Feature
**Objective:** Complete vehicle lifecycle management from acquisition to sale

**Key Features:**
- **CRUD Operations:** Create, Read, Update, Delete vehicles
- **VIN Import:** DAT API integration for automatic data population
- **Image Management:** Multi-image upload with S3 storage (sortable, up to 20 images)
- **Marketplace Export:** Integration with mobile.de and autoscout24
- **Status Tracking:** Vehicle lifecycle states (created, exported, online, sold)
- **Cost Management:** Investment tracking and margin calculation
- **Document Management:**
  - Upload contracts and documents (PDF/DOCX)
  - Generate contracts from templates (auto-filled)
  - Create offers and e-invoices (GoBD/UStG compliant)
  - Optional DATEV interface
- **Digital Signatures:** DocuSign integration for legally binding signatures
- **Search & Filter:** Advanced filtering and export (CSV/PDF)

---

### 4. Task Management (5 PT)
**Objective:** Structured task management with checklists for standardized workflows

**Key Features:**
- Create and assign tasks with due dates
- Checklist creation and association
- Task status tracking
- Workshop planning (additional 10 PT - optional)

---

### 5. Customer Management - CRM (5 PT)
**Objective:** Centralized customer database with vehicle associations

**Key Features:**
- Customer CRUD operations
- Vehicle-to-customer associations
- Customer history and activity timeline
- 360° customer view
- Search and filtering
- GDPR-compliant data management
- Export capabilities

---

### 6. Document Management (5 PT)
**Objective:** Centralized document repository with DMS compliance

**Key Features:**
- Document listing with filtering (contracts, invoices, offers)
- Search by customer, vehicle, type, date
- Document preview and export
- Audit logs for compliance
- Version control

---

### 7. Bank Management (7.5 PT)
**Objective:** Financial transparency and automated payment reconciliation

**Key Features:**
- Bank statement import (FinTS API / CSV)
- Automated payment matching to invoices
- Manual assignment capability
- Financial overview with filtering
- Export to DATEV-compatible formats

---

### 8. Admin Management (7.5 PT)
**Objective:** User administration and system configuration

**Key Features:**
- User management (create, edit, delete)
- Role-based permissions management
- Bank account master data management (IBAN, BIC validation)
- Invoice configuration (numbering, layout, logo)
- System settings and email configuration
- MFA enforcement for admin roles
- Comprehensive audit logging

---

### 9. Customer Portal (Post-MVP)
**Objective:** Self-service portal for customers

**Planned Features:**
- Customer profile management
- Digital signature upload
- Profile picture upload
- Vehicle association to customer account
- View transactions, invoices, and offers
- Document access

---

## Advanced Features Suite (Post-MVP Expansion)

### 10. Damage Assessment & Claims Management
**Objective:** Professional damage case intake and workflow for insurance claims

**Key Features:**
- **Case Management:** Fast guided capture for liability, casco, and short-term damage cases
- **Photo Documentation:** Annotated photos with tags (damage, overview, documents)
- **Damage Items Grid:** Structured parts/operations with repair types, labor hours, costs
- **Status Tracking:** Draft → Submitted → Approved → Closed with timestamps
- **Cost Estimation:** Automated calculation with depreciation, labor rates, paint hours
- **Document Generation:** Claim reports with PDF export
- **Audit Trail:** Complete history of changes and updates
- **VIN Decode Integration:** Automatic vehicle data population
- **Parts Catalog:** Bulk-add from integrated parts database

---

### 11. Fahrzeugschein OCR Scanner
**Objective:** Extract vehicle registration data via OCR for fast data entry

**Key Features:**
- **Document Upload:** Scan or upload Fahrzeugschein (vehicle registration)
- **OCR Processing:** Automatic field extraction with confidence scores
- **Field Mapping:** Map extracted data to vehicle form fields
- **Manual Override:** Edit and correct extracted data
- **Multi-Language Support:** German vehicle documents
- **Validation:** Cross-check extracted VIN and plate numbers
- **Apply to Forms:** One-click population of vehicle intake forms

---

### 12. Photo Optimization & Processing
**Objective:** Automatic image optimization for faster uploads and better quality

**Key Features:**
- **Client-Side Resize:** Automatic resizing before upload
- **Compression:** Quality-optimized compression to reduce file size
- **Preview Comparison:** Original vs. optimized side-by-side view
- **EXIF Handling:** Preserve orientation, strip GPS by default
- **Batch Processing:** Optimize multiple images simultaneously
- **Quality Controls:** Adjustable compression presets
- **Format Conversion:** Convert to optimal web formats (WebP)

---

### 13. Advanced Photo Editor
**Objective:** Professional photo editing tools for vehicle images

**Key Features:**
- **Annotation Tools:** Draw arrows, circles, text boxes on photos
- **Damage Marking:** Highlight specific damage areas
- **Crop & Rotate:** Basic image manipulation
- **Filters & Adjustments:** Brightness, contrast, saturation
- **Comparison View:** Before/after damage photos
- **Layer Management:** Multiple annotation layers
- **Export Options:** Annotated vs. clean versions

---

### 14. Vehicle Valuation Tools
**Objective:** Automated vehicle valuation with market comparables

**Key Features:**
- **VIN/Plate Lookup:** Quick vehicle identification
- **Base Valuation:** Initial market value from DAT
- **Adjustments:** Mileage, condition, equipment modifications
- **Market Comparables:** Real-time pricing from marketplaces
- **Depreciation Calculator:** Automatic value depreciation
- **Valuation Report:** PDF export with methodology
- **Price Recommendations:** Suggested listing price ranges
- **Historical Data:** Track value changes over time

---

### 15. Mietwagenspiegel Integration
**Objective:** Rental car rate lookup for insurance claims

**Key Features:**
- **Rate Lookup:** Query rental car rates by vehicle class
- **Region-Specific:** Location-based rate tables
- **Duration Calculator:** Daily/weekly rate calculations
- **Integration with Claims:** Attach rental costs to damage cases
- **Rate History:** Track historical rental rates
- **PDF Export:** Rental cost documentation

---

### 16. Calculation Tools
**Objective:** Built-in calculators for common dealership tasks

**Key Features:**
- **Financing Calculator:** Loan payments and interest
- **Leasing Calculator:** Monthly lease payments
- **Trade-In Calculator:** Value assessment with adjustments
- **Margin Calculator:** Profit margins and breakeven
- **Tax Calculator:** VAT and other applicable taxes
- **Currency Converter:** Multi-currency support
- **Math in Fields:** Inline calculations (e.g., "1000+500*2")

---

### 17. Billing & Invoice Reminders
**Objective:** Automated dunning process for overdue invoices

**Key Features:**
- **Payment Tracking:** Monitor invoice due dates
- **Automatic Reminders:** Scheduled reminder emails (1st, 2nd, final)
- **Escalation Fees:** Configurable late payment fees
- **Reminder Templates:** Customizable email templates
- **Payment Recording:** Track partial and full payments
- **Balance Calculation:** Automatic balance updates
- **Status Management:** Overdue indicators and aging reports
- **Credit Notes:** Issue reversals for cancelled invoices

---

### 18. Factoring Services
**Objective:** Quick liquidity through invoice factoring

**Key Features:**
- **Eligibility Check:** Automated assessment of factorable invoices
- **Factoring Request:** Submit invoices for factoring
- **Rate Calculator:** Calculate factoring fees
- **Provider Integration:** Connect with factoring services
- **Status Tracking:** Monitor factoring request status
- **Payment Processing:** Automatic reconciliation of factored amounts
- **Reporting:** Factoring history and costs analysis

---

### 19. One-Click Exports to Estimating Systems
**Objective:** Seamless integration with industry-standard estimating platforms

**Key Features:**
- **Platform Support:** Audatex, DAT, GT Motive, Restwert24
- **Data Mapping:** Automatic field mapping for each platform
- **Export Wizard:** Guided export configuration
- **Batch Export:** Export multiple cases simultaneously
- **Progress Tracking:** Real-time export status
- **Error Handling:** Retry failed exports with detailed logs
- **Export History:** Audit trail of all exports
- **Validation:** Pre-export data validation

---

### 20. Text Modules & Templates
**Objective:** Reusable text blocks for faster document creation

**Key Features:**
- **Template Library:** Centralized repository of text modules
- **Variables & Placeholders:** Auto-fill with vehicle/customer data
- **Categories:** Organize by document type (contracts, emails, offers)
- **Search & Filter:** Quick template discovery
- **Preview:** Live preview with data substitution
- **Import/Export:** Share templates as JSON
- **Version Control:** Track template changes
- **Multi-Language:** Support for multiple languages

---

### 21. Branding & Letterhead
**Objective:** Customizable branding for all generated documents

**Key Features:**
- **Logo Management:** Upload and position company logo
- **Color Schemes:** Custom brand colors for documents
- **Font Selection:** Choose typography for documents
- **Letterhead Designer:** Visual editor for headers/footers
- **Multiple Templates:** Different templates for different document types
- **Preview System:** Live preview of branded documents
- **Presets:** Industry-standard layouts
- **Export Settings:** PDF generation with branding

---

### 22. Smart Suggestions & Auto-Complete
**Objective:** AI-powered suggestions for faster data entry

**Key Features:**
- **Recent Items:** Quick access to recently used data
- **Favorites/Pinning:** Pin frequently used items
- **Predictive Text:** Smart auto-complete for forms
- **Context-Aware:** Suggestions based on current context
- **Learning System:** Improves with usage patterns
- **Custom Suggestions:** User-defined shortcuts
- **Global Search:** Quick search across all entities

---

### 23. Shortcuts & Keyboard Navigation
**Objective:** Power-user efficiency tools

**Key Features:**
- **Command Palette:** Universal search and actions (Cmd/Ctrl+K)
- **Keyboard Shortcuts:** Configurable hotkeys for common actions
- **Date Shortcuts:** Quick date entry (today, tomorrow, +7d)
- **Math in Fields:** Inline calculations in currency fields
- **Quick Entry:** Fast-track forms with tab navigation
- **Shortcut Guide:** On-screen hotkey reference
- **Custom Shortcuts:** User-defined key bindings

---

### 24. User Preferences & Settings
**Objective:** Personalized user experience

**Key Features:**
- **View Preferences:** Save table column configurations
- **Default Values:** Set defaults for frequently used fields
- **Layout Memory:** Remember grid/list view preferences
- **Notification Settings:** Configure alert preferences
- **Language Selection:** Per-user language settings
- **Theme Selection:** Light/dark mode per user
- **Dashboard Customization:** Personalize widget layout
- **Export Preferences:** Default export formats

---

### 25. Advanced Permissions & Roles
**Objective:** Fine-grained access control

**Key Features:**
- **Granular Permissions:** Per-module permission settings
- **Custom Roles:** Create custom role combinations
- **Data Filtering:** Role-based data visibility
- **Feature Gating:** Hide features based on role
- **Permission Groups:** Organize permissions logically
- **Audit Log:** Track permission changes
- **Role Switching:** Demo mode for testing permissions
- **Delegation:** Temporary permission grants

---

### 26. Reporting & Analytics Dashboard
**Objective:** Business intelligence and insights

**Key Features:**
- **KPI Dashboard:** Real-time business metrics
- **Custom Reports:** Build custom report views
- **Chart Library:** Multiple visualization types
- **Date Range Filters:** Flexible time period selection
- **Export Options:** CSV, PDF, Excel exports
- **Scheduled Reports:** Automated email delivery
- **Drill-Down:** Click-through to detailed data
- **Comparison Views:** Period-over-period analysis
- **Financial Reports:** Revenue, costs, margins
- **Sales Funnel:** Conversion tracking

---

### 27. Webinars & Events
**Objective:** Customer training and engagement

**Key Features:**
- **Event Calendar:** Upcoming webinar listings
- **Registration:** Sign-up with calendar integration
- **Recording Library:** Access past webinar recordings
- **Notification System:** Reminders before events
- **Attendance Tracking:** Monitor participation
- **Certificate Generation:** Training completion certificates
- **Q&A Integration:** Live questions during webinars
- **Resource Downloads:** Supporting materials

---

### 28. Marketing Shell & Customer Acquisition
**Objective:** Professional marketing presence

**Key Features:**
- **Hero Section:** Eye-catching landing page
- **Video Modals:** Product demonstration videos
- **Trust Logos:** Partner and certification badges
- **Hotspot Explainer:** Interactive feature highlights
- **Testimonial Carousel:** Customer success stories
- **Cookie Banner:** GDPR-compliant cookie consent
- **Contact Forms:** Lead generation
- **Footer Navigation:** Comprehensive site navigation

---

### 29. Contact Import & CRM Integration
**Objective:** Bulk customer data import

**Key Features:**
- **CSV Import:** Bulk contact upload
- **Field Mapping:** Configure import field mapping
- **Duplicate Detection:** Identify and merge duplicates
- **Validation:** Data quality checks
- **Preview:** Review before import
- **Error Reporting:** Detailed import logs
- **Rollback:** Undo imports if needed
- **CRM Sync:** Integration with external CRM systems

---

## Technical Architecture

### Frontend
- **Framework:** React with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** Zustand (useAppConfig)
- **Internationalization:** i18next
- **Theme:** Dark/Light mode support

### Backend (Planned)
- **Cloud Provider:** AWS
- **Compute:** ECS (Container Service)
- **Database:** RDS (Relational Database)
- **Storage:** S3 (Images, Documents)
- **CDN:** CloudFront
- **API Gateway:** With rate limiting

### Key Integrations
- **DAT API:** Vehicle data import via VIN
- **DocuSign/Adobe Sign:** Digital signatures (€25-50/month per dealer)
- **FinAPI/SaltEdge:** Bank account integration (€50/month)
- **mobile.de / autoscout24:** Vehicle marketplace export
- **OpenAI API:** AI chat functionality (€10-50/month)
- **AWS SES/SendGrid:** Email service (€0-10/month)
- **Optional:** Twilio for SMS (€0-20/month)

### Security & Compliance
- GDPR/DSGVO compliant
- Data encryption at rest and in transit
- Regular security scans and vulnerability assessments
- Audit logging for all critical operations
- Data retention and anonymization policies
- Secrets management (AWS Vault)
- TLS/SSL certificates

---

## Infrastructure Costs

| Service | Purpose | Monthly Cost (EUR) |
|---------|---------|-------------------|
| Cloud Hosting (AWS) | Servers + Database + Network | 50-150 |
| Image Storage (S3) | Image storage + requests | 5-30 |
| Email Service (SES) | Transactional emails | 0-10 |
| Digital Signatures | DocuSign/Adobe Sign | 25-50 per dealer |
| Bank API | FinTS/PSD2 access | 50 |
| AI Chat | OpenAI API | 10-50 |
| SMS Service | Notifications (optional) | 0-20 |
| **Total** | | **140-360** |

**Note:** Vehicle marketplace fees (mobile.de, autoscout24) are managed directly by dealers

---

## Payment Plan

| Phase | Timing | Amount (EUR) | Milestones |
|-------|--------|--------------|-----------|
| **1. Kickoff** | December 2025 | 13,000 | Project activation |
| **2. Phase 1** | Early development | 5,000 | Infrastructure ready + Login complete |
| **3. System Demo** | ~60% progress | 5,000 | Vehicle Management 70% + UI demos + Cost mgmt + Sample documents |
| **4. Phase 3** | Document milestone | 5,000 | Document Management complete |
| **5. Phase 4** | Final features | 5,000 | Tasks + CRM + Bank Management complete |
| **6. Final Acceptance** | Production release | 10,000 | Final acceptance and go-live |
| **Total** | | **43,000** | |

---

## Story Points Breakdown

### MVP Features (Contracted)
| Epic | Story Points | % of MVP |
|------|-------------|-----------|
| Vehicle Management | 45 | 45% |
| Infrastructure | 20 | 20% |
| Admin Management | 7.5 | 7.5% |
| Bank Management | 7.5 | 7.5% |
| Login & Auth | 5 | 5% |
| Task Management | 5 | 5% |
| CRM | 5 | 5% |
| Document Management | 5 | 5% |
| **MVP Total** | **100** | **100%** |

### Advanced Features (Post-MVP)
| Feature Suite | Estimated Story Points | Priority |
|---------------|----------------------|----------|
| Damage Assessment & Claims | 40 | High |
| Photo Optimization & Editor | 15 | High |
| Fahrzeugschein OCR | 20 | High |
| Vehicle Valuation Tools | 15 | High |
| Reporting & Analytics | 25 | Medium |
| Text Modules & Templates | 10 | Medium |
| Branding & Letterhead | 8 | Medium |
| Smart Suggestions | 12 | Medium |
| Shortcuts & UX Enhancements | 8 | Medium |
| Advanced Permissions | 10 | Medium |
| One-Click Exports | 30 | Low |
| Mietwagenspiegel | 10 | Low |
| Calculation Tools | 12 | Low |
| Invoice Reminders | 8 | Low |
| Factoring Services | 15 | Low |
| User Preferences | 8 | Low |
| Contact Import | 10 | Low |
| Webinars & Events | 12 | Low |
| Marketing Shell | 15 | Low |
| Customer Portal | 20 | Low |
| **Advanced Total** | **~263** | |
| **Grand Total** | **~363** | |

---

## Risk Factors & Mitigation

### Technical Risks
- **Integration Complexity:** DAT API, DocuSign, Bank APIs
  - *Mitigation:* Early integration testing, fallback to manual entry
- **Data Migration:** Existing dealer data
  - *Mitigation:* Import tools, CSV templates, validation
- **Performance:** High image volume
  - *Mitigation:* S3 + CloudFront CDN, image optimization

### Business Risks
- **Marketplace API Changes:** mobile.de/autoscout24
  - *Mitigation:* Abstraction layer, regular monitoring
- **Regulatory Changes:** GDPR, tax regulations
  - *Mitigation:* Compliance reviews, legal consultation
- **Dealer Adoption:** User training needs
  - *Mitigation:* Intuitive UX, documentation, webinars

### Financial Risks
- **Infrastructure Cost Overruns**
  - *Mitigation:* Cost monitoring, budget alerts, optimization
- **Scope Creep**
  - *Mitigation:* Clear MVP definition, change request process

---

## Success Criteria

### MVP Acceptance
1. All 8 core epics fully implemented and tested
2. Infrastructure stable across all environments
3. Security audit passed
4. GDPR compliance verified
5. Integration tests successful for all external APIs
6. Performance baselines met (load testing)
7. Documentation complete (user + technical)
8. User acceptance testing (UAT) successful

### Post-Launch KPIs
- User adoption rate by dealers
- Average time to list a vehicle
- Document processing time reduction
- System uptime (target: 99.5%)
- Customer satisfaction scores
- Revenue per dealer per month

---

## Open Points

| Item | Details | Assignee | Status |
|------|---------|----------|--------|
| Feature Estimation | Complete estimation of all features | @Engin Bilen | Completed (Oct 4, 2025) |
| Payment Terms | 30% upfront, 30% demo, 40% completion | @Kelleciberkan | Accepted (Oct 1, 2025) |
| Contract/Invoice Options | | @Kelleciberkan | To be discussed |

---

## Partnership Terms

### Roles
- **Berkan Kelleci (Investor)**
  - Financial backing for MVP development
  - Business decisions and market access
  - Covers all direct costs until MVP completion

- **Ahmet Kilic (Technical Partner)**
  - Technical responsibility (architecture, implementation)
  - Product Owner and Project Manager during MVP
  - Quality assurance and requirement prioritization
  - Defers compensation until revenue generation

### Ownership
- Current: 50/50 split of IP (code, concepts, designs, documentation, trademarks)
- To be reviewed: Post-MVP before market entry

### Confidentiality
- Both parties committed to non-disclosure of confidential information
- Liability limited to intent or gross negligence

---

## Next Steps

1. ✅ Requirements documentation complete
2. ⏳ Development environment setup
3. ⏳ Sprint planning and backlog grooming
4. ⏳ Infrastructure provisioning (AWS)
5. ⏳ Design system and UI/UX mockups
6. ⏳ Sprint 1: Login & Authentication
7. ⏳ Sprint 2-4: Vehicle Management core
8. ⏳ Integration with external APIs
9. ⏳ Testing and QA
10. ⏳ UAT and production deployment

---

*Last Updated: December 24, 2025*  
*Document Version: 1.0*
