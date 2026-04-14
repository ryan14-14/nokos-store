const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

let produk = [
  { id: 1, nama: "Nokos Indonesia", harga: 10000, stok: 5 },
  { id: 2, nama: "Nokos USA", harga: 25000, stok: 3 },
  { id: 3, nama: "Nokos UK", harga: 30000, stok: 2 }
];

// Ambil produk
app.get('/produk', (req, res) => {
  res.json(produk);
});

// Order
app.post('/order', (req, res) => {
  let p = produk.find(x => x.id == req.body.id);

  if (!p || p.stok <= 0) {
    return res.json({ status: "stok habis" });
  }

  p.stok--;
  res.json({ status: "order berhasil" });
});

// Update stok
app.post('/update-stok', (req, res) => {
  let { id, jumlah } = req.body;

  let p = produk.find(x => x.id == id);

  if (!p) {
    return res.json({ status: "produk tidak ada" });
  }

  p.stok += Number(jumlah);

  if (p.stok < 0) p.stok = 0;

  res.json({ status: "stok diupdate", stok: p.stok });
});

// 🔥 TAMBAH PRODUK
app.post('/tambah-produk', (req, res) => {
  let { nama, harga, stok } = req.body;

  let idBaru = produk.length ? produk[produk.length - 1].id + 1 : 1;

  produk.push({
    id: idBaru,
    nama: nama,
    harga: Number(harga),
    stok: Number(stok)
  });

  res.json({ status: "produk ditambahkan" });
});

// Login admin
app.post('/login', (req, res) => {
  if (req.body.username === "admin" && req.body.password === "1234") {
    res.json({ status: "login berhasil" });
  } else {
    res.json({ status: "login gagal" });
  }
});

app.listen(3000, () => console.log("Server jalan di http://localhost:3000"));