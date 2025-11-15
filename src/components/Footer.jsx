import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-20 border-t border-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-2">Splitz</p>
            <h3 className="text-2xl font-semibold mb-3">Student Housing Studio</h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              Conceptual tooling for student housing teams, founders, and campus operators.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white text-sm tracking-[0.3em] uppercase">For Students</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-accent-500 transition font-semibold">Find Housing</a></li>
              <li><a href="#" className="hover:text-accent-500 transition font-semibold">Find Roommates</a></li>
              <li><a href="#" className="hover:text-accent-500 transition font-semibold">Safety Tips</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white text-sm tracking-[0.3em] uppercase">For Landlords</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-accent-500 transition font-semibold">List Your Property</a></li>
              <li><a href="#" className="hover:text-accent-500 transition font-semibold">Pricing</a></li>
              <li><a href="#" className="hover:text-accent-500 transition font-semibold">Resources</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white text-sm tracking-[0.3em] uppercase">Company</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-accent-500 transition font-semibold">About Us</a></li>
              <li><a href="#" className="hover:text-accent-500 transition font-semibold">Contact</a></li>
              <li><a href="#" className="hover:text-accent-500 transition font-semibold">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-900 mt-10 pt-8 text-center text-gray-500 text-sm">
          <p>© 2024 Splitz. Designed for academic demos and prototype showcases.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
