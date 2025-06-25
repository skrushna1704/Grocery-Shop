import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside style={{ width: '200px', padding: '1rem', background: '#f3f4f6' }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/products">Products</Link></li>
        <li><Link href="/categories">Categories</Link></li>
      </ul>
    </aside>
  );
} 