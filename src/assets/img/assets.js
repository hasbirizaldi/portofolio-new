import img_profile from "./profile.webp";
import img_logo from "./logo.webp";
import img_profile2 from "./profile2.webp";
import img_vue from "./skills/vuejs.webp";
import img_react from "./skills/reactJS.webp";
import img_laravel from "./skills/laravel.webp";
import img_nextJS from "./skills/nextJS.webp";
import img_tailwind from "./skills/tailwind.webp";
import img_expressJS from "./skills/expressJS.webp";
import img_mysql from "./skills/mysql.webp";
import img_mongoDB from "./skills/mongoDB.webp";
import img_js from "./skills/js.webp";
import img_php from "./skills/php.webp";
import img_p1 from "./projects/p1.webp";
import img_p2 from "./projects/p2.webp";
import img_p3 from "./projects/p3.webp";
import img_p4 from "./projects/p4.webp";
import img_p5 from "./projects/p5.webp";
import img_p6 from "./projects/p6.webp";
import img_map from "./map.webp";
import img_gmail from "./gmail.webp";

export const assetsImg = {
  img_profile,
  img_profile2,
  img_logo,
  img_vue,
  img_react,
  img_laravel,
  img_nextJS,
  img_tailwind,
  img_expressJS,
  img_mysql,
  img_mongoDB,
  img_js,
  img_php,
  img_p1,
  img_p2,
  img_p3,
  img_p4,
  img_p5,
  img_p6,
  img_map,
  img_gmail,
};

export const education = [
  {
    id: 1,
    degree: "Bachelor Degree of Computer Science",
    institution: "STMIK Pranata Indonesia",
    year: "2018 - 2022",
  },
  {
    id: 2,
    degree: "Bootcamp Web Developer (Laravel)",
    institution: "Haltev IT Learning Center",
    year: "2023",
  },
  {
    id: 3,
    degree: "",
    institution: "SMKN 1 Gombong",
    year: "2013 - 2016",
  },
];

export const experience = [
  {
    id: 1,
    role: "Freelancer Web Developer",
    company: "",
    year: "January 2023 - Present",
  },
  {
    id: 2,
    role: "Machining Production Operator",
    company: "PT. Honda Precission Part Manufacturing",
    year: "January 2021 - Februari 2025",
  },
  {
    id: 3,
    role: "Assembling Production",
    company: "PT. Yamaha Music Manufacturing Indonesia",
    year: "July 2018 - July 2020",
  },
  {
    id: 4,
    role: "Machining Production Operator",
    company: "PT. Astra Honda Motor",
    year: "June 2016 - June 2018",
  },
];

