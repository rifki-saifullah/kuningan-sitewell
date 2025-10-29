import { config } from "../config/config";
import { CreateCronJobRequest, CreateCronScheduleRequest } from "../model/cron-model";
import { CreateWebsiteRequest } from "../model/website-model";

export const cronSchedules = {
  everyHalfHour: "0,30 * * * * *",
  everyHour: "0 0 * * * *",
  every3Hours: "0 0 */3 * * *",
  every6Hours: "0 0 */6 * * *",
  every12Hours: "0 0 */12 * * *",
  daily: "0 0 0 * * *",
};

export function cronJobSeed(cronScheduleId: number): CreateCronJobRequest {
  return {
    name: "Sending Telegram Notification",
    telegram_chat_id: config.telegram.chatId,
    cron_schedule_id: cronScheduleId,
  }
};

export const cronScheduleSeeds: CreateCronScheduleRequest[] = [
  {
    schedule: cronSchedules.everyHalfHour,
    description: "Setiap setengah jam",
  },
  {
    schedule: cronSchedules.everyHour,
    description: "Setiap 1 jam",
  },
  {
    schedule: cronSchedules.every3Hours,
    description: "Setiap 3 jam",
  },
  {
    schedule: cronSchedules.every6Hours,
    description: "Setiap 6 jam",
  },
  {
    schedule: cronSchedules.every12Hours,
    description: "Setiap 12 jam",
  },
  {
    schedule: cronSchedules.daily,
    description: "Setiap 1 hari pukul 00:00",
  },
];

