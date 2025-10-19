const toggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.menu_ham');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    nav.classList.toggle('active');
  });
