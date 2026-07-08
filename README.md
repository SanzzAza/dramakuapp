# DramaKu

Aplikasi web (mobile-first) buat nonton drama pendek (short drama) China & Korea dari berbagai platform (Melolo, DramaBox, GoodShort, MeloShort, NetShort, MovieBox, FreeReels, DramaNova, dll) dalam satu tampilan.

**Live demo:** deploy otomatis via Vercel (lihat `vercel.json`).

## ✨ Fitur

- Home dengan hero carousel, kategori, dan rekomendasi
- Pencarian judul drama
- Halaman detail (sinopsis, daftar episode)
- Video player custom dengan dukungan HLS (`.m3u8`) via [hls.js](https://github.com/video-dev/hls.js)
- Lanjutkan menonton (continue watching)
- Favorit & riwayat tontonan (disimpan di `localStorage`)
- Pilihan multi-platform sumber konten

## 🗂️ Struktur project

```
.
├── index.html      # markup halaman
├── style.css       # semua styling
├── app.js          # logic aplikasi (fetch data, render UI, player, dll)
├── manifest.json   # PWA manifest (installable ke homescreen)
├── icon-192.png    # app icon
├── icon-512.png    # app icon
└── vercel.json     # konfigurasi deploy Vercel
```

Sebelumnya semua kode ada dalam satu file `index.html`. Sekarang sudah dipisah supaya lebih mudah dibaca dan di-maintain.

## 🚀 Menjalankan secara lokal

Karena ini murni HTML/CSS/JS statis, tinggal serve foldernya:

```bash
# pakai Python
python3 -m http.server 8080

# atau pakai Node (http-server)
npx http-server -p 8080
```

Lalu buka `http://localhost:8080` di browser.

## ⚠️ Disclaimer

Aplikasi ini mengambil data/konten video dari API pihak ketiga (bukan API resmi dari platform-platform yang disebutkan di atas). Project ini dibuat untuk **tujuan belajar/eksperimen pribadi**, bukan produk komersial. Ketersediaan konten sepenuhnya bergantung pada API pihak ketiga tersebut dan bisa berhenti berfungsi kapan saja tanpa pemberitahuan. Hak cipta seluruh konten video tetap milik pemilik/platform aslinya masing-masing.

## 🧩 Known limitations

- Data pengguna (favorit, riwayat) hanya tersimpan di `localStorage` — hilang jika ganti device/browser atau clear data.
- Tidak ada sistem akun/login.
- Bergantung penuh pada satu sumber API pihak ketiga tanpa fallback.

## 📄 License

Lihat [LICENSE](./LICENSE).
