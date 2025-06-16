
import Link from "next/link";
const Header = () => {
  return (
    <div className="header header--1" data-sticky="true">

      <div className="header__actions" style={{ backgroundColor: '#1677FF' }}>
        <div style={{ fontSize: '20px', display: 'flex', gap: '10px' }}>
          <Link href="/login">Login</Link>
          <Link href="/register">Registration</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
