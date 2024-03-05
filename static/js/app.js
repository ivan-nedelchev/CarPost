document
    .getElementById('cars')
    .addEventListener('click', (e) => {
        if (e.target.classList.contains('more')) {
            const description = e.target.parentElement.querySelector('.description');
            if (description.style.display === 'block') {
                description.style.display = 'none';
                e.target.textContent = 'Show description';
            } else {
                e.target.textContent = 'Hide description';
                description.style.display = 'block';
            }
        }
    });