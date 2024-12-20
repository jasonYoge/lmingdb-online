import logoImg from '@/assets/logo.jpg';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
} from '@nextui-org/react';

export function Header() {
  return (
    <Navbar className="px-0 md:px-6 py-2 shadow-md" maxWidth="full" isBordered>
      <NavbarBrand>
        <div className='w-[174px] h-[48px]'>
          <img src={logoImg} />
        </div>
      </NavbarBrand>
      <NavbarContent className='flex-1' justify="center"></NavbarContent>
      <NavbarContent justify="end"></NavbarContent>
    </Navbar>
  );
}