export const projects = [
  {
    id: 1,
    title: "IoT Smart Home with Real-Time Mobile App Control",
    desc: `<p>Arduino-Based Smart Home System Using NodeMCU and a Mobile Application Integrated with Google Firebase</p>
            <br />
            <p>
              This project was developed as part of my final semester thesis. The system is designed to provide remote monitoring and control of home electronic devices using an internet-connected platform. The components used in this
              project include:
            </p>
            <br />
            <ol class="list-decimal list-inside">
              <li>NodeMCU (ESP8266)</li>
              <li>DHT11 Temperature and Humidity Sensor</li>
              <li>Relay Module</li>
              <li>Servo Motor</li>
              <li>Resistors</li>
              <li>LEDs</li>
              <li>Fuse</li>
              <li>Small Light Bulb</li>
              <li>Cooling Fan</li>
              <li>Various connecting wires</li>
              <li>A custom-built mobile application developed using Kodular</li>
            </ol>
            <br />
            <p>The main purpose of this system is to assist homeowners when they are away, such as traveling out of town, and are unable to manually control the lighting or electronic appliances at home.</p>
            <p>
              <br />
              This smart home system allows users to remotely control and monitor household electronic devices via an internet connection. With real-time communication powered by Google Firebase, homeowners can manage their home appliances
              from anywhere, without needing to return home or rely on neighbors for help.
            </p>`,
    image: assetsImg.img_p1,
    githubLink: "https://github.com/hasbirizaldi/Iot-smart-home-skripsi",
  },
  {
    id: 2,
    title: "Al Quran Web App",
    desc: `<p>This Qur'an application is developed using <strong>React.js</strong> and retrieves its data from the <a href='https://alquran.cloud/api' target='_blank'>AlQuran Cloud API</a>.</p><br /><p><strong>Available Features:</strong></p><ol class='list-decimal list-inside'><li>List of Surahs</li><li>Indonesian Translation</li><li>Audio playback for each verse</li><li>Auto-play to the next verse after the current one finishes</li><li>Full audio controls</li><li>Fully responsive for mobile devices</li></ol><br /><p><em>This app is still under active development.</em></p>`,
    image: assetsImg.img_p2,
    liveDemo: "https://alquran-ku-theta.vercel.app/",
    githubLink: "https://github.com/hasbirizaldi/alquran-ku/tree/main",
  },
  {
    id: 3,
    title: "Wedding Invitation",
    desc: `<p>This is a digital wedding invitation web application developed using <strong>React.js</strong>. The app is designed to provide a modern, elegant, and responsive invitation experience that can be accessed via mobile or desktop.</p><br /><p><strong>Key Features:</strong></p><ol class='list-decimal list-inside'><li>Countdown timer to the wedding date</li><li>Guest name personalization based on URL parameters</li><li>Formal invitation message display</li><li>Mobile-first design with responsive layout</li><li>One-click access to the invitation page</li><li>Hosted on Vercel for easy sharing</li></ol><br /><p><em>This application is still under improvement and can be customized further to suit different wedding themes and needs.</em></p>`,
    image: assetsImg.img_p3,
    liveDemo: "https://wedding-invit-livid.vercel.app/?to=udin#loveStory",
    githubLink: "https://github.com/hasbirizaldi/wedding-invit",
  },
  {
    id: 4,
    title: "Contact Management",
    desc: `<p>This is a full-stack contact management application developed using <strong>React.js</strong> for the frontend and <strong>Laravel</strong> for the backend API. It allows users to store, search, update, and delete contact information efficiently with a modern and responsive interface.</p><br /><p><strong>Key Features:</strong></p><ol class='list-decimal list-inside'><li>Add new contacts with name, email, and phone number</li><li>Search contacts by name, email, or phone</li><li>Edit and delete existing contacts</li><li>Real-time form validation and feedback</li><li>Authentication & user session control</li><li>Mobile-responsive design</li><li>Clean and intuitive user interface</li></ol><br /><p>The backend API is built with <strong>Laravel</strong> and serves as a secure RESTful service for managing contact data. The frontend is fully powered by <strong>React.js</strong>, enabling smooth user interactions and dynamic updates without full page reloads.</p>`,
    image: assetsImg.img_p4,
    githubLink: "https://github.com/hasbirizaldi/management-contacts",
    liveDemo: "https://brewokode.site/",
  },
  {
    id: 5,
    title: "Web Portal Berita (Pawarta News)",
    desc: `<p><strong>Pawarta</strong> is a dynamic and fully responsive news portal developed using <strong>WordPress</strong>. This project showcases the capability of WordPress as a content management system (CMS) to build professional news websites with modern layout, categorized content, and editorial tools.</p><br /><p><strong>Key Features:</strong></p><ol class='list-decimal list-inside'><li>Homepage with featured, latest, and trending news</li><li>Categorized sections: National, Politics, Sports, Entertainment, etc.</li><li>Article pages with thumbnail, author info, publish date, and tags</li><li>Admin panel for posting, editing, and managing content</li><li>SEO-optimized structure</li><li>Responsive design for desktop and mobile</li><li>Widget-ready sidebar and footer</li></ol><br /><p>This project is ideal for online publishers, local news sites, or blog networks that need an easy-to-manage yet powerful platform.</p>`,
    image: assetsImg.img_p5,
    githubLink: "https://github.com/hasbirizaldi",
    liveDemo: "",
  },
  {
    id: 6,
    title: "Klinik App",
    desc: `<p>This project is a travel booking web application interface built with <strong>Laravel</strong> as the backend framework and <strong>Blade</strong> as the templating engine. It provides a responsive and modern design for travel-related services such as hotel reservations, flights, trains, buses, and more.</p><br /><p><strong>Key Features:</strong></p><ol class='list-decimal list-inside'><li>Built with <strong>Laravel 10+</strong> for secure and scalable backend</li><li>Uses <strong>Blade templating engine</strong> for dynamic frontend rendering</li><li>Modular structure for booking types (Hotel, Flight, Train, etc.)</li><li>Mobile-first UI layout</li><li>Navigation tabs for Home, Search, Activity, and Settings</li><li>Ready for integration with APIs (e.g., hotel/flight providers)</li></ol><br /><p>This project demonstrates how Laravel and Blade can be used to build a clean, organized, and mobile-friendly booking interface.</p>`,
    image: assetsImg.img_p6,
    githubLink: "https://github.com/hasbirizaldi",
    liveDemo: "",
  },
];
