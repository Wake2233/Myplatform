import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Arcade from "./components/Arcade";
import Contact from "./components/Contact";
import { getProfile, getProjects } from "./lib/api";
import { localProfile, localProjects, type ProfileBundle, type Project } from "./data/content";
import { useReveal } from "./hooks/useReveal";

export default function App() {
  // Render instantly with bundled data, then hydrate from the API if it's up.
  const [profile, setProfile] = useState<ProfileBundle>(localProfile);
  const [projects, setProjects] = useState<Project[]>(localProjects);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    Promise.all([getProfile(), getProjects()]).then(([pf, pj]) => {
      if (!alive) return;
      setProfile(pf);
      setProjects(pj);
      setLoaded(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  useReveal([loaded]);

  return (
    <>
      <div className="bg-atmos" />
      <div className="bg-grid" />
      <div className="bg-scan" />
      <Nav />
      <main>
        <Hero profile={profile.profile} />
        <About data={profile} />
        <Skills groups={profile.skills} />
        <Projects projects={projects} experience={profile.experience} />
        <Arcade />
        <Contact profile={profile.profile} />
      </main>
    </>
  );
}
