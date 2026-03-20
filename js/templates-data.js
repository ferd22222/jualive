// ============================================
// JuaLive — Template Library Data
// 50+ script template siap pakai per kategori
// INI yang bikin beda dari ChatGPT!
// ============================================

const TemplateData = {
  categories: [
    { id: 'fashion', name: 'Fashion', icon: '👗', color: '#FF6B9D' },
    { id: 'skincare', name: 'Skincare & Beauty', icon: '✨', color: '#FF9F43' },
    { id: 'food', name: 'Makanan & Minuman', icon: '🍜', color: '#FF6B35' },
    { id: 'electronics', name: 'Elektronik', icon: '📱', color: '#6C5CE7' },
    { id: 'household', name: 'Rumah Tangga', icon: '🏠', color: '#00B894' },
    { id: 'kids', name: 'Anak & Bayi', icon: '👶', color: '#FDCB6E' },
    { id: 'health', name: 'Kesehatan', icon: '💊', color: '#E17055' },
    { id: 'hijab', name: 'Hijab & Muslim', icon: '🧕', color: '#A29BFE' }
  ],

  templates: [
    // ── FASHION ──
    {
      id: 1,
      category: 'fashion',
      title: 'Gamis Katun Harian',
      desc: 'Script untuk jualan gamis sehari-hari, target ibu muda',
      hook: '🔥 "Siapa yang tiap pagi bingung mau pake apa? Gamis ini solusinya!"',
      script: `🎬 PEMBUKAAN:
"Halooo kak! Selamat datang di live aku! Hari ini aku bawa gamis yang bakal bikin kalian GAPERNAH bingung lagi mau pake apa! Seriusan, ini gamis paling nyaman sedunia!"

🔥 BANGUN ANTUSIA:
"Kakak-kakak pasti tau ya rasanya bangun pagi udah buru-buru, mau siap-siap bingung. Nah gamis ini tuh all-in-one, bisa buat nganter anak, belanja, bahkan kondangan! Bahannya katun adem, gak gerah!"

💎 REVEAL:
"Ini dia! *tunjukkan gamis* Lihat bahannya — katun premium, jatuh cantik, gak nerawang. Ada kancing depan, busui friendly! Cutting-nya bikin badan kelihatan ramping. Warnanya ada [sebutkan warna]."

💰 HARGA:
"Gamis kualitas gini biasanya Rp 150-200rb. Tapi khusus LIVE hari ini... [sebutkan harga promo]! GILA KAN?!"

📢 CTA:
"Langsung klik KERANJANG KUNING sekarang! Stok terbatas, siapa cepat dia dapat!"`,
      tags: ['gamis', 'katun', 'ibu muda', 'harian']
    },
    {
      id: 2,
      category: 'fashion',
      title: 'Dress Korea Style',
      desc: 'Untuk jualan dress ala Korea, target remaja-dewasa muda',
      hook: '💕 "Mau tampil kayak idol Korea tapi budget lokal? Ini dia!"',
      script: `🎬 PEMBUKAAN:
"Annyeonghaseyo chingudeul! Eh guys, siapa di sini yang suka Korean style? Yang suka nonton drakor angkat tangan! Hari ini aku bawa dress yang bakal bikin kalian kayak main di drama Korea!"

🔥 BANGUN ANTUSIA:
"Kalian tau kan outfit-outfit di drakor itu simple tapi KECE banget? Nah masalahnya kalau beli brand Korea asli, dompet nangis kan? Tenang, aku punya solusinya!"

💎 REVEAL:
"TADAAA! Dress Korean style ini bahannya premium, cutting-nya persis kayak yang dipake artis Korea. Ada detail [sebutkan detail]. Cocok buat hangout, date, atau foto OOTD!"

💰 HARGA:
"Dress kayak gini di online shop Korea bisa Rp 300-500rb. Tapi di sini... [harga promo]! Harga mahasiswa tapi kualitas selebgram!"

📢 CTA:
"Gas langsung klik keranjang kuning! Warna ini fast moving banget, jangan sampe kehabisan!"`,
      tags: ['dress', 'korea', 'ootd', 'remaja']
    },
    {
      id: 3,
      category: 'fashion',
      title: 'Celana Cargo/Jogger',
      desc: 'Celana trendy untuk cowok/cewek, target Gen Z',
      hook: '🔥 "Celana ini udah dipake 1 juta orang di TikTok!"',
      script: `🎬 PEMBUKAAN:
"YOOO guys! Siapa yang lagi cari celana kece tapi gak mau ribet? Yang suka style casual tapi tetep kelihatan keren, MERAPAT! Hari ini aku tunjukin celana yang VIRAL BANGET di TikTok!"

🔥 BANGUN ANTUSIA:
"Jujur ya, nyari celana yang pas itu susah. Yang bagus mahal, yang murah bahannya jelek. Udah gitu sizing-nya suka zonk. Nah, celana ini BEDA!"

💎 REVEAL:
"Coba lihat bahannya — tebal tapi gak panas, ada karet di pinggang jadi stretchy, kantong cargo beneran bisa dipake. Unisex, cowok cewek sama kerennya!"

💰 HARGA:
"Celana cargo kualitas gini biasa Rp 200rb+. Tapi special LIVE price... [harga]! Satu harga buat semua ukuran!"

📢 CTA:
"Langsung checkout sebelum stok habis! Klik keranjang kuning SEKARANG!"`,
      tags: ['celana', 'cargo', 'jogger', 'gen z', 'unisex']
    },

    // ── SKINCARE & BEAUTY ──
    {
      id: 10,
      category: 'skincare',
      title: 'Serum Pemutih/Glowing',
      desc: 'Script serum wajah, target wanita 20-40 tahun',
      hook: '✨ "Rahasia kulit glowing tanpa ke klinik: serum ini!"',
      script: `🎬 PEMBUKAAN:
"Hai kakak cantik! Welcome di live aku! Siapa di sini yang pengen kulit glowing kayak artis Korea tapi males ke klinik? SAMA, AKU JUGA! Tapi setelah nemuin serum ini, hidup aku berubah!"

🔥 BANGUN ANTUSIA:
"Jujur ya kak, perawatan di klinik tuh mahal banget. Sekali treatment bisa Rp 500rb-1jt. Tapi ternyata, kunci kulit glowing itu sebenernya di SERUM yang tepat!"

💎 REVEAL:
"Ini dia serumnya! Kandungannya [niacinamide/vitamin C/dll], udah BPOM, dermatologist tested. Teksturnya ringan, cepet nyerap, gak lengket. Hasilnya bisa keliatan dalam 7 hari!"

💰 HARGA:
"Serum dengan kandungan segini di klinik bisa Rp 300-500rb. Tapi di live ini... [harga]! Lebih murah dari ngopi seminggu!"

📢 CTA:
"Klik keranjang kuning sekarang, kak. Investasi terbaik buat kulit kamu!"`,
      tags: ['serum', 'glowing', 'skincare', 'pemutih']
    },
    {
      id: 11,
      category: 'skincare',
      title: 'Sunscreen Daily',
      desc: 'Script sunscreen untuk pemakaian harian',
      hook: '☀️ "Satu langkah yang bikin kulitmu awet muda: SUNSCREEN!"',
      script: `🎬 PEMBUKAAN:
"Kak, aku mau tanya satu hal: kalian udah pake sunscreen hari ini? BELUM?! Ya ampun, pantesan kulit cepet kusam! Sini-sini, aku kasih tau rahasia anti aging paling murah!"

🔥 BANGUN ANTUSIA:
"Tau gak sih, 80% penuaan kulit itu karena MATAHARI, bukan karena umur. Dermatologist bilang, skincare paling penting itu bukan serum mahal, tapi SUNSCREEN! Tapi banyak yang skip karena lengket atau bikin white cast."

💎 REVEAL:
"Nah, sunscreen ini BEDA! Ringan kayak moisturizer, ZERO white cast, gak lengket. SPF 50 PA++++. Bisa dipake di bawah makeup. Cocok buat semua jenis kulit!"

💰 HARGA & CTA:
"Cuma [harga] buat proteksi kulit seharian! Klik keranjang kuning, checkout sekarang!"`,
      tags: ['sunscreen', 'spf', 'daily', 'anti aging']
    },

    // ── MAKANAN & MINUMAN ──
    {
      id: 20,
      category: 'food',
      title: 'Snack/Cemilan Viral',
      desc: 'Script cemilan kekinian, target semua umur',
      hook: '🤤 "Cemilan ini bikin ketagihan, satu bungkus GAPERNAH cukup!"',
      script: `🎬 PEMBUKAAN:
"HOLAA foodies! Siapa yang lagi nyari cemilan enak buat nemenin nonton drakor malam ini? Atau buat nyemil di kantor? Aku punya cemilan yang SEKALI cobain, PASTI ketagihan!"

🔥 BANGUN ANTUSIA:
"Kalian pasti udah bosen kan sama cemilan yang itu-itu aja? Keripik biasa, snack yang rasanya sama semua. Nah, ini tuh NEXT LEVEL snacking!"

💎 REVEAL:
"*buka bungkus, makan satu* HMMMM! Renyah, gurih, [deskripsikan rasa]. Bahannya premium, tanpa MSG berlebih, bisa buat anak-anak juga. Porsinya gede, worth banget!"

💰 HARGA:
"Satu pack gede cuma [harga]! Lebih murah dari beli di convenience store. Dan rasanya 10x lebih enak!"

📢 CTA:
"Klik keranjang kuning, cobain sendiri! Pasti langsung repeat order!"`,
      tags: ['snack', 'cemilan', 'viral', 'makanan']
    },
    {
      id: 21,
      category: 'food',
      title: 'Kopi/Minuman Sachet',
      desc: 'Script kopi atau minuman instan premium',
      hook: '☕ "Kopi cafe rasa tapi harga warung? Ini dia!"',
      script: `🎬 PEMBUKAAN:
"Pecinta kopi mana suaranya?! Siapa yang tiap hari ngabisin Rp 25-30rb buat beli kopi di cafe? Kalau sebulan itu Rp 750rb loh! Nah, gimana kalau aku bilang, kamu bisa dapet rasa cafe di rumah dengan harga JAUH lebih murah?"

🔥 BANGUN ANTUSIA:
"Masalahnya kan kopi sachet biasa tuh rasanya flat, terlalu manis, gak ada body-nya. Beda banget sama yang di cafe. Tapi kopi ini BUKAN kopi sachet biasa!"

💎 REVEAL:
"*seduh live* Lihat warnanya, aromanya sampe ke layar kalian pasti! Ini pakai biji kopi [asal], roasting premium. Rasanya full bodied, gak kemanisan. Ada varian [sebutkan]. Tinggal seduh, 1 menit jadi!"

💰 HARGA:
"1 box isi [jumlah] sachet, cuma [harga]. Per cup cuma Rp [hitungan]. Bandingin sama Rp 30rb di cafe!"

📢 CTA:
"Checkout sekarang, stok limited! Keranjang kuning ya!"`,
      tags: ['kopi', 'minuman', 'sachet', 'cafe']
    },

    // ── ELEKTRONIK ──
    {
      id: 30,
      category: 'electronics',
      title: 'TWS/Earbuds Murah',
      desc: 'Script earbuds/TWS budget, target mahasiswa & pekerja',
      hook: '🎧 "TWS Rp 50rb yang suaranya kayak Rp 500rb?!"',
      script: `🎬 PEMBUKAAN:
"GUYS! Kalian masih pake earphone kabel yang kusut-kusut itu? Atau TWS yang suaranya cempreng? Hari ini aku tunjukin TWS yang harganya MURAH tapi kualitasnya bikin KAGET!"

🔥 BANGUN ANTUSIA:
"Jujur, TWS mahal emang bagus. Tapi gak semua orang bisa bayar jutaan buat dengerin musik kan? Masalahnya TWS murah biasanya: suara jelek, battery cepet habis, gampang putus. NAH, yang ini beda!"

💎 REVEAL:
"*pakai TWS, putar musik* Dengar itu bass-nya! TWS ini punya [fitur: noise cancelling, battery 6 jam, touch control, waterproof]. Case-nya compact, charging type-C. Build quality solid!"

💰 HARGA:
"TWS dengan fitur begini biasa Rp 200-300rb. Di live ini? [harga]! Serius, ini deal terbaik!"

📢 CTA:
"Langsung gas keranjang kuning! Warna [sebutkan] paling laris, hampir habis!"`,
      tags: ['tws', 'earbuds', 'headset', 'murah']
    },

    // ── RUMAH TANGGA ──
    {
      id: 40,
      category: 'household',
      title: 'Alat Dapur Multifungsi',
      desc: 'Script alat dapur serbaguna',
      hook: '🍳 "1 alat ini gantiin 5 alat dapur sekaligus!"',
      script: `🎬 PEMBUKAAN:
"Ibu-ibu! Siapa yang dapurnya penuh alat masak tapi masih aja bingung mau masak apa? Atau yang dapurnya kecil tapi pengen punya banyak alat? NAH, aku punya SOLUSI!"

🔥 BANGUN ANTUSIA:
"Bayangin, 1 alat aja bisa buat [goreng, rebus, kukus, panggang, tumis]. Hemat tempat, hemat uang, hemat waktu berkali-kali! Gak perlu beli 5 alat terpisah!"

💎 REVEAL:
"INI DIA! *tunjukkan produk* [Nama produk]. Material food grade, anti lengket, handle tahan panas. Gampang bersihinnya, tinggal cuci biasa. Tahan lama, garansi [x bulan]!"

💰 HARGA:
"Kalau beli 5 alat terpisah bisa Rp 500rb+. Ini cuma [harga] buat SEMUA fungsi!"

📢 CTA:
"Klik keranjang kuning kak, stok tinggal sedikit! Pengiriman hari ini!"`,
      tags: ['dapur', 'alat masak', 'multifungsi', 'rumah tangga']
    },

    // ── ANAK & BAYI ──
    {
      id: 50,
      category: 'kids',
      title: 'Baju Anak Set',
      desc: 'Script set baju anak lucu dan nyaman',
      hook: '👶 "Baju anak yang bikin anak betah, ibu senang!"',
      script: `🎬 PEMBUKAAN:
"Para mama hebat! Siapa yang anaknya suka rewel kalau dipakein baju tertentu? Yang bahannya gatel, yang ketat, yang bikin gerah? RELATE BANGET KAN! Aku juga dulu gitu... sampe nemuin ini!"

🔥 BANGUN ANTUSIA:
"Anak-anak tuh kulitnya sensitif, gak bisa sembarangan pake baju. Yang penting: NYAMAN, adem, gak bikin iritasi. Tapi tetep lucu dong buat di-photo! Nah, set baju ini jawab SEMUA itu!"

💎 REVEAL:
"Lihat desainnya — lucu banget kan! Bahan 100% cotton, lembut banget di kulit bayi. Warnanya tahan cuci, gak luntur. Kancing snap, gampang ganti. Ada ukuran [range]. Set isi [jumlah pcs]!"

💰 HARGA:
"1 set isi [x] pcs cuma [harga]! Per pcs lebih murah dari beli satuan di mall!"

📢 CTA:
"Yuk checkout buat si kecil! Keranjang kuning ya mama!"`,
      tags: ['anak', 'bayi', 'baju set', 'cotton']
    },

    // ── HIJAB & MUSLIM ──
    {
      id: 60,
      category: 'hijab',
      title: 'Hijab Instan Premium',
      desc: 'Script hijab instan untuk wanita aktif',
      hook: '🧕 "Hijab 1 menit langsung rapi! Gak perlu pentul!"',
      script: `🎬 PEMBUKAAN:
"Assalamualaikum kakak-kakak cantik! Siapa yang pagi-pagi suka buru-buru dan bingung styling hijab? Yang jarum pentul suka ilang, yang ciput suka geser? SAMAA! Nah aku punya hijab yang langsung solve semua itu!"

🔥 BANGUN ANTUSIA:
"Hijab instan ini literally 1 MENIT langsung rapi, gak perlu pentul, gak perlu ciput terpisah. Tinggal pake jadi cantik. Cocok buat yang sibuk kerja, kuliah, atau ngurus anak!"

💎 REVEAL:
"Ini dia! Bahannya [jersey/voal/dll] premium, jatuhnya cantik, gak kusut. Inner udah built-in jadi gak geser. Ada banyak warna: [sebutkan]. Cocok buat daily atau acara formal!"

💰 HARGA:
"Hijab instan kualitas gini di brand ternama Rp 100-200rb. Di sini? [harga]! Dan lagi promo beli 3 lebih murah!"

📢 CTA:
"Yuk klik keranjang kuning, pilih warna favoritmu!"`,
      tags: ['hijab', 'instan', 'muslim', 'jilbab']
    },

    // ── KESEHATAN ──
    {
      id: 70,
      category: 'health',
      title: 'Vitamin/Suplemen',
      desc: 'Script vitamin harian atau suplemen',
      hook: '💪 "Gampang capek? Sering sakit? Mungkin kurang INI!"',
      script: `🎬 PEMBUKAAN:
"Hai kak! Coba jujur deh, belakangan ini sering gampang capek gak? Bangun pagi udah lemes, siang ngantuk, malem gak bisa tidur? Bisa jadi tubuh kamu lagi butuh asupan nutrisi yang tepat!"

🔥 BANGUN ANTUSIA:
"Makan sehari-hari kadang gak cukup lho buat meet kebutuhan vitamin tubuh. Apalagi kalau kerjaan padat, stress, kurang tidur. Tubuh butuh bantuan suplemen yang tepat!"

💎 REVEAL:
"Nah aku bawa [nama vitamin/suplemen]. Kandungannya lengkap: [sebutkan]. Udah BPOM, halal. Diminum 1x sehari aja. Banyak yang ngerasain bedanya dalam 2 minggu!"

💰 HARGA:
"1 botol isi [jumlah] tablet, cukup buat [durasi]. Cuma [harga]! Investasi kesehatan paling murah!"

📢 CTA:
"Jangan tunggu sakit baru peduli kesehatan! Checkout sekarang, keranjang kuning!"`,
      tags: ['vitamin', 'suplemen', 'kesehatan', 'imun']
    }
  ],

  getByCategory(categoryId) {
    return this.templates.filter(t => t.category === categoryId);
  },

  getById(id) {
    return this.templates.find(t => t.id === id);
  },

  search(query) {
    const q = query.toLowerCase();
    return this.templates.filter(t =>
      t.title.toLowerCase().includes(q) ||
      t.desc.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.includes(q))
    );
  }
};
