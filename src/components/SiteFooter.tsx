import { Link } from 'react-router-dom';

export default function SiteFooter() {
  return (
    <footer className="py-20 px-6 lg:px-10 bg-granite border-t border-stone-gold/10" role="contentinfo">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-16">
          <div className="max-w-sm">
            <Link to="/" className="font-display text-[20px] font-medium tracking-tight text-stone-gold block mb-4 no-underline">Countertop World</Link>
            <p className="text-[13px] text-cool-gray font-light leading-relaxed mb-4">Family-owned stone fabrication since 2016. Two Arkansas locations. Everything cut, finished, and installed by our crew.</p>
            <p className="font-mono text-[11px] text-cool-gray tracking-[3px] uppercase mb-4">Strength. Set in Stone.</p>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/countertopworld/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-cool-gray hover:text-stone-gold transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg></a>
              <a href="https://www.facebook.com/countertopworld/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-cool-gray hover:text-stone-gold transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-16 text-[13px] font-light text-cool-gray">
            <address className="not-italic"><h4 className="font-mono text-stone-gold/80 font-medium mb-4 text-[10px] tracking-[3px] uppercase">Northwest Arkansas</h4><p className="mb-1">1706 Commerce Dr</p><p className="mb-3">Rogers, AR 72756</p><a href="tel:+14799009119" className="text-vein-white font-medium hover:text-stone-gold transition-colors">(479) 900-9119</a></address>
            <address className="not-italic"><h4 className="font-mono text-stone-gold/80 font-medium mb-4 text-[10px] tracking-[3px] uppercase">Central Arkansas</h4><p className="mb-1">26096 Interstate 30</p><p className="mb-3">Bryant, AR 72022</p><a href="tel:+15014818117" className="text-vein-white font-medium hover:text-stone-gold transition-colors">(501) 481-8117</a></address>
            <div><h4 className="font-mono text-stone-gold/80 font-medium mb-4 text-[10px] tracking-[3px] uppercase">Hours</h4><p className="mb-1">Monday – Friday</p><p className="mb-1">8:00 am – 5:00 pm</p><p className="mt-3">Saturday 9am–1pm (Bryant)</p><p className="mb-1">Saturday by appt (Rogers)</p></div>
          </div>
        </div>
        <nav aria-label="Footer navigation" className="pb-10 mb-10 border-b border-stone-gold/10">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[12px] text-cool-gray font-light list-none p-0 m-0">
            <li><Link to="/" className="hover:text-vein-white transition-colors no-underline">Home</Link></li>
            <li><Link to="/stones/engineered-quartz" className="hover:text-vein-white transition-colors no-underline">Quartz</Link></li>
            <li><Link to="/stones/natural-granite" className="hover:text-vein-white transition-colors no-underline">Granite</Link></li>
            <li><Link to="/stones/marble" className="hover:text-vein-white transition-colors no-underline">Marble</Link></li>
            <li><Link to="/stones/quartzite" className="hover:text-vein-white transition-colors no-underline">Quartzite</Link></li>
            <li><Link to="/stones/porcelain" className="hover:text-vein-white transition-colors no-underline">Porcelain</Link></li>
            <li><Link to="/stones/soapstone-onyx" className="hover:text-vein-white transition-colors no-underline">Soapstone &amp; Onyx</Link></li>
            <li><Link to="/builders" className="hover:text-vein-white transition-colors no-underline">Builders</Link></li>
            <li><Link to="/designers" className="hover:text-vein-white transition-colors no-underline">Designers</Link></li>
            <li><Link to="/packages" className="hover:text-vein-white transition-colors no-underline">Packages</Link></li>
            <li><Link to="/book" className="hover:text-vein-white transition-colors no-underline">Book a Visit</Link></li>
            <li><Link to="/blog" className="hover:text-vein-white transition-colors no-underline">Blog</Link></li>
          </ul>
        </nav>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-cool-gray font-light">
          <p>&copy; {new Date().getFullYear()} Countertop World, LLC. All rights reserved.</p>
          <div className="flex items-center gap-6"><span>BBB A+ Accredited</span><span className="text-stone-gold/30">·</span><span>4.4 ★ · 109+ Reviews</span><span className="text-stone-gold/30">·</span><span>Family-owned since 2016</span></div>
        </div>
      </div>
    </footer>
  );
}
