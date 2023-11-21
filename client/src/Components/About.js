import React from "react";

const About = () => {
  return (
    <div className="about-container">
      <h1>Beehive Monitoring System</h1>
      <div className="about-content">
        <p>
          The Beehive Monitoring System is a comprehensive application designed
          to collect and manage data from beehives...
        </p>
      </div>

      <h2>Deployment</h2>

      <p>
        Ensure all dependencip ap installed using the provided package.json
        files for the frontend and backend.
      </p>
      <p>
        Configure environmentp variables, including MongoDB Atlas credentials,
        Google Maps API key, and Auth0 configuration.
      </p>
      <p>
        Deploy the Node.js backend and React frontend on the chosen cloud
        provider.
      </p>
      <p>Verify the live deployment by accessing the application URL.</p>

      <h2>Conclusion</h2>
      <p>
        The Beehive Monitoring System offers a robust solution for beekeepers
        and researchers to monitor and manage beehive data efficiently...
      </p>
    </div>
  );
};

export default About;
