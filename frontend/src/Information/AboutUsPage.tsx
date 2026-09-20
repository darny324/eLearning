const assets = {
  hero: "https://www.figma.com/api/mcp/asset/f974727b-11f9-43f0-afbd-58f5c79524f7.png",
  story:
    "https://www.figma.com/api/mcp/asset/e550514b-10d8-4e38-9c2e-3edb7d125d3b.png",

  team1:
    "https://www.figma.com/api/mcp/asset/5274bb32-57f8-4c50-9f57-91b984953c3d.png",
  team2:
    "https://www.figma.com/api/mcp/asset/832924be-7891-43ad-8af1-cb8fc76a5a13.png",
  team3:
    "https://www.figma.com/api/mcp/asset/9cd22e53-5149-46e7-aed1-8509f83fc979.png",
  team4:
    "https://www.figma.com/api/mcp/asset/1fc19669-7e60-4a43-92c8-944bf4cc6d52.png",

  testimonial1:
    "https://www.figma.com/api/mcp/asset/1972b486-1874-41de-833c-b9e434585392.png",
  testimonial2:
    "https://www.figma.com/api/mcp/asset/54f728b1-d5a0-4200-a704-dbbe8d8de8f4.png",
  testimonial3:
    "https://www.figma.com/api/mcp/asset/ad321104-7282-42ab-8657-31dc29b00164.png",

  globe:
    "https://www.figma.com/api/mcp/asset/38a9275a-14d6-46d3-8b9c-f61f8146595a.svg",
  eye:
    "https://www.figma.com/api/mcp/asset/08eed1ca-88e5-4d76-a66d-f5ddae255f1f.svg",
  cpu:
    "https://www.figma.com/api/mcp/asset/8fae0092-6555-4a9d-a728-05d46c8449d4.svg",
  key:
    "https://www.figma.com/api/mcp/asset/252869c6-5f2d-482c-bb3f-804c7cab8524.svg",
  award:
    "https://www.figma.com/api/mcp/asset/87c69614-e27c-4626-bc78-ad62f926b5a9.svg",
  users:
    "https://www.figma.com/api/mcp/asset/309fbdcb-3e2d-48e1-b16f-bfc7e9ada719.svg",
  quote:
    "https://www.figma.com/api/mcp/asset/1c9ab828-81d4-4e6c-b756-e5980b449b33.svg",
};

const stats = [
  { value: "50K+", label: "Active Students" },
  { value: "200+", label: "Premium Courses" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "35+", label: "Countries Supported" },
];

const team = [
  {
    image: assets.team1,
    name: "Dr. Helen Vance",
    role: "Chief Executive & Founder",
    description:
      "PhD in Computer Science from MIT. Spent 10 years optimizing high-performance virtual learning structures.",
  },
  {
    image: assets.team2,
    name: "Aidan Korchev",
    role: "Chief Product Officer",
    description:
      "Former Principal AI Designer at major tech firm. Dedicated to building smooth virtual research benches.",
  },
  {
    image: assets.team3,
    name: "Marcus Sterling",
    role: "Head of Curriculum",
    description:
      "Award-winning university professor. Structuring learning pathways into highly effective modules.",
  },
  {
    image: assets.team4,
    name: "Sophia Chen",
    role: "Lead Learning Researcher",
    description:
      "Cognitive scientist mapping knowledge retention behaviors to engineer optimal lesson lengths.",
  },
];

const values = [
  {
    icon: assets.cpu,
    title: "Innovation",
    color: "border-blue-500",
    iconColor: "bg-blue-500/10",
    description:
      "Developing active sandboxes and integrating live AI mentors to replace static traditional learning.",
  },
  {
    icon: assets.key,
    title: "Accessibility",
    color: "border-teal-500",
    iconColor: "bg-teal-500/10",
    description:
      "Structuring low-bandwidth assets and sliding tuition ranges so top tier learning is open to all.",
  },
  {
    icon: assets.award,
    title: "Excellence",
    color: "border-violet-500",
    iconColor: "bg-violet-500/10",
    description:
      "Working with international industrial giants to design curricula matching absolute current workflows.",
  },
  {
    icon: assets.users,
    title: "Community",
    color: "border-blue-500",
    iconColor: "bg-blue-500/10",
    description:
      "Creating persistent regional peer clusters so digital learning ceases to be a solitary process.",
  },
];

