import { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

function App() {
  const cursorDotRef = useRef(null)
  const cursorRingRef = useRef(null)
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const [formStatus, setFormStatus] = useState('idle')

  const zohoFlowEndpoint = 'https://flow.zoho.in/60071930144/flow/webhook/incoming?zapikey=1001.6547900fa9860a823f68cf702d452fb1.bc7814ef6d43ad2de88a6cc56d01700f&isdebug=false'

  const services = useMemo(
    () => [ 
      {
        name: 'Launch',
        price: 'INR 9,999',
        timeline: '2-3 weeks',
        highlight: false,
        tone: 'Best for single-screen wins',
        items: [
          'One high-converting page',
          'Mobile-first design system',
          'Performance-first build',
          'Basic deployment support',
        ],
      },
      {
        name: 'Prime',
        price: 'INR 24,999',
        timeline: '4-6 weeks',
        highlight: true,
        tone: 'Most chosen for startup launches',
        items: [
          'Multi-page website',
          'Conversion-focused UX',
          'Lead capture + analytics',
          'Deployment + launch checklist',
        ],
      },
      {
        name: 'Studio',
        price: 'INR 39,999',
        timeline: '6-8 weeks',
        highlight: false,
        tone: 'For serious growth and scale',
        items: [
          'Full website + brand kit',
          'E-commerce or booking flow',
          'Custom sections + animations',
          'Priority support for 30 days',
        ],
      },
      {
        name: 'Enterprise',
        price: 'Contact Our Team',
        timeline: 'Specialized timeline',
        highlight: false,
        tone: 'For serious growth and scale for enterprises',
        items: [
          'Tailored solutions for complex needs',
          'Dedicated account management',
          'Custom integrations and features',
          'Ongoing support and optimization',
        ],
      },
    ],
    [],
  )

  const caseStudies = useMemo(
    () => [
      {
        name: 'EliteDrop',
        client: 'G.O.L.D',
        scope: 'Brand + Launch',
        result: 'Good Valuation and 5x revenue in 6 months',
      },
      {
        name: 'Dairy',
        client: 'Undiclosed ',
        scope: 'Product + Launch',
        result: '35% market share gain',
      },
    ],
    [],
  )

  const process = useMemo(
    () => [
      {
        title: 'Discovery',
        detail: 'Executive interviews, market analysis, competitive pressure testing.',
      },
      {
        title: 'Strategy',
        detail: 'Positioning, narrative architecture, brand voice and principles.',
      },
      {
        title: 'Design',
        detail: 'Identity system, experience design, motion language.',
      },
      {
        title: 'Launch',
        detail: 'Go-to-market rollout, messaging cadence, launch assets.',
      },
      {
        title: 'Measure',
        detail: 'Performance diagnostics, iterative refinement, growth cadence.',
      },
    ],
    [],
  )

  const testimonials = useMemo(
    () => [
      {
        quote:
          'Site Radiantturned our category into a stage. The brand now leads every conversation we enter.',
        name: 'Elena Hart',
        role: 'Chief Executive Officer, Meridian Labs',
      },
      {
        quote:
          'Every decision felt deliberate. The strategy rewired how we see our company.',
        name: 'Rafael Cruz',
        role: 'Creative Director, Vanta Group',
      },
      {
        quote:
          'They built momentum where we had plateaus. The launch felt inevitable.',
        name: 'Nadia Khan',
        role: 'Founder, Radius Health',
      },
    ],
    [],
  )

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from('[data-reveal="hero"]', {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.15,
      })

      gsap.from('[data-reveal="section"]', {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '[data-reveal="section"]',
          start: 'top 80%',
        },
      })

      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll('[data-stat]')
        statItems.forEach((item) => {
          const target = Number(item.dataset.stat || 0)
          const obj = { value: 0 }
          gsap.to(obj, {
            value: target,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
            },
            onUpdate: () => {
              item.textContent = obj.value.toFixed(0)
            },
          })
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const dot = cursorDotRef.current
    const ring = cursorRingRef.current
    if (!dot || !ring) return

    const quickDotX = gsap.quickTo(dot, 'x', { duration: 0.2, ease: 'power3' })
    const quickDotY = gsap.quickTo(dot, 'y', { duration: 0.2, ease: 'power3' })
    const quickRingX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' })
    const quickRingY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' })

    const handleMove = (event) => {
      const { clientX, clientY } = event
      quickDotX(clientX)
      quickDotY(clientY)
      quickRingX(clientX)
      quickRingY(clientY)
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div className="app" ref={heroRef}>
      <div className="cursor-dot" ref={cursorDotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={cursorRingRef} aria-hidden="true" />

      <a className="skip-link" href="#content">
        Skip to content
      </a>

      <header className="site-header">
        <div className="logo">Site Radiant</div>
        <nav className="nav">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#team">Team</a>
          <a href="#contact" className="nav-cta">
            Apply
          </a>
        </nav>
      </header>

      <main id="content">
        <section className="hero" id="top">
          <div className="hero-backdrop" aria-hidden="true"></div>
          <div className="section-inner hero-grid">
            <div className="hero-content">
              <p className="eyebrow" data-reveal="hero">
                A startup Site Radiant built for modern brands and founders
              </p>
              <h1 data-reveal="hero">We Are the Startup That Builds Your Brand</h1>
              <p className="hero-copy" data-reveal="hero">
                We are a fast-moving Site Radiant startup delivering brand, product, and
                launch experiences that turn attention into adoption.
              </p>
              <div className="hero-actions" data-reveal="hero">
                <button className="btn primary">See Our Wins</button>
                <button className="btn ghost">View Our Playbook</button>
              </div>
              <div className="hero-meta" data-reveal="hero">
                <span>Founder-led, operator-run</span>
                <span>Lean team, senior execution</span>
                <span>Brand, product, launch</span>
              </div>
            </div>
            <div className="hero-media" data-reveal="hero">
              <div className="media-card">
                <div className="media-video" aria-hidden="true"></div>
                <div className="media-caption">
                  Product launch reel — 00:08
                </div>
              </div>
              <div className="media-card floating">
                <div className="media-stat">
                  <span>32+</span>
                  <span>Startup launches shipped</span>
                </div>
                <div className="media-stat">
                  <span>4.2x</span>
                  <span>Average activation lift</span>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-indicator">Scroll</div>
        </section>

        <section className="quick-inquiry" data-reveal="section">
          <div className="section-inner">
            <div className="section-head">
              <p className="eyebrow">Quick inquiry</p>
              <h2>Tell us what you want to build.</h2>
            </div>
            <div className="contact-grid">
              <div className="contact-copy">
                <p>
                  Share your requirements and we will reply within 24-48 hours with
                  a clear plan, timeline, and quote.
                </p>
                <div className="contact-details">
                  <span>hello@keepitblank.studio</span>
                  <span>+91 98765 43210</span>
                  <span>India · Remote</span>
                </div>
              </div>
              <form
                className="contact-form"
                onSubmit={(event) => {
                  event.preventDefault()
                  if (!zohoFlowEndpoint.includes('flow.zoho.in')) {
                    setFormStatus('error')
                    return
                  }

                  setFormStatus('loading')
                  const formData = new FormData(event.currentTarget)
                  const payload = new URLSearchParams(formData)
                  const sent = navigator.sendBeacon(zohoFlowEndpoint, payload)

                  if (sent) {
                    setFormStatus('success')
                    event.currentTarget.reset()
                    return
                  }

                  fetch(zohoFlowEndpoint, {
                    method: 'POST',
                    body: formData,
                    mode: 'no-cors',
                  })
                    .then(() => {
                      setFormStatus('success')
                      event.currentTarget.reset()
                    })
                    .catch(() => {
                      setFormStatus('error')
                    })
                }}
              >
                <label>
                  Full name
                  <input name="name" type="text" placeholder="Your name" required />
                </label>
                <label>
                  Phone
                  <input name="phone" type="tel" placeholder="+91 98765 43210" required />
                </label>
                <label>
                  Email
                  <input name="email" type="email" placeholder="you@company.com" required />
                </label>
                <label>
                  Service needed
                  <select name="servicesNeeded" required>
                    <option value="">Select service</option>
                    <option>Frontend website</option>
                    <option>Backend development</option>
                    <option>Full stack build</option>
                    <option>E-commerce store</option>
                    <option>SaaS web app</option>
                  </select>
                </label>
                <label>
                  Budget range
                  <select name="budgetRange" required>
                    <option value="">Select range</option>
                    <option>Under INR 15,000</option>
                    <option>INR 15,000-35,000</option>
                    <option>INR 35,000-75,000</option>
                    <option>INR 75,000+</option>
                  </select>
                </label>
                <label className="full">
                  Project details
                  <textarea
                    name="projectDetails"
                    placeholder="What do you want to build?"
                    rows="4"
                  />
                </label>
                <button className="btn primary full" type="submit" disabled={formStatus === 'loading'}>
                  {formStatus === 'loading' ? 'Sending...' : 'Get a Free Quote'}
                </button>
                {formStatus === 'success' && (
                  <p className="form-status success">
                    <span className="status-icon" aria-hidden="true">✓</span>
                    Response sent successfully.
                  </p>
                )}
                {formStatus === 'error' && (
                  <p className="form-status error">
                    Something went wrong. Please email us at hello@keepitblank.studio.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>

        <section className="value" data-reveal="section">
          <div className="section-inner">
            <div className="section-head">
              <p className="eyebrow">Why brands choose us</p>
              <h2>We turn brand truth into market momentum.</h2>
            </div>
            <div className="value-grid">
              <article className="value-card">
                <h3>Startup-born strategy</h3>
                <p>We move like founders: fast decisions, clear narrative, bold GTM.</p>
              </article>
              <article className="value-card">
                <h3>Launch-ready systems</h3>
                <p>Brand, product, and marketing assets built to ship fast.</p>
              </article>
              <article className="value-card">
                <h3>Data-backed creative</h3>
                <p>We pair narrative craft with measurable growth outcomes.</p>
              </article>
              <article className="value-card">
                <h3>Senior, embedded team</h3>
                <p>Clients get senior leadership, not rotating junior crews.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="work" id="work" data-reveal="section">
          <div className="section-inner">
            <div className="section-head">
              <p className="eyebrow">Featured case studies</p>
              <h2>Wins with measurable outcomes.</h2>
            </div>
            <div className="work-grid">
              {caseStudies.map((study) => (
                <article className="work-card" key={study.name}>
                  <div className="work-visual" aria-hidden="true"></div>
                  <div className="work-body">
                    <h3>{study.name}</h3>
                    <p>{study.client}</p>
                    <div className="work-meta">
                      <span>{study.scope}</span>
                      <span>{study.result}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="services" id="services" data-reveal="section">
          <div className="section-inner">
            <div className="section-head pricing-head">
              <p className="eyebrow">Service packages</p>
              <p className="pricing-eyebrow">Pick a plan. Start today.</p>
              <h2>Our Packages.</h2>
            </div>
            <div className="service-grid">
              {services.map((service) => (
                <article
                  className={`service-card ${service.highlight ? 'featured' : ''}`}
                  key={service.name}
                >
                  {service.highlight && (
                    <span className="flag">Most Popular</span>
                  )}
                  {service.name === 'Legacy' && (
                    <span className="flag elite">Elite / Exclusive</span>
                  )}
                  <h3>{service.name}</h3>
                  <p className="service-price">{service.price}</p>
                  <p className="service-timeline">Delivery: {service.timeline}</p>
                  <p className="service-tone">{service.tone}</p>
                  <ul>
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <button className="btn secondary">Apply for Consultation</button>
                </article>
              ))}
            </div>
            <p className="service-note">
              Add-ons available: e-commerce, SaaS, portfolio sites, booking systems,
              CRM integrations, and SEO. Final pricing depends on scope.
            </p>
          </div>
        </section>

        <section className="process" id="process" data-reveal="section">
          <div className="section-inner">
            <div className="section-head">
              <p className="eyebrow">Methodology</p>
              <h2>From insight to launch in focused sprints.</h2>
            </div>
            <div className="process-track">
              {process.map((step, index) => (
                <div className="process-step" key={step.title}>
                  <span className="step-index">0{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="stats" ref={statsRef} data-reveal="section">
          <div className="section-inner stats-grid">
            <div className="stat">
              <span data-stat="10">10</span>
              <p>Awards for innovation</p>
            </div>
            <div className="stat">
              <span data-stat="100">100</span>
              <p>Transformations delivered</p>
            </div>
            <div className="stat">
              <span data-stat="92">92</span>
              <p>Client retention rate</p>
            </div>
            <div className="stat">
              <span data-stat="48">48</span>
              <p>Hours average response time</p>
            </div>
          </div>
        </section>

        <section className="testimonials" data-reveal="section">
          <div className="section-inner">
            <div className="section-head">
              <p className="eyebrow">Trust signals</p>
              <h2>Proof of traction, not promises.</h2>
            </div>
            <div className="testimonial-grid">
              {testimonials.map((item) => (
                <article className="testimonial-card" key={item.name}>
                  <p>“{item.quote}”</p>
                  <div>
                    <span>{item.name}</span>
                    <span>{item.role}</span>
                  </div>
                </article>
              ))}
            </div>
            <div className="logo-row">
              <span>Flux</span>
              <span>Helio</span>
              <span>Signal</span>
              <span>Vertex</span>
              <span>Orbit</span>
            </div>
          </div>
        </section>

        <section className="team" id="team" data-reveal="section">
          <div className="section-inner">
            <div className="section-head">
              <p className="eyebrow">The studio</p>
              <h2>Startup energy with senior leadership.</h2>
            </div>
            <div className="team-grid">
              {[
                'Ava Laurent — Creative Director',
                'Miles Rowe — Strategy Lead',
                'Naomi Park — Design Systems',
                'Jonas Vale — Experience Architect',
              ].map((member) => (
                <div className="team-card" key={member}>
                  <div className="team-photo" aria-hidden="true"></div>
                  <p>{member}</p>
                </div>
              ))}
            </div>
            <p className="team-note">
              We operate as a boutique studio. Senior leaders touch every
              deliverable.
            </p>
          </div>
        </section>

        <section className="contact" id="contact" data-reveal="section">
          <div className="section-inner">
            <div className="section-head">
              <p className="eyebrow">Apply for a consultation</p>
              <h2>Limited spots for 2026.</h2>
            </div>
            <div className="contact-grid">
              <div className="contact-copy">
                <p>
                  Tell us what you need. We will reply within 24-48 hours with a
                  clear plan and quote.
                </p>
                <div className="contact-details">
                  <span>hello@keepitblank.studio</span>
                  <span>+91 98765 43210</span>
                  <span>India · Remote</span>
                </div>
              </div>
              <form className="contact-form">
                <label>
                  Full name
                  <input type="text" placeholder="Your name" required />
                </label>
                <label>
                  Phone
                  <input type="tel" placeholder="+91 98765 43210" required />
                </label>
                <label>
                  Email
                  <input type="email" placeholder="you@company.com" required />
                </label>
                <label>
                  Service needed
                  <select required>
                    <option value="">Select service</option>
                    <option>Frontend website</option>
                    <option>Backend development</option>
                    <option>Full stack build</option>
                    <option>E-commerce store</option>
                    <option>SaaS web app</option>
                  </select>
                </label>
                <label>
                  Budget range
                  <select required>
                    <option value="">Select range</option>
                    <option>Under INR 15,000</option>
                    <option>INR 15,000-35,000</option>
                    <option>INR 35,000-75,000</option>
                    <option>INR 75,000+</option>
                  </select>
                </label>
                <label className="full">
                  Project details
                  <textarea
                    placeholder="What do you want to build?"
                    rows="4"
                  />
                </label>
                <button className="btn primary full" type="submit">
                  Get a Free Quote
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="section-inner footer-grid">
          <div>
            <div className="logo">Site Radiant</div>
            <p>Elite creative studio for visionary brands.</p>
          </div>
          <div className="footer-links">
            <a href="#work">Case Studies</a>
            <a href="#services">Packages</a>
            <a href="#process">Methodology</a>
            <a href="#contact">Apply</a>
          </div>
          <div className="footer-meta">
            <span>LinkedIn</span>
            <span>Instagram</span>
            <span>Twitter</span>
            <span>© 2026 Site Radiant</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