export const websiteSeeds: CreateWebsiteRequest[] = [
  {
    name: "Kuningankab",
    url: "https://kuningankab.go.id",
    description: "Website resmi Pemerintah Kabupaten Kuningan — portal layanan publik, informasi kepegawaian, pajak, aset, dan kinerja instansi."  // berdasarkan portal utama :contentReference[oaicite:0]{index=0}
  },
  {
    name: "Covid-19 Kuningan",
    url: "https://covid19.kuningankab.go.id",
    description: "Portal penanganan dan informasi pandemi COVID-19 di Kabupaten Kuningan."
  },
  {
    name: "Aset Kuningan",
    url: "https://aset.kuningankab.go.id",
    description: "Sistem pengelolaan aset daerah Kabupaten Kuningan."
  },
  {
    name: "Sabilulungan",
    url: "http://sabilulungan.kuningankab.go.id/",
    description: "Platform layanan masyarakat dan informasii publik Kabupaten Kuningan."
  },
  {
    name: "SIMPAD",
    url: "https://e-sptpd.kuningankab.go.id/",
    description: "Website pelaporan pajak daerah (SPTPD) Kabupaten Kuningan."
  },
  {
    name: "H2H Biller",
    url: "https://h2h-ptpos.pajak.kuningankab.go.id/",
    description: "Sistem biller pembayaran pajak daerah secara host-to-host Kabupaten Kuningan."
  },
  {
    name: "SMS Pajak",
    url: "https://sms.pajak.kuningankab.go.id/",
    description: "Layanan SMS untuk informasi dan pembayaran pajak daerah Kabupaten Kuningan."
  },
  {
    name: "BKPSDM",
    url: "https://bangkom.bkpsdm.kuningankab.go.id/",
    description: "Sistem BANGKOM (bangunan kompetensi) di BKPSDM Kabupaten Kuningan — pengembangan kompetensi pegawai."
  },
  {
    name: "CSR",
    url: "https://csr.kuningankab.go.id",
    description: "Website penyelenggaraan program Corporate Social Responsibility (CSR) di Kabupaten Kuningan."
  },
  {
    name: "Jaringan Jalan dan Jembatan",
    url: "http://jalankabupaten.kuningankab.go.id/kng2019/website/indexhome.aspx",
    description: "Website rekapitulasi data kondisi perkerasan dan jaringan jalan kabupaten Kabupaten Kuningan."
  },
  {
    name: "Pariwisata Kuningan",
    url: "https://pariwisatakuningan.kuningankab.go.id/",
    description: "Portal pariwisata Kabupaten Kuningan — destinasi, event dan informasi wisata."
  },
  {
    name: "Potensi Investasi",
    url: "https://potensi-investasi.kuningankab.go.id/",
    description: "Portal potensi investasi dan peluang bisnis di Kabupaten Kuningan."
  },
  {
    name: "Saber Pungli",
    url: "https://saberpungli.kuningankab.go.id/",
    description: "Sistem pengaduan dan pemberantasan pungutan liar di Kabupaten Kuningan."
  },
  {
    name: "Sadata",
    url: "http://sadata.kuningankab.go.id/",
    description: "Sistem Satu Data Pemerintah Kabupaten Kuningan — pengelolaan data terintegrasi."
  },
  {
    name: "Sapa BUMDES",
    url: "https://sapabumdes.kuningankab.go.id/",
    description: "Platform Sapa BUMDes Kabupaten Kuningan — layanan bagi badan usaha milik desa."
  },
  {
    name: "Satu Data Kuningan",
    url: "https://sapabumdes.kuningankab.go.id/",
    description: "Platform untuk pengelolaan dan berbagi pakai data antar Perangkat Daerah di lingkungan Pemerintah Kabupaten Kuningan."
  },
  {
    name: "SiAYU MAJU",
    url: "https://siayumaju.kuningankab.go.id/",
    description: "Sistem Aplikasi Posyandu Mandiri dan Pinunjul di Kabupaten Kuningan."
  },
  {
    name: "SIPANDUK",
    url: "https://sipanduk.kuningankab.go.id/",
    description: "Sistem Informasi Pelayanan Administrasi Kependudukan Kabupaten Kuningan."
  },
  {
    name: "TPID",
    url: "http://tpid.kuningankab.go.id/",
    description: "Sistem Pengendalian Inflasi Daerah Kabupaten Kuningan."
  },
  {
    name: "Si Badu Mirakyat",
    url: "https://sibadumirakyat.kuningankab.go.id/",
    description: "Sistem Informasi & Pelayanan Terpadu Kabupaten Kuningan — Si BAdu MiRakyat."
  },
  {
    name: "E-Kinerja",
    url: "https://ekinerja.kuningankab.go.id/",
    description: "Sistem elektronis evaluasi kinerja ASN di Kabupaten Kuningan."
  },
  {
    name: "SAKIP Kuningan",
    url: "https://esakip-v2.kuningankab.go.id/",
    description: "Sistem Akuntabilitas Kinerja Instansi Pemerintah Kabupaten Kuningan."
  },
  {
    name: "Sistem Informasi Perencanaan",
    url: "https://kuningansip.kuningankab.go.id/",
    description: "Sistem Informasi Perencanaan di Kabupaten Kuningan (SIP)."
  },
  {
    name: "LPSE",
    url: "http://lpse.kuningankab.go.id/",
    description: "Layanan Pengadaan Secara Elektronik Kabupaten Kuningan."
  },
  {
    name: "SIDIKU",
    url: "https://sidiku.kuningankab.go.id/",
    description: "Sistem Informasi Desa Kabupaten Kuningan (SIDIKU)."
  },
  {
    name: "Sitarung",
    url: "https://sitarung.kuningankab.go.id/",
    description: "Sistem Informasi Tata Ruang Kabupaten Kuningan."
  },
  {
    name: "Siva Pelukabas",
    url: "https://siva-peluk-abas.kuningankab.go.id/",
    description: "Sistem Informasi Layanan Pemuka Agama & Lembaga Keagamaan Kabupaten Kuningan."
  },
  {
    name: "ASN Mail",
    url: "https://asnmail.kuningankab.go.id/",
    description: "Layanan email resmi ASN Pemerintah Kabupaten Kuningan."
  },
  {
    name: "E-Database Ekonomi Pinunjul",
    url: "https://ekodes-pinunjul.kuningankab.go.id/",
    description: "Database Ekonomi Desa Pinunjul Kabupaten Kuningan."
  },
  {
    name: "E-Monev",
    url: "http://peka.kuningankab.go.id/",
    description: "Sistem Elektronik Monitoring & Evaluasi Kabupaten Kuningan (PEKA)."
  },
  {
    name: "PEKA",
    url: "http://emonev-setda.kuningankab.go.id/",
    description: "Pendayagunaan Aparatur Setda Kabupaten Kuningan — Sistem Informasi PEKA."
  },
  {
    name: "Siaga ASN",
    url: "https://siaga-asn.kuningankab.go.id",
    description: "Platform Siaga ASN Kabupaten Kuningan — layanan kesiapan dan kepegawaian."
  },
  {
    name: "SIMPEG",
    url: "https://simpeg.kuningankab.go.id",
    description: "Sistem Informasi Manajemen Kepegawaian Kabupaten Kuningan."
  },
  {
    name: "Sinyaman Dinsosku",
    url: "https://sinyaman-dinsosku.kuningankab.go.id/",
    description: "Sistem pelaksanaan layanan mantap untuk masyarakat Kabupaten Kuningan — Sinyaman Dinsosku."
  },
  {
    name: "SIPKD 90",
    url: "http://app.simdakan.kuningankab.go.id/",
    description: "Aplikasi SIPKD 90 untuk Dinas Perikanan & Peternakan Kabupaten Kuningan."
  },
  {
    name: "Sibeokesra",
    url: "https://sibeokesra.kuningankab.go.id/",
    description: "Sistem Informasi Beasiswa dan Kesejahteraan Sosial Kabupaten Kuningan."
  },
  {
    name: "Silaga",
    url: "https://www.silaga.kuningankab.go.id/",
    description: "Sistem Informasi Lembaga Keagamaan Kabupaten Kuningan."
  }
];