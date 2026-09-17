"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  ShoppingCart,
  BookOpen,
  MapPin,
  Star,
  Heart,
  SlidersHorizontal,
  ArrowRight,
  User,
  Menu,
  X,
} from "lucide-react";

const books = [
  { id: 1, title: 'Laut Bercerita', author: 'Leila S. Chudori', price: 68000, oldPrice: 115000, condition: 'Seperti Baru', city: 'Bandung', rating: 4.9, cover: 'https://placehold.co/360x500/172554/ffffff?text=Laut%5CnBercerita', color: 'bg-blue-950' },
  { id: 2, title: 'Filosofi Teras', author: 'Henry Manampiring', price: 59000, oldPrice: 98000, condition: 'Baik', city: 'Jakarta', rating: 4.8, cover: 'https://placehold.co/360x500/f59e0b/172554?text=Filosofi%5CnTeras', color: 'bg-amber-500' },
  { id: 3, title: 'Atomic Habits', author: 'James Clear', price: 75000, oldPrice: 108000, condition: 'Seperti Baru', city: 'Surabaya', rating: 4.9, cover: 'https://placehold.co/360x500/f4f4f5/18181b?text=Atomic%5CnHabits', color: 'bg-zinc-100' },
  { id: 4, title: 'Bumi Manusia', author: 'Pramoedya A. Toer', price: 62000, oldPrice: 120000, condition: 'Cukup Baik', city: 'Yogyakarta', rating: 4.7, cover: 'https://placehold.co/360x500/991b1b/ffffff?text=Bumi%5CnManusia', color: 'bg-red-800' },
  { id: 5, title: 'The Psychology of Money', author: 'Morgan Housel', price: 79000, oldPrice: 125000, condition: 'Baik', city: 'Bogor', rating: 4.8, cover: 'https://placehold.co/360x500/14532d/ffffff?text=Psychology%5Cnof+Money', color: 'bg-green-900' },
  { id: 6, title: 'Pulang', author: 'Tere Liye', price: 49000, oldPrice: 89000, condition: 'Baik', city: 'Malang', rating: 4.6, cover: 'https://placehold.co/360x500/1e3a8a/ffffff?text=Pulang', color: 'bg-blue-900' },
  { id: 7, title: 'Sapiens', author: 'Yuval Noah Harari', price: 88000, oldPrice: 150000, condition: 'Seperti Baru', city: 'Depok', rating: 4.9, cover: 'https://placehold.co/360x500/e7e5e4/292524?text=Sapiens', color: 'bg-stone-200' },
  { id: 8, title: 'Cantik Itu Luka', author: 'Eka Kurniawan', price: 65000, oldPrice: 110000, condition: 'Cukup Baik', city: 'Solo', rating: 4.7, cover: 'https://placehold.co/360x500/7c2d12/ffffff?text=Cantik+Itu%5CnLuka', color: 'bg-orange-900' },
];

const formatPrice = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);


const categories = ['Semua', 'Fiksi', 'Pengembangan Diri', 'Bisnis', 'Sejarah', 'Anak', 'Pendidikan'];

