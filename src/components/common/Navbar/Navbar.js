import Link from 'next/link';

export default function Navbar() {
  return (
    <nav>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/products">Products</Link></li>
        <li><Link href="/cart">Cart</Link></li>
      </ul>
    </nav>
  );
} 