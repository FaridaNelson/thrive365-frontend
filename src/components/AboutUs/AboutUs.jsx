import "./AboutUs.css";
import { people } from "../../utils/configs";


function AboutUs() {
  return (
    <div className="about-us">
      <h1 className="about-us__title">About Us</h1>
      <p className="about-us__subtitle">Designed and developed by CodeStorm</p>
      <div className="about-us__people">
        {people.map((person, idx) => {
          return (
            <div className="about-us__person" key={`${person.name}-${idx}`}>
              <div className="about-us__person-picture-and-info">
                <img
                  className="about-us__person-picture"
                  src={person.picture}
                  alt={person.name}
                />
                <div className="about-us__person-info">
                  <h3 className="about-us__person-name">{person.name}</h3>
                  <h4 className="about-us__person-title">{person.title}</h4>
                  <h4 className="about-us__person-link"><a href={person.link}>LinkedIn</a></h4>
                </div>
              </div>

              <p className="about-us__person-bio">{person.bio}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AboutUs;