export default function MarketplaceBuku() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const shownBooks = useMemo(() => books.filter(book => `${book.title} ${book.author}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const toggleFavorite = (id: number) => setFavorites(items => items.includes(id) ? items.filter(item => item !== id) : [...items, id]);

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-5 px-5 py-4 lg:px-8">
          <a href="#" className="flex shrink-0 items-center gap-2 text-xl font-black tracking-tight text-blue-950">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-400"><BookOpen size={22} /></span>
            BacaLagi
          </a>
          <div className="relative hidden flex-1 md:block">
            <Search className="absolute left-4 top-3 text-slate-400" size={20} />
            <input value={query} onChange={e => setQuery(e.target.value)} className="w-full rounded-xl border border-stone-200 bg-stone-100 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-blue-900 focus:bg-white focus:ring-2 focus:ring-blue-100" placeholder="Cari judul, penulis, atau ISBN..." />
          </div>
          <nav className="ml-auto hidden items-center gap-6 text-sm font-semibold lg:flex">
            <a href="#koleksi" className="hover:text-blue-900">Jelajahi</a>
            <a href="#cara-kerja" className="hover:text-blue-900">Cara Kerja</a>
            <button className="flex items-center gap-2 hover:text-blue-900"><User size={19} /> Masuk</button>
            <button className="relative rounded-xl bg-blue-950 p-3 text-white" aria-label="Keranjang"><ShoppingCart size={20} />{cart > 0 && <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-amber-400 text-xs font-bold text-blue-950">{cart}</span>}</button>
          </nav>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="ml-auto rounded-lg p-2 lg:hidden">{mobileOpen ? <X /> : <Menu />}</button>
        </div>
        {mobileOpen && <div className="border-t bg-white px-5 py-4 lg:hidden"><div className="relative mb-4 md:hidden"><Search className="absolute left-3 top-3 text-slate-400" size={18} /><input value={query} onChange={e => setQuery(e.target.value)} className="w-full rounded-xl bg-stone-100 py-3 pl-10 pr-3 text-sm" placeholder="Cari buku..." /></div><div className="flex flex-col gap-3 font-semibold"><a href="#koleksi">Jelajahi</a><a href="#cara-kerja">Cara Kerja</a><button className="text-left">Masuk</button></div></div>}
      </header>

      <main>
        <section className="overflow-hidden bg-blue-950 text-white">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-20">
            <div>
              <span className="mb-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-amber-300">Buku lama, cerita baru.</span>
              <h1 className="max-w-xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">Temukan buku bagus tanpa harga baru.</h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-blue-100">Marketplace buku bekas terpercaya. Lebih hemat untukmu, lebih baik untuk bumi, dan setiap buku mendapat pembaca berikutnya.</p>
              <div className="mt-8 flex flex-wrap gap-3"><button className="flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 font-bold text-blue-950 transition hover:bg-amber-300">Mulai Belanja <ArrowRight size={19} /></button><button className="rounded-xl border border-white/30 px-6 py-3.5 font-bold hover:bg-white/10">Jual Bukumu</button></div>
              <div className="mt-10 flex gap-8 border-t border-white/15 pt-6"><div><strong className="block text-2xl">12.000+</strong><span className="text-sm text-blue-200">Buku tersedia</span></div><div><strong className="block text-2xl">4.800+</strong><span className="text-sm text-blue-200">Pembaca aktif</span></div><div><strong className="block text-2xl">32</strong><span className="text-sm text-blue-200">Kota</span></div></div>
            </div>
            <div className="relative hidden h-96 lg:block">
              <div className="absolute left-24 top-3 h-80 w-56 rotate-6 rounded-2xl bg-amber-400 p-5 shadow-2xl"><div className="flex h-full flex-col justify-between border-2 border-blue-950/20 p-4 text-blue-950"><span className="text-xs font-black uppercase tracking-widest">Pilihan Minggu Ini</span><BookOpen size={54} /><div><div className="text-3xl font-black">Baca.<br/>Jual.<br/>Ulangi.</div><p className="mt-2 text-xs font-semibold">Cerita tidak berhenti di satu pemilik.</p></div></div></div>
              <div className="absolute bottom-5 right-10 w-52 -rotate-6 rounded-2xl bg-white p-5 text-slate-900 shadow-2xl"><div className="mb-3 h-36 rounded-xl bg-blue-100 p-5"><BookOpen className="mx-auto mt-7 text-blue-900" size={55} /></div><div className="text-sm font-bold">Kondisi terverifikasi</div><div className="mt-1 flex text-amber-500"><Star size={15} fill="currentColor"/><Star size={15} fill="currentColor"/><Star size={15} fill="currentColor"/><Star size={15} fill="currentColor"/><Star size={15} fill="currentColor"/></div></div>
            </div>
          </div>
        </section>

        <section id="koleksi" className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 text-sm font-bold uppercase tracking-widest text-amber-600">Pilihan untukmu</p><h2 className="text-3xl font-black tracking-tight">Buku yang baru ditambahkan</h2></div><button className="flex items-center gap-2 self-start rounded-lg border border-stone-300 px-4 py-2.5 text-sm font-bold"><SlidersHorizontal size={17}/> Filter</button></div>
          <div className="mb-8 flex gap-2 overflow-x-auto pb-2">{categories.map(category => <button key={category} onClick={() => setActiveCategory(category)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory === category ? 'bg-blue-950 text-white' : 'border border-stone-300 bg-white hover:border-blue-900'}`}>{category}</button>)}</div>
          {shownBooks.length ? <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">{shownBooks.map(book => <article key={book.id} className="group">
            <div className={`relative mb-4 aspect-[4/5] overflow-hidden rounded-2xl ${book.color}`}><img src={book.cover} alt={`Sampul ${book.title}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/><button onClick={() => toggleFavorite(book.id)} className="absolute right-3 top-3 rounded-full bg-white p-2.5 shadow-md" aria-label="Favorit"><Heart size={18} className={favorites.includes(book.id) ? 'fill-red-500 text-red-500' : 'text-slate-600'} /></button><span className="absolute bottom-3 left-3 rounded-lg bg-white/95 px-2.5 py-1.5 text-xs font-bold text-blue-950 shadow">{book.condition}</span></div>
            <div className="flex items-center gap-1 text-xs text-slate-500"><MapPin size={13}/>{book.city}<span className="ml-auto flex items-center gap-1 text-slate-700"><Star size={13} className="fill-amber-400 text-amber-400"/>{book.rating}</span></div><h3 className="mt-2 truncate text-base font-bold group-hover:text-blue-800">{book.title}</h3><p className="mt-1 text-sm text-slate-500">{book.author}</p><div className="mt-3 flex items-end justify-between gap-2"><div><strong className="block text-lg text-blue-950">{formatPrice(book.price)}</strong><span className="text-xs text-slate-400 line-through">{formatPrice(book.oldPrice)}</span></div><button onClick={() => setCart(value => value + 1)} className="rounded-xl bg-amber-400 p-2.5 text-blue-950 transition hover:bg-amber-300" aria-label="Tambah ke keranjang"><ShoppingCart size={18}/></button></div>
          </article>)}</div> : <div className="rounded-2xl border border-dashed border-stone-300 py-16 text-center"><BookOpen className="mx-auto mb-3 text-slate-300" size={42}/><h3 className="font-bold">Buku tidak ditemukan</h3><p className="mt-1 text-sm text-slate-500">Coba gunakan kata kunci lain.</p></div>}
        </section>

        <section id="cara-kerja" className="bg-amber-50"><div className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="mb-10 max-w-lg"><p className="mb-2 text-sm font-bold uppercase tracking-widest text-amber-700">Mudah dan aman</p><h2 className="text-3xl font-black">Buku berikutnya hanya tiga langkah lagi.</h2></div><div className="grid gap-5 md:grid-cols-3">{[['01','Cari buku favoritmu','Telusuri ribuan buku bekas berdasarkan judul, penulis, kategori, dan kondisi.'],['02','Pesan dengan aman','Lihat detail kondisi, reputasi penjual, lalu lakukan transaksi dengan tenang.'],['03','Baca dan putarkan','Setelah selesai, jual kembali agar cerita terus hidup bersama pembaca baru.']].map(item => <div key={item[0]} className="rounded-2xl border border-amber-200 bg-white p-6"><span className="text-3xl font-black text-amber-400">{item[0]}</span><h3 className="mt-6 text-xl font-bold">{item[1]}</h3><p className="mt-3 leading-relaxed text-slate-600">{item[2]}</p></div>)}</div></div></section>
      </main>

      <footer className="bg-blue-950 text-blue-100"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8"><div className="flex items-center gap-2 font-black text-white"><BookOpen size={20}/> BacaLagi</div><p className="text-sm">© 2026 BacaLagi. Membuat buku terus dibaca.</p><div className="flex gap-5 text-sm"><a href="#">Bantuan</a><a href="#">Privasi</a><a href="#">Ketentuan</a></div></div></footer>
    </div>
  );
}