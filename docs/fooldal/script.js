// Year
document.getElementById('year').textContent = new Date().getFullYear()

// Mobile nav
const toggle = document.querySelector('.nav__toggle')
const menu = document.getElementById('menu')
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('show')
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false')
  })
}

// Theme toggle with persistence
const themeToggle = document.getElementById('themeToggle')
const root = document.documentElement
const userPref = localStorage.getItem('theme')
if (userPref) root.classList.toggle('light', userPref === 'light')
themeToggle?.addEventListener('click', () => {
  const isLight = root.classList.toggle('light')
  localStorage.setItem('theme', isLight ? 'light' : 'dark')
})

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal')
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in')
      io.unobserve(e.target)
    }
  })
}, { threshold: 0.18 })
reveals.forEach(el => io.observe(el))

// Subtle 3D tilt on mouse move
document.querySelectorAll('.tilt').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    const rx = ((y / r.height) - 0.5) * -12
    const ry = ((x / r.width) - 0.5) * 12
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`
  })
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0)'
  })
})

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href')
    if (id.length > 1) {
      e.preventDefault()
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  })
})

// Contact form: simple honeypot & fallback
const form = document.querySelector('form.contact')
form?.addEventListener('submit', (e) => {
  const hp = form.querySelector('input[name="_gotcha"]')
  if (hp && hp.value) {
    e.preventDefault() // ignore bots
    return
  }
  if (form.action === '#') {
    // Use mailto fallback
    e.preventDefault()
    const name = encodeURIComponent(form.name.value)
    const email = encodeURIComponent(form.email.value)
    const message = encodeURIComponent(form.message.value)
    const mailto = `${form.dataset.fallback}?subject=Új megkeresés – ${name}&body=${message}%0A%0AElérhetőség: ${email}`
    window.location.href = mailto
  }
})
