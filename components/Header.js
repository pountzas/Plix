import Image from 'next/image';

function Header() {
  return (
    <header>
      <h1 className='bg-[#232B35] my-3 mx-2 rounded-md p-3 text-white font-semibold font'>
        <Image src='/../public/plix-logo-w.png' alt='' height={25} width={60} />
      </h1>
    </header>
  );
}

export default Header;
