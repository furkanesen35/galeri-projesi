import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        dashboard: 'Dashboard',
        vehicles: 'Vehicles',
        tasks: 'Tasks',
        calendar: 'Calendar',
        config: 'Config',
        photos: 'Photos',
        settings: 'Settings'
      },
      actions: {
        add: 'Add',
        edit: 'Edit',
        delete: 'Delete',
        save: 'Save'
      },
      dashboard: {
        title: 'Operations Overview',
        subtitle: 'Key metrics and quick links'
      }
    }
  },
  de: {
    translation: {
      nav: {
        dashboard: 'Übersicht',
        vehicles: 'Fahrzeuge',
        tasks: 'Aufgaben',
        calendar: 'Kalender',
        config: 'Konfiguration',
        photos: 'Fotos',
        settings: 'Einstellungen'
      },
      actions: {
        add: 'Hinzufügen',
        edit: 'Bearbeiten',
        delete: 'Löschen',
        save: 'Speichern'
      },
      dashboard: {
        title: 'Betriebsübersicht',
        subtitle: 'Kennzahlen und Schnellzugriffe'
      }
    }
  },
  tr: {
    translation: {
      nav: {
        dashboard: 'Panel',
        vehicles: 'Araçlar',
        tasks: 'Görevler',
        calendar: 'Takvim',
        config: 'Konfig',
        photos: 'Fotoğraflar',
        settings: 'Ayarlar'
      },
      actions: {
        add: 'Ekle',
        edit: 'Düzenle',
        delete: 'Sil',
        save: 'Kaydet'
      },
      dashboard: {
        title: 'Operasyon Özeti',
        subtitle: 'Önemli metrikler ve hızlı erişim'
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'de',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
