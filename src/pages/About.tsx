import React from 'react';

const About: React.FC = () => {
  return (
    <div className="about">
      <h1>About</h1>
      <ul>
        <li>
          <strong>Skills</strong>
          <ul>
            <li></li>
          </ul>
        </li>
      </ul>
      <h2>Work Experience</h2>
      <ul>
        <li>
          <strong>November 2017 - Present | epiGenesys - Software Engineer</strong>
          <p>Working fullstack on many applications used by the University of Sheffield, from brand new applications to ones pushing on a decade old.</p>
          <p>Tech stack uses Ruby on Rails, the front-end work uses Bootstrap 3/4 as the base. Each site is individually customised depending on a customers needs, using a mixture of JavaScript, Rails views, and customising Bootstrap. Several applications also use React, which I have helped with defining coding a style to follow, and implementing it cleanly with Rails using API endpoints.</p>
          <p>Some other aspects of my job have involved designing site pages using Adobe XD, some project planning and estimating, and working regularly on support tickets which come into the company for all of the higher education systems.</p>
        </li>
        <li>
          <strong>May 2014 - June 2017 | Staffordshire University Students' Union - Web Designer</strong>
          <p></p>
        </li>
      </ul>
      <h2>Education</h2>
      <ul>
        <li>
          <strong>BSc (Hons) Computing Science - Staffordshire University</strong>
          <p></p>
        </li>
      </ul>
    </div>
  );
}

export default About;
