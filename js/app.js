async function includeHTML() {
  const includes = document.querySelectorAll('[data-include]');
  for (const el of includes) {
    const file = el.dataset.include;
    const response = await fetch(file);
    const html = await response.text();
    el.innerHTML = html;
  }
  lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', async () => {
            await includeHTML();

            const navLinks = document.querySelectorAll('.nav-link');
            const views = {
                workspace: document.getElementById('view-workspace'),
                catalog: document.getElementById('view-catalog'),
                profile: document.getElementById('view-profile'),
                suggest: document.getElementById('view-suggest')
            };

            // --- Navigation Logic ---
            function switchView(viewName) {
                // Update nav link styles
                navLinks.forEach(link => {
                    link.classList.remove('bg-indigo-50', 'text-indigo-700', 'font-semibold');
                    link.classList.add('text-slate-600', 'font-medium', 'hover:bg-slate-100');
                });
                const activeLink = document.getElementById(`nav-${viewName.split('-')[1]}`);
                if(activeLink){
                    activeLink.classList.add('bg-indigo-50', 'text-indigo-700', 'font-semibold');
                    activeLink.classList.remove('text-slate-600', 'font-medium', 'hover:bg-slate-100');
                }

                // Show/hide views
                Object.values(views).forEach(view => view.style.display = 'none');
                if (views[viewName.split('-')[1]]) {
                   views[viewName.split('-')[1]].style.display = 'block';
                }
            }

            document.getElementById('nav-workspace').addEventListener('click', (e) => {
                e.preventDefault();
                switchView('view-workspace');
            });

            document.getElementById('nav-catalog').addEventListener('click', (e) => {
                e.preventDefault();
                switchView('view-catalog');
            });

            document.getElementById('nav-suggest').addEventListener('click', (e) => {
                e.preventDefault();
                switchView('view-suggest');
            });
            
            // --- Catalog to Profile Logic ---
            document.querySelectorAll('.app-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    // Clicks on the button shouldn't navigate the whole card
                    if (e.target.tagName.toLowerCase() !== 'button') {
                       e.preventDefault();
                       switchView('view-profile');
                    }
                });
            });


            // --- Modal Logic ---
            const requestModal = document.getElementById('request-modal');
            const requestAccessBtn = document.getElementById('request-access-btn');
            const closeModalBtn = document.getElementById('close-modal-btn');
            const requestForm = document.getElementById('request-form');

            requestAccessBtn.addEventListener('click', () => {
                requestModal.classList.remove('hidden');
                requestModal.classList.add('flex');
            });

            closeModalBtn.addEventListener('click', () => {
                requestModal.classList.add('hidden');
                requestModal.classList.remove('flex');
            });
            
            requestModal.addEventListener('click', (e) => {
                if (e.target === requestModal) {
                    requestModal.classList.add('hidden');
                    requestModal.classList.remove('flex');
                }
            });

            requestForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Request submitted!');
                requestModal.classList.add('hidden');
                requestModal.classList.remove('flex');
                
                // Simulate going back to workspace to see the new request
                switchView('view-workspace');
                // You would typically update the UI with the new pending request here.
                // For this demo, a static pending request for Miro is already shown.
            });
            
            // Initial view
            switchView('view-workspace');
        });