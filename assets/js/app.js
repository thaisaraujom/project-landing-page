document.addEventListener('DOMContentLoaded', () => {
    // Define navigation links
    const navLinks = [
        { href: '#home', text: 'Home', id: 'home' },
        { href: '#about', text: 'About', id: 'about' },
        { href: '#features', text: 'Features', id: 'features' },
        { href: '#contact', text: 'Contact', id: 'contact' }
    ];

    // Get the container for navbar links
    const navbarLinks = document.getElementById('navbar-links');

    // Create navigation links using forEach for array iteration
    navLinks.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = link.text;
        a.href = link.href;
        a.id = `nav-${link.id}`;
        li.appendChild(a);
        navbarLinks.appendChild(li);
    });

    /**
    * Handles click events on navigation links to smoothly scroll to the corresponding section.
    * @description Scrolls the page to the section referenced in the clicked navigation link's href attribute.
    * @param {Event} event - The click event object.
    */
    const handleNavLinkClick = event => {
        if (event.target.tagName === 'A' && event.target.getAttribute('href').startsWith('#')) {
            event.preventDefault();
            // Get the target section using href attribute
            const targetId = event.target.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Calculate navbar height
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                // Adjust target section's offsetTop considering the navbar height
                const offsetTop = targetSection.offsetTop - navbarHeight;
                // Scroll to the target section using smooth behavior
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    };

    // Add click event listener for each link in the navigation using forEach
    Array.from(navbarLinks.children).forEach(child => {
        child.firstElementChild.addEventListener('click', handleNavLinkClick);
    });

    /**
    * Highlights the current section in the navbar based on scroll position.
    * @description Adds an 'active' class to the navbar link corresponding to the section currently in the viewport. Removes the 'active' class from all other navbar links.
    */
    const highlightCurrentSection = () => {
        let sectionFound = false;

        // Iterate over each section and check if it is in the viewport
        navLinks.forEach(link => {
            const section = document.getElementById(link.id);
            if (section) {
                const rect = section.getBoundingClientRect();
                // Check if the section is in the viewport. Considered visible if the 
                // top is near the viewport's top but not too far down
                if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                    document.getElementById(`nav-${link.id}`).classList.add('active');
                    sectionFound = true;
                } else {
                    document.getElementById(`nav-${link.id}`).classList.remove('active');
                }
            }
        });

        // Optionally, remove 'active' class from all links if no section matches
        if (!sectionFound) {
            Array.from(navbarLinks.children).forEach(child => {
                child.firstElementChild.classList.remove('active');
            });
        }
    };

    // Add scroll event listener to highlight the current section
    window.addEventListener('scroll', highlightCurrentSection);
});
