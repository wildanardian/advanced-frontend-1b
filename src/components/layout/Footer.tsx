import logo from '@/assets/images/logo/logo-new.png';

export function Footer() {
  return (
    <footer className="page-shell border-outline-border flex flex-col gap-10 border-t bg-background-page-header px-5 py-5 lg:flex-row lg:items-start lg:justify-between lg:px-20 lg:py-15">
      {/* <!-- Left Section: Logo & Copyright --> */}
      <div className="space-y-3 lg:my-auto lg:flex-none">
        <img
          src={logo}
          alt="Logo"
          className="h-[24.75] w-21 lg:h-11 lg:w-40.75"
        />
        <p className="text-xs text-[#E7E3FC99] lg:text-base">
          @2023 Chill All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}