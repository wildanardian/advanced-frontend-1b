# Mission Instruction

Misi ini merupakan kelanjutan dari Mission 1, di mana fokusnya adalah mengelola state dan mengintegrasikan data API ke dalam tampilan React.

## STEP 3: Implementasi State Management

Kita akan menyimpan hasil get data dari API ke state management sehingga mudah diakses dan digunakan di berbagai komponen aplikasi.

### Tugas

1. Pasang library Redux Toolkit dan React Redux untuk membantu mengelola state.

   ```bash
   npm install @reduxjs/toolkit react-redux
   ```

2. Buat satu folder baru bernama `store/redux` di dalam direktori project kamu untuk menyimpan file terkait state management.

3. Di dalam folder `store/redux`, buat satu file baru bernama `store.js` untuk mengonfigurasi store Redux.

4. Buat file reducer yang berisi:
   - **Initial State**: State awal berupa array kosong yang nantinya akan diisi dengan data API.
   - **Reducer untuk Data API**: Reducer untuk menangani data hasil dari API dan menyimpannya ke dalam state global.

5. Daftarkan reducer yang dibuat ke dalam file `store.js`.

6. Selanjutnya, hubungkan file `store.js` ke root aplikasi, yaitu `index.js`, menggunakan `Provider`. Provider akan menyediakan akses ke state store untuk seluruh komponen anak di dalamnya.

## STEP 4: Mengintegrasikan Data API ke dalam Tampilan Komponen React

### 1. Integrasi Get Data

- Gunakan fungsi Get API dari folder `services/api`.
- Panggil reducer pada Redux yang sudah dibuat sebelumnya untuk mendapatkan data yang telah disimpan.
- Tampilkan data di komponen `ListView` menggunakan `useSelector` untuk mengambil data dari state Redux.

```javascript
import { useSelector } from 'react-redux';
import { getData } from './services/api'; // Import fungsi Get API dari folder services/api
```

### 2. Integrasi Edit, Add, dan Delete

- **Add**: Gunakan fungsi Add API dari folder `services/api` untuk menambahkan data baru.
- **Edit**: Gunakan fungsi Edit API dari folder `services/api` untuk memperbarui data yang ada.
- **Delete**: Gunakan fungsi Delete API dari folder `services/api` untuk menghapus data.

## Poin Penilaian

- Mengimplementasikan State Management
- Boleh menggunakan AI