# SmartPing Dashboard

Dashboard statis untuk sistem SmartPing, pelontar bola pingpong otomatis berbasis ESP32 DevKit V1 dengan arsitektur Logic Switch Bypass.

## Isi Dashboard

- Status mode Manual dan Smart berdasarkan toggle fisik.
- Panel kontrol PWM untuk Pelontar A, Pelontar B, dan Feeder.
- Diagram alur catu daya, ESP32, relay, BTS7960, dan L298N.
- Tabel pemetaan pin ESP32 Original.
- Checklist failsafe untuk booting, relay, brownout, dan WiFi TX power.

## Cara Pakai

Buka `index.html` langsung di browser. Dashboard ini belum terhubung ke ESP32 secara realtime; interaksi yang ada adalah simulasi UI untuk memvisualkan perilaku sistem SmartPing.

## GitHub Pages

Repo ini siap dipublikasikan lewat GitHub Pages menggunakan workflow `.github/workflows/pages.yml`. Setelah Pages aktif, dashboard akan tersedia di:

`https://poisenpoi.github.io/-balls/`

## Catatan Hardware

- Relay 5V active-low tetap OFF saat boot supaya jalur motor kembali ke mode Manual.
- Mode Smart mengalihkan jalur motor ke driver digital setelah delay transisi 4 detik.
- Pin 6, 7, 8, 11, dan 16 dihindari karena berhubungan dengan flash internal ESP32.
- Brownout dimitigasi dengan bypass detector dan pembatasan daya WiFi ke 2dBm.
