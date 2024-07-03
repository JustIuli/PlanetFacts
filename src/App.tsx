import './App.css'
import StarsBackground from "./StarsBackground.tsx";
import {useEffect, useState} from "react";
import data from './data.json';
import mercuryPlanet from './assets/images/planet-mercury.svg';
import mercuryInternal from './assets/images/planet-mercury-internal.svg';
import mercuryGeology from './assets/images/geology-mercury.png';
import venusPlanet from './assets/images/planet-venus.svg';
import venusInternal from './assets/images/planet-venus-internal.svg';
import venusGeology from './assets/images/geology-venus.png';
import earthPlanet from './assets/images/planet-earth.svg';
import earthInternal from './assets/images/planet-earth-internal.svg';
import earthGeology from './assets/images/geology-earth.png';
import marsPlanet from './assets/images/planet-mars.svg';
import marsInternal from './assets/images/planet-mars-internal.svg';
import marsGeology from './assets/images/geology-mars.png';
import jupiterPlanet from './assets/images/planet-jupiter.svg';
import jupiterInternal from './assets/images/planet-jupiter-internal.svg';
import jupiterGeology from './assets/images/geology-jupiter.png';
import saturnPlanet from './assets/images/planet-saturn.svg';
import saturnInternal from './assets/images/planet-saturn-internal.svg';
import saturnGeology from './assets/images/geology-saturn.png';
import uranusPlanet from './assets/images/planet-uranus.svg';
import uranusInternal from './assets/images/planet-uranus-internal.svg';
import uranusGeology from './assets/images/geology-uranus.png';
import neptunePlanet from './assets/images/planet-neptune.svg';
import neptuneInternal from './assets/images/planet-neptune-internal.svg';
import neptuneGeology from './assets/images/geology-neptune.png';
function App() {

    interface PlanetImages {
        planet: string;
        internal: string;
        geology: string;
    }

    const images: { [key: string]: PlanetImages } = {
        Mercury: {
            planet: mercuryPlanet,
            internal: mercuryInternal,
            geology: mercuryGeology
        },
        Venus: {
            planet: venusPlanet,
            internal: venusInternal,
            geology: venusGeology
        },
        Earth: {
            planet: earthPlanet,
            internal: earthInternal,
            geology: earthGeology
        },
        Mars: {
            planet: marsPlanet,
            internal: marsInternal,
            geology: marsGeology
        },
        Jupiter: {
            planet: jupiterPlanet,
            internal: jupiterInternal,
            geology: jupiterGeology
        },
        Saturn: {
            planet: saturnPlanet,
            internal: saturnInternal,
            geology: saturnGeology
        },
        Uranus: {
            planet: uranusPlanet,
            internal: uranusInternal,
            geology: uranusGeology
        },
        Neptune: {
            planet: neptunePlanet,
            internal: neptuneInternal,
            geology: neptuneGeology
        }
    };
    const planetsData = data.map(planet => ({
        ...planet,
        images: images[planet.name]
    }));

    const [planetIndex, setPlanetIndex] = useState(2);
    const [activeOverview, setActiveOverview] = useState(0);
    const [navToggle, setNavToggle] = useState(false);

    useEffect(() => {
        setActiveOverview(0);
    }, []);

    const handlePlanetClick = (index:number):void => {
        console.log('mata')
        setPlanetIndex(index);
        setActiveOverview(0);
        setNavToggle((navToggle => !navToggle))
    };

    const handleOverviewClick = (index:number):void => {
        setActiveOverview(index);
    };

    const planet = planetsData[planetIndex];
    let description, source, image, overlayImage, overlayAlt;
    if (activeOverview === 0) {
        description = planet.overview.content;
        source = planet.overview.source;
        image = planet.images.planet;
        overlayImage = null;
        overlayAlt = null;
    } else if (activeOverview === 1) {
        description = planet.structure.content;
        source = planet.structure.source;
        image = planet.images.internal;
        overlayImage = null;
        overlayAlt = null;
    } else {
        description = planet.geology.content;
        source = planet.geology.source;
        image = planet.images.planet;
        overlayImage = planet.images.geology;
        overlayAlt = "surface image";
    }

  return (
      <>
          <div id='mainContent'>
              <header className={`header ${navToggle ? 'headerToggle' : ''}`}>
                  <h2 id="logo">PLANETS FACTS</h2>
                  <nav>
                      <ul className={`nav ${navToggle ? 'navToggle' : ''}`}>
                          {planetsData.map((planet, index) => (
                              <li
                                  key={planet.name}
                                  className={`planet-btn ${planetIndex === index ? 'active' : ''}`}
                                  onClick={() => handlePlanetClick(index)}
                              >
                                  {planet.name}
                              </li>
                          ))}
                      </ul>
                  </nav>
                  <div className="hamburger" onClick={() => setNavToggle(!navToggle)}>
                      <div className="bar"></div>
                      <div className="bar"></div>
                      <div className="bar"></div>
                  </div>
              </header>
                  <main>
                      <section className="mainbody-container">
                          <div className="image-container">
                              <img src={image} className="planet-img" alt="planet"/>
                              {overlayImage && (
                                  <img
                                      src={overlayImage}
                                      style={{
                                          width: '170px',
                                          position: 'absolute',
                                          bottom: '-20%',
                                      }}
                                      alt={overlayAlt ? overlayAlt : ''}
                                  />
                              )}
                          </div>
                          <div className="description-section">
                              <h1 className="planet-title">{planet.name}</h1>
                              <p className="description">{description}</p>
                              <p className="source">{source}</p>
                              <div className="button-section">
                                  <h4
                                      className={`overview-btn ${activeOverview === 0 ? 'whiteBg' : ''}`}
                                      onClick={() => handleOverviewClick(0)}
                                  >
                                      <span>01</span>OVERVIEW
                                  </h4>
                                  <h4
                                      className={`overview-btn ${activeOverview === 1 ? 'whiteBg' : ''}`}
                                      onClick={() => handleOverviewClick(1)}
                                  >
                                      <span>02</span>INTERNAL STRUCTURE
                                  </h4>
                                  <h4
                                      className={`overview-btn ${activeOverview === 2 ? 'whiteBg' : ''}`}
                                      onClick={() => handleOverviewClick(2)}
                                  >
                                      <span>03</span>SURFACE GEOLOGY
                                  </h4>
                              </div>
                          </div>
                      </section>

                      <section className="information-section">
                          <div className="info-box">
                              <p>Rotation Time</p>
                              <h1 className="rotation-value">{planet.rotation}</h1>
                          </div>
                          <div className="info-box">
                              <p>Revolution Time</p>
                              <h1 className="revolution-value">{planet.revolution}</h1>
                          </div>
                          <div className="info-box">
                              <p>Radius</p>
                              <h1 className="radius-value">{planet.radius}</h1>
                          </div>
                          <div className="info-box">
                              <p>Average Temp.</p>
                              <h1 className="temp-value">{planet.temperature}</h1>
                          </div>
                      </section>
                  </main>

          </div>
          <StarsBackground/>
      </>
  )
}

export default App
