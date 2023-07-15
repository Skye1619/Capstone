import React from "react";
import "./aboutCss.css";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

function About() {
  return (
    <div className="aboutRoot">
      <div className="aboutContainer">
        <h1 style={{ textAlign: "center" }}>About Reserva</h1>
        <section className="aboutHead">
          <p style={{ textAlign: "center" }}>
            Reserva is a leading online platform that helps you discover and
            book the best accommodations, experiences, and adventures around the
            world. Experience seamless travel planning and unlock a world of
            possibilities with Reserva. Discover hidden gems, breathtaking
            landscapes, and vibrant cultures through Reserva's curated
            selection. From luxurious resorts to cozy homestays, Reserva offers
            a wide range of options to suit every traveler's preferences and
            budget. Whether you're planning a relaxing beach getaway, an
            exciting city escape, or a thrilling outdoor expedition, Reserva has
            you covered.
          </p>
        </section>
        <h1 style={{ textAlign: "center" }}>Reserva Key Features</h1>
        <section className="featureSection">
          <Card sx={{ maxWidth: 250 }} className="featureCard">
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ fontWeight: 700 }}
              >
                Find the Perfect Destination
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Explore a vast collection of destinations, from bustling cities
                to serene beachside getaways. Discover your dream vacation spot.
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: 250 }} className="featureCard">
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ fontWeight: 700 }}
              >
                Book with Ease
              </Typography>
              <Typography variant="body2" color="text.secondary">
                With Reserva, you can easily browse through a wide range of
                options, compare prices, and secure your booking in just a few
                clicks.
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: 250 }} className="featureCard">
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ fontWeight: 700 }}
              >
                Unforgettable Experiences
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Immerse yourself in unique experiences tailored to your
                interests. From cultural tours to thrilling adventures, Reserva
                has it all.
              </Typography>
            </CardContent>
          </Card>
        </section>
        <h1 style={{ textAlign: "center" }}>Testimonial</h1>
        <section className="testimonialSection">
          <div class="quote">
            <blockquote>
              "Reserva exceeded our expectations! The ease of finding and
              booking accommodations was fantastic. The customer support team
              was responsive and helpful throughout our entire trip. We will
              definitely be using Reserva for all our future travel plans."
              <footer>&mdash;Emily and Michael, Reserva Users</footer>
            </blockquote>
          </div>
          <div class="quote">
            <blockquote>
              "Reserva made our vacation a dream come true. We discovered unique
              and off-the-beaten-path destinations we wouldn't have found
              otherwise. The wide selection of accommodations ensured we found
              the perfect fit for our family. Thank you, Reserva, for helping
              create lifelong memories!"
              <footer>&mdash;David and Lisa, Happy Reserva Travelers</footer>
            </blockquote>
          </div>
          <div class="quote">
            <blockquote>
              "Using Reserva was a game-changer for our travel plans. The
              platform is intuitive, and the search filters made it easy to find
              accommodations that met our specific preferences. We highly
              recommend Reserva to anyone looking for a stress-free and
              personalized travel booking experience."
              <footer>&mdash;Amy and Peter, Reserva Enthusiasts</footer>
            </blockquote>
          </div>
          <div class="quote">
            <blockquote>
              "Reserva helped us discover hidden gems in every city we visited.
              The curated experiences and local recommendations added an extra
              layer of excitement to our trip. We appreciate the attention to
              detail and commitment to quality. Reserva is now our go-to
              platform for unforgettable travel adventures!"
              <footer>&mdash;Natalie and James, Reserva Explorers</footer>
            </blockquote>
          </div>
          <div class="quote">
            <blockquote>
              "Our experience with Reserva was outstanding from start to finish.
              The comprehensive listings, accurate descriptions, and real
              traveler reviews gave us confidence in our choices. We had a
              seamless booking process and encountered no issues during our
              stay. Reserva truly delivered a top-notch travel experience."
              <footer>
                &mdash;Laura and Robert, Reserva Satisfied Customers
              </footer>
            </blockquote>
          </div>
        </section>
        <footer style={{paddingBottom: '20px'}}>
          <p style={{fontWeight: 600}}>&copy; 2023 Reserva. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default About;