const testimonials = [
  {
    image: assets.testimonial1,
    name: "Daniela Petrova",
    role: "Systems Engineer, DataStream",
    quote:
      "The modular systems and AI code checkers pushed me past standard bootcamps. I went from novice to junior systems engineer in exactly six months.",
  },
  {
    image: assets.testimonial2,
    name: "Zachary Miller",
    role: "DevOps Specialist, Voxel Labs",
    quote:
      "Persistent peer clusters made Aetheria.edu feel like a real university campus. I still collaborate daily with the team I met in the cloud laboratory.",
  },
  {
    image: assets.testimonial3,
    name: "Kenji Sato",
    role: "Full-Stack Builder, OrbitTech",
    quote:
      "The curriculum here is designed around actual industrial pipelines. There was zero fluff, allowing me to transition to full-stack tech immediately.",
  },
];

export default function AboutUsPage() {
  return (
    <main className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute -right-72 -top-40 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[120px]" />

      {/* Hero */}
      <section className="relative mx-auto max-w-[1440px] px-6 pb-24 pt-32 md:px-12 lg:px-20 lg:pb-30 lg:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <div>
            <span className="inline-flex rounded-full border border-blue-500 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-blue-500">
              Next-Gen Learning Platform
            </span>

            <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-[56px]">
              Empowering Learners{" "}
              <span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
                Worldwide
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
              Breaking traditional educational barriers through a state-of-the-art
              interactive ecosystem. We combine premium instruction with
              futuristic AI integration to train the global workforce.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button className="rounded-lg bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-400">
                Explore Platform
              </button>

              <button className="rounded-lg border border-slate-800 px-6 py-3.5 text-sm font-semibold text-slate-400 transition hover:border-slate-600 hover:text-white">
                Watch Vision Video
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-blue-500 shadow-[0_12px_40px_rgba(59,130,246,0.13)]">
            <img
              src={assets.hero}
              alt="Students learning in a futuristic digital environment"
              className="h-[280px] w-full object-cover sm:h-[380px] lg:h-[420px]"
            />
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="border-t border-slate-800">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-6 py-20 md:px-12 lg:grid-cols-[515px_1fr] lg:gap-14 lg:px-20 lg:py-[120px]">
          <div className="overflow-hidden rounded-[20px] border border-violet-500">
            <img
              src={assets.story}
              alt="A researcher working with futuristic technology"
              className="h-[280px] w-full object-cover sm:h-[380px]"
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-violet-500">
              Our Genesis
            </p>

            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Born in a Lab, Scaled for the Universe
            </h2>

            <p className="mt-6 text-base leading-7 text-slate-400">
              In 2022, a small group of researchers and digital educators
              noticed a widening gap between academia and real-world tech
              industries. The static textbooks and boring recorded lectures of
              the old web were failing.
            </p>

            <p className="mt-5 text-base leading-7 text-slate-400">
              We engineered a platform from scratch. Rooted in adaptive AI
              learning technology, virtual science benches, and structured
              communities, we transformed digital education from a passive
              viewing task to an immersive experience.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-t border-slate-800">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 lg:px-20 lg:py-[120px]">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-blue-500 bg-slate-900/40 p-8 shadow-[0_16px_32px_rgba(59,130,246,0.13)] sm:p-12">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                <img
                  src={assets.globe}
                  alt=""
                  className="h-6 w-6"
                />
              </div>

              <h2 className="mt-6 text-3xl font-bold">Our Mission</h2>

              <p className="mt-5 leading-7 text-slate-400">
                To democratize technical mastery by constructing an interactive
                portal that adaptively routes every learner to their highest
                career potential, regardless of geographical boundary or
                economic status.
              </p>
            </div>

            <div className="rounded-3xl border border-teal-500 bg-slate-900/40 p-8 shadow-[0_16px_32px_rgba(20,184,166,0.13)] sm:p-12">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10">
                <img
                  src={assets.eye}
                  alt=""
                  className="h-6 w-6"
                />
              </div>

              <h2 className="mt-6 text-3xl font-bold">Our Vision</h2>

              <p className="mt-5 leading-7 text-slate-400">
                To serve as the default neural pathway for global knowledge
                transfer, establishing a state where high-demand skills are
                unlocked seamlessly and instantly via modular digital academies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-slate-800">
        <div className="mx-auto grid max-w-[1440px] gap-5 px-6 py-16 sm:grid-cols-2 md:px-12 lg:grid-cols-4 lg:gap-8 lg:px-20 lg:py-24">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 text-center shadow-[0_8px_24px_rgba(59,130,246,0.08)]"
            >
              <p className="text-4xl font-extrabold sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="border-t border-slate-800">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 lg:px-20 lg:py-[120px]">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-500">
              Founding Minds
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Driven by Educators, Scientists, and Creators
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8">
            {team.map((member) => (
              <article
                key={member.name}
                className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-[260px] w-full object-cover"
                />

                <div className="p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium uppercase tracking-wide text-teal-500">
                    {member.role}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-slate-400">
                    {member.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-slate-800">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 lg:px-20 lg:py-[120px]">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-violet-500">
              Core Pillars
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              How We Shape the Future
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl border ${value.color} ${value.iconColor}`}
                >
                  <img
                    src={value.icon}
                    alt=""
                    className="h-6 w-6"
                  />
                </div>

                <h3 className="mt-5 text-2xl font-semibold">{value.title}</h3>

                <p className="mt-4 text-[15px] leading-6 text-slate-400">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-slate-800">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 lg:px-20 lg:py-[120px]">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-500">
              Success Stories
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Loved by Ambitious Learners Globally
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-8"
              >
                <img
                  src={assets.quote}
                  alt=""
                  className="h-8 w-8"
                />

                <p className="mt-6 flex-1 leading-7 text-slate-400">
                  "{testimonial.quote}"
                </p>

                <div className="mt-7 flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-semibold text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-[13px] text-slate-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="border-t border-slate-800">
        <div className="mx-auto max-w-[1440px] px-6 py-16 text-center md:px-12 lg:px-20 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Trusted & Aligned with Industry Pillars
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 text-lg font-bold text-slate-500 sm:text-xl lg:gap-x-20">
            <span>NEXUS TECH</span>
            <span>VORTEX LABS</span>
            <span>APEX ANALYTICS</span>
            <span>CHRONOS.AI</span>
            <span>QUANTUM.EDU</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-slate-800">
        <div className="pointer-events-none absolute left-1/2 top-12 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-[1440px] px-6 py-20 md:px-12 lg:px-20 lg:py-[120px]">
          <div className="rounded-3xl border border-blue-500 bg-slate-900/40 px-6 py-16 text-center sm:px-12 lg:px-20 lg:py-20">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Start Your Learning Journey Today
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              Join 50,000+ engineers, creators, and analysts unlocking
              high-demand career pathways via modular digital environments.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded-lg bg-teal-500 px-8 py-4 text-base font-bold text-slate-950 transition hover:bg-teal-400">
                Create Free Account
              </button>

              <button className="rounded-lg border border-slate-700 px-8 py-4 text-base font-bold text-white transition hover:border-slate-500">
                Consult a Mentor
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800">
        <div className="mx-auto max-w-[1440px] px-6 pb-10 pt-16 md:px-12 lg:px-20 lg:pt-20">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-500 text-xs font-bold">
                  A
                </div>

                <p className="text-lg font-bold">
                  AETHERIA<span className="text-teal-500">.EDU</span>
                </p>
              </div>

              <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
                Constructing adaptive learning infrastructures to empower
                high-growth tech talent worldwide.
              </p>
            </div>

            <FooterColumn
              title="Platform"
              links={[
                "All Academies",
                "Live Sandboxes",
                "Pricing Models",
              ]}
            />

            <FooterColumn
              title="Research"
              links={[
                "Cognitive Science",
                "AI Integration",
                "Impact Studies",
              ]}
            />

            <FooterColumn
              title="About"
              links={[
                "Founding Story",
                "Current Careers",
                "Contact Hub",
              ]}
            />

            <FooterColumn
              title="Connect"
              links={[
                "Academic Discord",
                "GitHub Core",
                "Research Papers",
              ]}
            />
          </div>

          <div className="mt-16 flex flex-col gap-5 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © 2026 Aetheria Education Inc. All intellectual assets protected.
            </p>

            <div className="flex gap-6">
              <button className="transition hover:text-slate-300">
                Terms of Use
              </button>
              <button className="transition hover:text-slate-300">
                Privacy System
              </button>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

type FooterColumnProps = {
  title: string;
  links: string[];
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase text-white">{title}</h3>

      <div className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <button
            key={link}
            className="w-fit text-left text-sm text-slate-400 transition hover:text-white"
          >
            {link}
          </button>
        ))}
      </div>
    </div>
  );
}