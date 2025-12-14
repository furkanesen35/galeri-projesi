# Araç Yönetimi ve Admin Paneli Frontend Tasarım Dokümanı

## 1. Proje Tanımı

Bu proje, araç yönetimi ve admin paneli işlevselliği sunan, dinamik ve özelleştirilebilir bir frontend uygulamasıdır. React ve TypeScript ile geliştirilecek, çoklu dil ve tema desteği, drag & drop, takvim ve görev yönetimi gibi modüller içerecektir. Backend servisleri hazır olarak sağlanacaktır.

## 2. Temel Özellikler

- **Çoklu Dil Desteği:** Almanca, İngilizce, Türkçe (i18n altyapısı)
- **Tema ve Renk Yönetimi:** Kullanıcı tarafından değiştirilebilir tema (örn. açık/koyu mod, renk seçimi)
- **Responsive Tasarım:** Desktop, tablet ve mobil uyumlu arayüz
- **Drag & Drop:** Alanların ve veri sıralamasının sürükle-bırak ile değiştirilebilmesi
- **Dinamik Sayfa ve Alan Yönetimi:** Sayfa ve alan ekleme/çıkarma, konfigürasyon tabanlı yapı
- **Takvim Modülü:** Görevlerin ve terminlerin takvim görünümünde yönetimi
- **Araç Yönetimi:** Araç ekleme, listeleme, detay görüntüleme, bilgilerin tab'lar halinde sunulması
- **Görev (Aufgaben) Yönetimi:** Görev ekleme, silme, atama, durum takibi
- **Fotoğraf Yönetimi:** Fotoğraf yükleme, sıralama, silme (drag & drop ile)
- **Banka ve Konfigürasyon Verileri:** Admin panelinden temel verilerin yönetimi
- **API Entegrasyonu:** Backend servisleri ile RESTful iletişim

## 3. Teknik Yığın

- **Frontend Framework:** React (TypeScript)
- **State Management:** React Context, Redux veya Zustand
- **UI Kütüphanesi:** Material UI (MUI) veya Chakra UI
- **Çoklu Dil:** react-i18next
- **Drag & Drop:** react-beautiful-dnd
- **Takvim:** react-big-calendar
- **API:** axios, react-query
- **Dosya Yükleme:** react-dropzone
- **Tema Yönetimi:** MUI/Chakra theme provider

## 4. Sayfa ve Modül Listesi

1. **Login / Auth Sayfası**
2. **Dashboard / Ana Panel**
3. **Araç Listesi**
   - Araç ekle, sil, düzenle
   - Detay görüntüleme (tab'lar ile)
   - Drag & drop ile alan sıralama
4. **Görev Yönetimi (Aufgaben Management)**
   - Görev ekle, sil, atama
   - Takvim entegrasyonu
5. **Takvim (Werkstatt Kalender)**
   - Günlük, haftalık, aylık görünüm
   - Görevlerin takvimde gösterimi
6. **Banka ve Konfigürasyon Yönetimi**
7. **Fotoğraf Yönetimi**
   - Yükleme, silme, sıralama
8. **Ayarlar**
   - Tema, dil, kullanıcı ayarları

## 5. Konfigürasyon ve Özelleştirme

- Tüm metinler, renkler, logolar ve alanlar konfigüre edilebilir olacak.
- Kullanıcı, alanların sırasını ve görünürlüğünü değiştirebilecek.
- Dil ve tema değişikliği anlık olarak uygulanabilecek.

## 6. Entegrasyon ve API

- Backend Spring Boot ile sağlanacak, tüm veri ve servisler REST API üzerinden alınacak.
- Frontend, backend'den gelen konfigürasyon ve veri yapısına göre dinamik olarak şekillenecek.

## 7. Geliştirme ve Teslimat

- İlk aşamada demo için temel modüller ve ekranlar hazırlanacak.
- Kod yapısı ölçeklenebilir ve sürdürülebilir olacak.
- Responsive ve erişilebilirlik (a11y) standartlarına uygunluk sağlanacak.

## 8. Ek Notlar

- Proje ilerledikçe yeni modüller eklenebilir.
- Tasarım ve işlevsellik müşteri geri bildirimlerine göre güncellenebilir.
- Bütçe ve zaman planı demo sonrası netleşecektir.

---

Bu doküman, projenin temel gereksinimlerini ve teknik yol haritasını özetlemektedir. Detaylar, müşteri ile yapılacak görüşmeler ve demo sonrası netleştirilecektir.
